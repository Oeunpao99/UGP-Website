"""UPG PIPE website API.

FastAPI application. In production the built React app is served from
FRONTEND_DIST; in development this runs API-only and Vite proxies /api.
"""
import os
import shutil
import uuid
from pathlib import Path
from urllib.parse import quote

from fastapi import Depends, FastAPI, File, HTTPException, Query, Response, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from . import auth, chatbot, data, db
from .schemas import (
    AdminLoginRequest,
    AdminMeResponse,
    ChatRequest,
    ChatResponse,
    ClientIn,
    EventIn,
    GoogleAuthRequest,
    JobIn,
    MetaIn,
    ProductIn,
    QuoteRequest,
    QuoteResponse,
)

COOKIE_SECURE = os.getenv("COOKIE_SECURE", "false").lower() == "true"

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
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------------------------------------------
# Uploaded images (client logos, event covers, team portraits).
# Mounted unconditionally so /uploads works in dev (Vite proxy) and prod.
# ------------------------------------------------------------------
UPLOAD_DIR = Path(
    os.getenv("UPLOAD_DIR", os.path.join(os.path.dirname(__file__), "..", "uploads"))
).resolve()
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
_ALLOWED_IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"}
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")


@app.post("/api/admin/upload")
async def admin_upload(file: UploadFile = File(...), admin: dict = Depends(auth.get_current_admin)) -> dict:
    ext = Path(file.filename or "").suffix.lower()
    if ext not in _ALLOWED_IMAGE_EXTS:
        raise HTTPException(
            status_code=415,
            detail="Only image files are allowed: png, jpg, jpeg, webp, gif, svg",
        )
    name = f"{uuid.uuid4().hex}{ext}"
    dest = UPLOAD_DIR / name
    with dest.open("wb") as fh:
        shutil.copyfileobj(file.file, fh)
    return {"url": f"/uploads/{name}", "name": name}


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
    return db.get_meta()


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
    for f in ("t", "d", "detail", "outcome", "loc", "dur", "team"):
        km = e.get(f + "_km")
        if km:
            out[f] = km
    km_hl = e.get("highlights_km")
    if km_hl:
        out["highlights"] = km_hl
    return out


@app.get("/api/products")
def get_products(brand: str | None = Query(default=None), lang: str = Query(default="en")) -> dict:
    all_items = db.list_products()
    items = [_product_loc(p, lang) for p in all_items]
    if brand and brand != "all":
        items = [p for p in items if brand in p["brands"]]
    return {"items": items, "brands": sorted({b for p in all_items for b in p["brands"]})}


@app.get("/api/products/{product_id}")
def get_product(product_id: str, lang: str = Query(default="en")) -> dict:
    p = db.get_product(product_id)
    if not p:
        raise HTTPException(status_code=404, detail="Product not found")
    return _product_loc(p, lang)


@app.get("/api/fittings")
def get_fittings(lang: str = Query(default="en")) -> dict:
    items = [
        {**f, "n": _loc(f["n"], f.get("n_km"), lang)}
        for f in data.FITTINGS
    ]
    return {"items": items}


@app.get("/api/events")
def get_events(kind: str | None = Query(default=None), lang: str = Query(default="en")) -> dict:
    all_items = db.list_events()
    items = all_items
    if kind and kind != "all":
        items = [e for e in items if e["kind"] == kind]
    items = [_events_loc(e, lang) for e in items]
    return {
        "items": items,
        "kinds": sorted({e["kind"] for e in all_items}),
    }


@app.get("/api/events/{event_id}")
def get_event(event_id: str, lang: str = Query(default="en")) -> dict:
    e = db.get_event(event_id)
    if not e:
        raise HTTPException(status_code=404, detail="Event not found")
    return _events_loc(e, lang)


@app.get("/api/jobs")
def get_jobs(lang: str = Query(default="en")) -> dict:
    return {"items": [_jobs_loc(j, lang) for j in db.list_jobs()]}


@app.get("/api/clients")
def get_clients() -> dict:
    return {
        "items": [
            {
                "name": c["name"],
                "international": bool(c["international"]),
                "logo": c.get("logo") or "",
            }
            for c in db.list_clients()
        ]
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
async def chat(req: ChatRequest, chat_user: dict = Depends(auth.get_current_chat_user)) -> ChatResponse:
    question = req.message.strip()
    if not question:
        raise HTTPException(status_code=422, detail="Message cannot be empty")
    db.log_chat_message(chat_user["sub"], "user", question)
    reply, source, links = await chatbot.answer(question, req.history)
    db.log_chat_message(chat_user["sub"], "bot", reply)
    return ChatResponse(reply=reply, source=source, links=links)


# ------------------------------------------------------------------
# Google Sign-In (chat visitors)
# ------------------------------------------------------------------
@app.post("/api/auth/google")
def google_auth(req: GoogleAuthRequest, response: Response) -> dict:
    claims = auth.verify_google_credential(req.credential)
    user = db.get_or_create_chat_user(claims["sub"], claims["email"], claims["name"], claims["picture"])
    token = auth.create_token({"sub": claims["sub"]}, auth.CHAT_TOKEN_TTL)
    response.set_cookie(
        auth.CHAT_COOKIE, token, httponly=True, samesite="lax", secure=COOKIE_SECURE,
        max_age=auth.CHAT_TOKEN_TTL, path="/",
    )
    return {"ok": True, "name": user["name"], "picture": user["picture"]}


@app.get("/api/auth/me")
def auth_me(chat_user: dict = Depends(auth.get_current_chat_user)) -> dict:
    return {"signedIn": True, "sub": chat_user["sub"]}


# ------------------------------------------------------------------
# Admin auth
# ------------------------------------------------------------------
@app.post("/api/admin/login")
def admin_login(req: AdminLoginRequest, response: Response) -> AdminMeResponse:
    admin = db.get_admin_by_username(req.username)
    if not admin or not auth.verify_password(req.password, admin["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    token = auth.create_token({"sub": admin["username"]}, auth.ADMIN_TOKEN_TTL)
    response.set_cookie(
        auth.ADMIN_COOKIE, token, httponly=True, samesite="lax", secure=COOKIE_SECURE,
        max_age=auth.ADMIN_TOKEN_TTL, path="/",
    )
    return AdminMeResponse(username=admin["username"])


@app.post("/api/admin/logout")
def admin_logout(response: Response) -> dict:
    response.delete_cookie(auth.ADMIN_COOKIE, path="/")
    return {"ok": True}


@app.get("/api/admin/me", response_model=AdminMeResponse)
def admin_me(admin: dict = Depends(auth.get_current_admin)) -> AdminMeResponse:
    return AdminMeResponse(username=admin["sub"])


# ------------------------------------------------------------------
# Admin CMS — products / events / jobs (all behind admin auth)
# ------------------------------------------------------------------
@app.get("/api/admin/products")
def admin_list_products(admin: dict = Depends(auth.get_current_admin)) -> dict:
    return {"items": db.list_products()}


@app.post("/api/admin/products")
def admin_create_product(item: ProductIn, admin: dict = Depends(auth.get_current_admin)) -> dict:
    if db.get_product(item.id):
        raise HTTPException(status_code=409, detail="A product with that id already exists")
    db.upsert_product(item.id, item.model_dump())
    return db.get_product(item.id)


@app.put("/api/admin/products/{product_id}")
def admin_update_product(product_id: str, item: ProductIn, admin: dict = Depends(auth.get_current_admin)) -> dict:
    if not db.get_product(product_id):
        raise HTTPException(status_code=404, detail="Product not found")
    db.upsert_product(product_id, item.model_dump())
    return db.get_product(product_id)


@app.delete("/api/admin/products/{product_id}")
def admin_delete_product(product_id: str, admin: dict = Depends(auth.get_current_admin)) -> dict:
    if not db.delete_product(product_id):
        raise HTTPException(status_code=404, detail="Product not found")
    return {"ok": True}


@app.get("/api/admin/events")
def admin_list_events(admin: dict = Depends(auth.get_current_admin)) -> dict:
    return {"items": db.list_events()}


@app.post("/api/admin/events")
def admin_create_event(item: EventIn, admin: dict = Depends(auth.get_current_admin)) -> dict:
    event_id = item.id or item.model_dump().get("t", "event").lower().replace(" ", "-")[:40]
    if db.get_event(event_id):
        raise HTTPException(status_code=409, detail="An event with that id already exists")
    payload = {**item.model_dump(), "id": event_id}
    db.upsert_event(event_id, payload)
    return db.get_event(event_id)


@app.put("/api/admin/events/{event_id}")
def admin_update_event(event_id: str, item: EventIn, admin: dict = Depends(auth.get_current_admin)) -> dict:
    if not db.get_event(event_id):
        raise HTTPException(status_code=404, detail="Event not found")
    db.upsert_event(event_id, {**item.model_dump(), "id": event_id})
    return db.get_event(event_id)


@app.delete("/api/admin/events/{event_id}")
def admin_delete_event(event_id: str, admin: dict = Depends(auth.get_current_admin)) -> dict:
    if not db.delete_event(event_id):
        raise HTTPException(status_code=404, detail="Event not found")
    return {"ok": True}


@app.get("/api/admin/jobs")
def admin_list_jobs(admin: dict = Depends(auth.get_current_admin)) -> dict:
    return {"items": db.list_jobs()}


@app.post("/api/admin/jobs")
def admin_create_job(item: JobIn, admin: dict = Depends(auth.get_current_admin)) -> dict:
    job_id = item.id or item.model_dump().get("t", "job").lower().replace(" ", "-")[:40]
    if db.get_job(job_id):
        raise HTTPException(status_code=409, detail="A job with that id already exists")
    payload = {**item.model_dump(), "id": job_id}
    db.upsert_job(job_id, payload)
    return db.get_job(job_id)


@app.put("/api/admin/jobs/{job_id}")
def admin_update_job(job_id: str, item: JobIn, admin: dict = Depends(auth.get_current_admin)) -> dict:
    if not db.get_job(job_id):
        raise HTTPException(status_code=404, detail="Job not found")
    db.upsert_job(job_id, {**item.model_dump(), "id": job_id})
    return db.get_job(job_id)


@app.delete("/api/admin/jobs/{job_id}")
def admin_delete_job(job_id: str, admin: dict = Depends(auth.get_current_admin)) -> dict:
    if not db.delete_job(job_id):
        raise HTTPException(status_code=404, detail="Job not found")
    return {"ok": True}


@app.get("/api/admin/clients")
def admin_list_clients(admin: dict = Depends(auth.get_current_admin)) -> dict:
    return {"items": db.list_clients()}


@app.post("/api/admin/clients")
def admin_create_client(item: ClientIn, admin: dict = Depends(auth.get_current_admin)) -> dict:
    return db.create_client(item.name, item.international, item.logo)


@app.put("/api/admin/clients/{client_id}")
def admin_update_client(client_id: int, item: ClientIn, admin: dict = Depends(auth.get_current_admin)) -> dict:
    if not db.update_client(client_id, item.name, item.international, item.logo):
        raise HTTPException(status_code=404, detail="Client not found")
    return {"ok": True}


@app.delete("/api/admin/clients/{client_id}")
def admin_delete_client(client_id: int, admin: dict = Depends(auth.get_current_admin)) -> dict:
    if not db.delete_client(client_id):
        raise HTTPException(status_code=404, detail="Client not found")
    return {"ok": True}


@app.get("/api/admin/meta")
def admin_get_meta(admin: dict = Depends(auth.get_current_admin)) -> dict:
    return db.get_meta()


@app.put("/api/admin/meta")
def admin_update_meta(item: MetaIn, admin: dict = Depends(auth.get_current_admin)) -> dict:
    db.update_meta(item.model_dump())
    return db.get_meta()


# ------------------------------------------------------------------
# Admin — chat conversation review
# ------------------------------------------------------------------
@app.get("/api/admin/chats")
def admin_list_chats(admin: dict = Depends(auth.get_current_admin)) -> dict:
    return {"items": db.list_chat_users()}


@app.get("/api/admin/chats/{user_id}")
def admin_get_chat(user_id: str, admin: dict = Depends(auth.get_current_admin)) -> dict:
    return {"items": db.list_chat_messages(user_id)}


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
