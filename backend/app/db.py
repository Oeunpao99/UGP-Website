"""SQLite storage for submitted quote requests.

Zero-dependency persistence: an append-only store so a quote is never
lost even before an SMTP integration is wired up.
"""
import os
import sqlite3
from datetime import datetime, timezone

DB_PATH = os.getenv("QUOTE_DB", os.path.join(os.path.dirname(__file__), "..", "..", "data", "quotes.db"))


def _connect() -> sqlite3.Connection:
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


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
        conn.commit()
    finally:
        conn.close()


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
                datetime.now(timezone.utc).isoformat(),
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
