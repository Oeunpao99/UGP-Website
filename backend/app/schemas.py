"""Pydantic request/response schemas."""
from typing import List, Optional

from pydantic import BaseModel


class QuoteRequest(BaseModel):
    name: str
    company: str = ""
    phone: str
    email: str = ""
    product: str = "Mixed order / not sure yet"
    topic: str = "A price quote"
    message: str = ""


class QuoteResponse(BaseModel):
    ok: bool
    id: str
    mailto: str
    message: str


class ChatLink(BaseModel):
    to: str
    label: str = ""


class ChatRequest(BaseModel):
    message: str
    history: List[dict] = []


class ChatResponse(BaseModel):
    reply: str
    source: str
    links: List[ChatLink] = []
