"""Auth helpers: admin username/password sessions and Google Sign-In.

Two independent httpOnly cookies:
- admin_session — issued by /api/admin/login, guards /api/admin/*.
- chat_session  — issued by /api/auth/google, guards /api/chat.

Both are signed JWTs so no server-side session store is needed.
"""
import os
import time

import bcrypt
import jwt
from fastapi import Cookie, HTTPException
from google.auth.transport import requests as google_requests
from google.oauth2 import id_token as google_id_token

SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-change-me")
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "")

ADMIN_COOKIE = "admin_session"
CHAT_COOKIE = "chat_session"

ADMIN_TOKEN_TTL = 60 * 60 * 12  # 12 hours
CHAT_TOKEN_TTL = 60 * 60 * 24 * 7  # 7 days


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()


def verify_password(password: str, password_hash: str) -> bool:
    try:
        return bcrypt.checkpw(password.encode(), password_hash.encode())
    except ValueError:
        return False


def create_token(payload: dict, ttl_seconds: int) -> str:
    body = {**payload, "exp": int(time.time()) + ttl_seconds}
    return jwt.encode(body, SECRET_KEY, algorithm="HS256")


def decode_token(token: str) -> dict:
    return jwt.decode(token, SECRET_KEY, algorithms=["HS256"])


def get_current_admin(admin_session: str | None = Cookie(default=None)) -> dict:
    if not admin_session:
        raise HTTPException(status_code=401, detail="Not signed in")
    try:
        return decode_token(admin_session)
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Session expired")


def get_current_chat_user(chat_session: str | None = Cookie(default=None)) -> dict:
    if not chat_session:
        raise HTTPException(status_code=401, detail="Sign in required")
    try:
        return decode_token(chat_session)
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Session expired")


def verify_google_credential(credential: str) -> dict:
    """Verify a Google Identity Services ID token, return the claims."""
    if not GOOGLE_CLIENT_ID:
        raise HTTPException(status_code=500, detail="Google sign-in is not configured")
    try:
        claims = google_id_token.verify_oauth2_token(
            credential, google_requests.Request(), GOOGLE_CLIENT_ID
        )
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid Google credential")
    return {
        "sub": claims["sub"],
        "email": claims.get("email", ""),
        "name": claims.get("name", claims.get("email", "")),
        "picture": claims.get("picture", ""),
    }
