"""SQLite storage for the site: quotes, CMS content, admin users and chat logs.

Zero-dependency persistence: everything lives in one SQLite file so the
demo stays self-contained (no external database to stand up).
"""
import json
import os
import sqlite3
from datetime import datetime, timezone

from . import data

DB_PATH = os.getenv("QUOTE_DB", os.path.join(os.path.dirname(__file__), "..", "..", "data", "quotes.db"))


def _connect() -> sqlite3.Connection:
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def init_db() -> None:
    conn = _connect()
    try:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS quotes (
                id TEXT PRIMARY KEY,
                created_at TEXT NOT NULL,
                name TEXT NOT NULL,
                company TEXT,
                phone TEXT NOT NULL,
                email TEXT,
                product TEXT,
                topic TEXT,
                message TEXT
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS admin_users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
            """
        )
        for table in ("products", "events", "jobs"):
            conn.execute(
                f"""
                CREATE TABLE IF NOT EXISTS {table} (
                    id TEXT PRIMARY KEY,
                    sort_order INTEGER NOT NULL,
                    data_json TEXT NOT NULL,
                    updated_at TEXT NOT NULL
                )
                """
            )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS clients (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                international INTEGER NOT NULL DEFAULT 0,
                sort_order INTEGER NOT NULL
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS site_meta (
                id INTEGER PRIMARY KEY CHECK (id = 1),
                data_json TEXT NOT NULL
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS chat_users (
                id TEXT PRIMARY KEY,
                email TEXT,
                name TEXT,
                picture TEXT,
                first_seen TEXT NOT NULL,
                last_seen TEXT NOT NULL
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS chat_messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT NOT NULL,
                role TEXT NOT NULL,
                text TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
            """
        )
        conn.commit()
    finally:
        conn.close()
    seed_from_data()
    bootstrap_admin()


# ------------------------------------------------------------------
# One-time seed from the static data.py constants
# ------------------------------------------------------------------
def seed_from_data() -> None:
    conn = _connect()
    try:
        if conn.execute("SELECT COUNT(*) c FROM products").fetchone()["c"] == 0:
            now = _now()
            for i, p in enumerate(data.PRODUCTS):
                conn.execute(
                    "INSERT INTO products (id, sort_order, data_json, updated_at) VALUES (?, ?, ?, ?)",
                    (p["id"], i, json.dumps(p), now),
                )

        if conn.execute("SELECT COUNT(*) c FROM events").fetchone()["c"] == 0:
            now = _now()
            for i, e in enumerate(data.EVENTS):
                conn.execute(
                    "INSERT INTO events (id, sort_order, data_json, updated_at) VALUES (?, ?, ?, ?)",
                    (e["id"], i, json.dumps(e), now),
                )

        if conn.execute("SELECT COUNT(*) c FROM jobs").fetchone()["c"] == 0:
            now = _now()
            for i, j in enumerate(data.JOBS):
                row = {**j, "id": f"job{i}"}
                conn.execute(
                    "INSERT INTO jobs (id, sort_order, data_json, updated_at) VALUES (?, ?, ?, ?)",
                    (row["id"], i, json.dumps(row), now),
                )

        if conn.execute("SELECT COUNT(*) c FROM clients").fetchone()["c"] == 0:
            for i, (name, intl) in enumerate(data.CLIENTS):
                conn.execute(
                    "INSERT INTO clients (name, international, sort_order) VALUES (?, ?, ?)",
                    (name, int(intl), i),
                )

        if conn.execute("SELECT COUNT(*) c FROM site_meta").fetchone()["c"] == 0:
            conn.execute(
                "INSERT INTO site_meta (id, data_json) VALUES (1, ?)",
                (json.dumps(data.META),),
            )

        conn.commit()
    finally:
        conn.close()


def bootstrap_admin() -> None:
    """Create the first admin from env vars if none exists yet."""
    username = os.getenv("ADMIN_USERNAME")
    password = os.getenv("ADMIN_PASSWORD")
    if not username or not password:
        return
    conn = _connect()
    try:
        if conn.execute("SELECT COUNT(*) c FROM admin_users").fetchone()["c"] > 0:
            return
        from . import auth  # local import to avoid a circular import at module load

        conn.execute(
            "INSERT INTO admin_users (username, password_hash, created_at) VALUES (?, ?, ?)",
            (username, auth.hash_password(password), _now()),
        )
        conn.commit()
    finally:
        conn.close()


# ------------------------------------------------------------------
# Quotes
# ------------------------------------------------------------------
def save_quote(payload: dict) -> str:
    """Persist a quote request and return its id."""
    quote_id = datetime.now(timezone.utc).strftime("Q%Y%m%d%H%M%S%f")[:-3]
    conn = _connect()
    try:
        conn.execute(
            """
            INSERT INTO quotes (id, created_at, name, company, phone, email, product, topic, message)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                quote_id,
                _now(),
                payload["name"],
                payload.get("company", ""),
                payload["phone"],
                payload.get("email", ""),
                payload.get("product", ""),
                payload.get("topic", ""),
                payload.get("message", ""),
            ),
        )
        conn.commit()
    finally:
        conn.close()
    return quote_id


# ------------------------------------------------------------------
# Admin users
# ------------------------------------------------------------------
def get_admin_by_username(username: str) -> dict | None:
    conn = _connect()
    try:
        row = conn.execute("SELECT * FROM admin_users WHERE username = ?", (username,)).fetchone()
        return dict(row) if row else None
    finally:
        conn.close()


# ------------------------------------------------------------------
# Generic JSON-blob CRUD for products / events / jobs
# ------------------------------------------------------------------
def _list_blob_table(table: str) -> list[dict]:
    conn = _connect()
    try:
        rows = conn.execute(f"SELECT data_json FROM {table} ORDER BY sort_order").fetchall()
        return [json.loads(r["data_json"]) for r in rows]
    finally:
        conn.close()


def _get_blob(table: str, item_id: str) -> dict | None:
    conn = _connect()
    try:
        row = conn.execute(f"SELECT data_json FROM {table} WHERE id = ?", (item_id,)).fetchone()
        return json.loads(row["data_json"]) if row else None
    finally:
        conn.close()


def _upsert_blob(table: str, item_id: str, item: dict) -> None:
    conn = _connect()
    try:
        existing = conn.execute(f"SELECT sort_order FROM {table} WHERE id = ?", (item_id,)).fetchone()
        if existing:
            conn.execute(
                f"UPDATE {table} SET data_json = ?, updated_at = ? WHERE id = ?",
                (json.dumps(item), _now(), item_id),
            )
        else:
            next_order = conn.execute(f"SELECT COALESCE(MAX(sort_order), -1) + 1 n FROM {table}").fetchone()["n"]
            conn.execute(
                f"INSERT INTO {table} (id, sort_order, data_json, updated_at) VALUES (?, ?, ?, ?)",
                (item_id, next_order, json.dumps(item), _now()),
            )
        conn.commit()
    finally:
        conn.close()


def _delete_blob(table: str, item_id: str) -> bool:
    conn = _connect()
    try:
        cur = conn.execute(f"DELETE FROM {table} WHERE id = ?", (item_id,))
        conn.commit()
        return cur.rowcount > 0
    finally:
        conn.close()


def list_products() -> list[dict]:
    return _list_blob_table("products")


def get_product(product_id: str) -> dict | None:
    return _get_blob("products", product_id)


def upsert_product(product_id: str, item: dict) -> None:
    _upsert_blob("products", product_id, item)


def delete_product(product_id: str) -> bool:
    return _delete_blob("products", product_id)


def list_events() -> list[dict]:
    return _list_blob_table("events")


def get_event(event_id: str) -> dict | None:
    return _get_blob("events", event_id)


def upsert_event(event_id: str, item: dict) -> None:
    _upsert_blob("events", event_id, item)


def delete_event(event_id: str) -> bool:
    return _delete_blob("events", event_id)


def list_jobs() -> list[dict]:
    return _list_blob_table("jobs")


def get_job(job_id: str) -> dict | None:
    return _get_blob("jobs", job_id)


def upsert_job(job_id: str, item: dict) -> None:
    _upsert_blob("jobs", job_id, item)


def delete_job(job_id: str) -> bool:
    return _delete_blob("jobs", job_id)


# ------------------------------------------------------------------
# Clients
# ------------------------------------------------------------------
def list_clients() -> list[dict]:
    conn = _connect()
    try:
        rows = conn.execute("SELECT * FROM clients ORDER BY sort_order").fetchall()
        return [dict(r) for r in rows]
    finally:
        conn.close()


def create_client(name: str, international: bool) -> dict:
    conn = _connect()
    try:
        next_order = conn.execute("SELECT COALESCE(MAX(sort_order), -1) + 1 n FROM clients").fetchone()["n"]
        cur = conn.execute(
            "INSERT INTO clients (name, international, sort_order) VALUES (?, ?, ?)",
            (name, int(international), next_order),
        )
        conn.commit()
        return {"id": cur.lastrowid, "name": name, "international": int(international), "sort_order": next_order}
    finally:
        conn.close()


def update_client(client_id: int, name: str, international: bool) -> bool:
    conn = _connect()
    try:
        cur = conn.execute(
            "UPDATE clients SET name = ?, international = ? WHERE id = ?",
            (name, int(international), client_id),
        )
        conn.commit()
        return cur.rowcount > 0
    finally:
        conn.close()


def delete_client(client_id: int) -> bool:
    conn = _connect()
    try:
        cur = conn.execute("DELETE FROM clients WHERE id = ?", (client_id,))
        conn.commit()
        return cur.rowcount > 0
    finally:
        conn.close()


# ------------------------------------------------------------------
# Site meta (single row)
# ------------------------------------------------------------------
def get_meta() -> dict:
    conn = _connect()
    try:
        row = conn.execute("SELECT data_json FROM site_meta WHERE id = 1").fetchone()
        return json.loads(row["data_json"]) if row else {}
    finally:
        conn.close()


def update_meta(meta: dict) -> None:
    conn = _connect()
    try:
        conn.execute("UPDATE site_meta SET data_json = ? WHERE id = 1", (json.dumps(meta),))
        conn.commit()
    finally:
        conn.close()


# ------------------------------------------------------------------
# Chat users & messages
# ------------------------------------------------------------------
def get_or_create_chat_user(sub: str, email: str, name: str, picture: str) -> dict:
    conn = _connect()
    try:
        now = _now()
        row = conn.execute("SELECT * FROM chat_users WHERE id = ?", (sub,)).fetchone()
        if row:
            conn.execute(
                "UPDATE chat_users SET email = ?, name = ?, picture = ?, last_seen = ? WHERE id = ?",
                (email, name, picture, now, sub),
            )
            conn.commit()
            return {**dict(row), "email": email, "name": name, "picture": picture, "last_seen": now}
        conn.execute(
            "INSERT INTO chat_users (id, email, name, picture, first_seen, last_seen) VALUES (?, ?, ?, ?, ?, ?)",
            (sub, email, name, picture, now, now),
        )
        conn.commit()
        return {"id": sub, "email": email, "name": name, "picture": picture, "first_seen": now, "last_seen": now}
    finally:
        conn.close()


def log_chat_message(user_id: str, role: str, text: str) -> None:
    conn = _connect()
    try:
        conn.execute(
            "INSERT INTO chat_messages (user_id, role, text, created_at) VALUES (?, ?, ?, ?)",
            (user_id, role, text, _now()),
        )
        conn.execute("UPDATE chat_users SET last_seen = ? WHERE id = ?", (_now(), user_id))
        conn.commit()
    finally:
        conn.close()


def list_chat_users() -> list[dict]:
    conn = _connect()
    try:
        rows = conn.execute(
            """
            SELECT u.*, COUNT(m.id) AS message_count
            FROM chat_users u
            LEFT JOIN chat_messages m ON m.user_id = u.id
            GROUP BY u.id
            ORDER BY u.last_seen DESC
            """
        ).fetchall()
        return [dict(r) for r in rows]
    finally:
        conn.close()


def list_chat_messages(user_id: str) -> list[dict]:
    conn = _connect()
    try:
        rows = conn.execute(
            "SELECT * FROM chat_messages WHERE user_id = ? ORDER BY id",
            (user_id,),
        ).fetchall()
        return [dict(r) for r in rows]
    finally:
        conn.close()
