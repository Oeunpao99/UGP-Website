# syntax=docker/dockerfile:1
# ============================================================
# UPG PIPE website — single production image
#
# Stage 1  builds the React frontend with Vite.
# Stage 2  is the runtime: Python + FastAPI (gunicorn with
#          uvicorn workers) that serves both the JSON API and
#          the compiled static site. One image, one process,
#          one exposed port.
# ============================================================

# ---- Stage 1: build the React frontend ----
FROM node:20-alpine AS frontend-build
WORKDIR /build
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# ---- Stage 2: runtime image ----
FROM python:3.12-slim AS runtime

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    APP_ENV=production \
    FRONTEND_DIST=/app/frontend-dist \
    WEB_WORKERS=4

WORKDIR /app

# Backend dependencies first so the layer caches.
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Application code and the compiled frontend.
COPY backend/app ./app
COPY --from=frontend-build /build/dist ./frontend-dist

# Run as a non-root user.
RUN addgroup --system --gid 10001 appuser \
    && adduser --system --uid 10001 --ingroup appuser appuser \
    && mkdir -p /app/data \
    && chown -R appuser:appuser /app
USER appuser

EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/api/health')"

CMD ["sh", "-c", "gunicorn app.main:app --workers ${WEB_WORKERS:-4} --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000 --access-logfile - --error-logfile -"]
