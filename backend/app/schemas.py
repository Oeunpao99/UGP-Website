"""Pydantic request/response schemas."""
from typing import List, Optional

from pydantic import BaseModel, ConfigDict


class AdminLoginRequest(BaseModel):
    username: str
    password: str


class AdminMeResponse(BaseModel):
    username: str


class GoogleAuthRequest(BaseModel):
    credential: str


class ChatUserOut(BaseModel):
    id: str
    email: str = ""
    name: str = ""
    picture: str = ""
    first_seen: str
    last_seen: str
    message_count: int = 0


class ChatMessageOut(BaseModel):
    id: int
    role: str
    text: str
    created_at: str


class ProductIn(BaseModel):
    """A product record. Shape mirrors data.PRODUCTS — id required, everything
    else (name, brands, blurb, tags, cols/rows, *_km variants, ...) passes
    through as-is rather than being re-declared field by field."""
    model_config = ConfigDict(extra="allow")
    id: str


class EventIn(BaseModel):
    model_config = ConfigDict(extra="allow")
    id: Optional[str] = None


class JobIn(BaseModel):
    model_config = ConfigDict(extra="allow")
    id: Optional[str] = None


class ClientIn(BaseModel):
    name: str
    international: bool = False
    logo: str = ""


class MetaIn(BaseModel):
    model_config = ConfigDict(extra="allow")


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
