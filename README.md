# UPG PIPE Website

React (Vite) frontend + FastAPI backend for the UPG PIPE CO., LTD demo website.

## Project structure

```
backend/          FastAPI app (API + chatbot)
frontend/         React + Vite + Tailwind frontend
Dockerfile        Production image (frontend + backend in one container)
docker-compose.yml
```

## Running in development

You need both the backend and the frontend running.

### 1. Backend (FastAPI, port 8000)

```sh
cd backend
.venv\Scripts\activate          # Windows — a .venv already exists in backend/
pip install -r requirements.txt # only needed the first time
uvicorn app.main:app --reload
```

Note: use `python -m uvicorn ...` on Windows if `uvicorn` isn't found:

```sh
python -m uvicorn app.main:app --reload --port 8000
```

If the `.venv` is ever missing, recreate it first:

```sh
cd backend
python -m venv .venv
.venv\Scripts\activate          # Windows
pip install -r requirements.txt
```

API is served at `http://localhost:8000` (health check: `http://localhost:8000/api/health`).

### 2. Frontend (Vite + React, port 5173)

```sh
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser. Vite proxies `/api` calls to the backend.

## Running with Docker (single container, production-like)

```sh
docker compose up --build
```

Everything is served on `http://localhost:8080`. The build compiles the React app and serves it alongside the API from one container.

Optional: enable real AI answers in the chatbot by setting `ANTHROPIC_API_KEY` (see `docker-compose.yml`). Without it, the assistant uses offline fallback answers.

## Useful frontend scripts

```sh
npm run build     # production build to frontend/dist
npm run preview   # preview the production build
```
