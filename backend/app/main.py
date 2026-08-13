"""UPG PIPE website API.

FastAPI application. In production the built React app is served from
FRONTEND_DIST; in development this runs API-only and Vite proxies /api.
"""
import os
from pathlib import Path
from urllib.parse import quote

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from . import chatbot, data, db
from .schemas import ChatRequest, ChatResponse, QuoteRequest, QuoteResponse

app = FastAPI(
    title="UPG PIPE CO., LTD — Website API",
    description="Products, fittings, events, jobs, clients, quotes and the UPG Assistant chatbot.",
    version="1.0.0",
)

# ------------------------------------------------------------------
# CORS — only needed in development (Vite on :5173 talking to :8000).
# In production the frontend and API are served from the same origin.
# ------------------------------------------------------------------
cors_origins = [
    o.strip()
    for o in os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(",")
    if o.strip()
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    db.init_db()


# ------------------------------------------------------------------
# API routes
# ------------------------------------------------------------------
@app.get("/api/health")
def health() -> dict:
    return {"status": "ok", "service": "upg-pipe-api", "version": "1.0.0"}


@app.get("/api/meta")
def get_meta() -> dict:
    return data.META


# ------------------------------------------------------------------
# Localization helpers
# ------------------------------------------------------------------
def _loc(en: str, km: str | None, lang: str) -> str:
    return km if lang == "km" and km else en


def _product_loc(p: dict, lang: str) -> dict:
    if lang != "km":
        return p
    out = dict(p)
    for f in ("name", "meta", "blurb", "tags", "specTitle", "caption"):
        km = p.get(f + "_km")
        if km:
            out[f] = km
    return out


def _jobs_loc(j: dict, lang: str) -> dict:
    if lang != "km":
        return j
    out = dict(j)
    for f in ("t", "dept", "loc"):
        km = j.get(f + "_km")
        if km:
            out[f] = km
    for f in ("r", "q"):
        km = j.get(f + "_km")
        if km:
            out[f] = km
    return out


def _events_loc(e: dict, lang: str) -> dict:
    if lang != "km":
        return e
    out = dict(e)
    for f in ("t", "d", "loc", "dur", "team"):
        km = e.get(f + "_km")
        if km:
            out[f] = km
    km_hl = e.get("highlights_km")
    if km_hl:
        out["highlights"] = km_hl
    return out


@app.get("/api/products")
def get_products(brand: str | None = Query(default=None), lang: str = Query(default="en")) -> dict:
    items = [_product_loc(p, lang) for p in data.PRODUCTS]
    if brand and brand != "all":
        items = [p for p in items if brand in p["brands"]]
    return {"items": items, "brands": sorted({b for p in data.PRODUCTS for b in p["brands"]})}


@app.get("/api/products/{product_id}")
def get_product(product_id: str, lang: str = Query(default="en")) -> dict:
    for p in data.PRODUCTS:
        if p["id"] == product_id:
            return _product_loc(p, lang)
    raise HTTPException(status_code=404, detail="Product not found")


@app.get("/api/fittings")
def get_fittings(lang: str = Query(default="en")) -> dict:
    items = [
        {**f, "n": _loc(f["n"], f.get("n_km"), lang)}
        for f in data.FITTINGS
    ]
    return {"items": items}


@app.get("/api/events")
def get_events(kind: str | None = Query(default=None), lang: str = Query(default="en")) -> dict:
    items = data.EVENTS
    if kind and kind != "all":
        items = [e for e in items if e["kind"] == kind]
    items = [_events_loc(e, lang) for e in items]
    return {
        "items": items,
        "kinds": sorted({e["kind"] for e in data.EVENTS}),
    }


@app.get("/api/jobs")
def get_jobs(lang: str = Query(default="en")) -> dict:
    return {"items": [_jobs_loc(j, lang) for j in data.JOBS]}


@app.get("/api/clients")
def get_clients() -> dict:
    return {
        "items": [{"name": name, "international": bool(intl)} for name, intl in data.CLIENTS]
    }


@app.post("/api/quote", response_model=QuoteResponse)
async def submit_quote(req: QuoteRequest) -> QuoteResponse:
    payload = req.model_dump()
    quote_id = db.save_quote(payload)
    body = (
        f"Name: {req.name}\n"
        f"Company: {req.company or '-'}\n"
        f"Phone: {req.phone}\n"
        f"Email: {req.email or '-'}\n"
        f"Product: {req.product}\n"
        f"Request: {req.topic}\n\n"
        f"{req.message or ''}"
    )
    mailto = (
        "mailto:sales@upgpipe.com"
        f"?subject={quote('Quote request — ' + (req.product or ''))}"
        f"&body={quote(body)}"
    )
    return QuoteResponse(
        ok=True,
        id=quote_id,
        mailto=mailto,
        message="Request received — our sales team will come back with pricing, lead time and delivery.",
    )


@app.post("/api/chat", response_model=ChatResponse)
async def chat(req: ChatRequest) -> ChatResponse:
    question = req.message.strip()
    if not question:
        raise HTTPException(status_code=422, detail="Message cannot be empty")
    reply, source, links = await chatbot.answer(question, req.history)
    return ChatResponse(reply=reply, source=source, links=links)


# ------------------------------------------------------------------
# Static SPA hosting (production only)
# ------------------------------------------------------------------
_STATIC = os.getenv("FRONTEND_DIST", "")
if _STATIC and Path(_STATIC).exists():
    _root = Path(_STATIC).resolve()
    app.mount("/assets", StaticFiles(directory=_root / "assets"), name="assets")

    @app.get("/{full_path:path}", include_in_schema=False)
    def index(full_path: str) -> FileResponse:
        # Client-side routes (e.g. /products, /about) have no server-side
        # file, so any non-API path falls back to the SPA shell and React
        # Router takes it from there. Unmatched /api/* calls fall through
        # to a real 404 instead of the HTML shell.
        if full_path.startswith("api/"):
            raise HTTPException(status_code=404, detail="Not found")
        return FileResponse(_root / "index.html")
