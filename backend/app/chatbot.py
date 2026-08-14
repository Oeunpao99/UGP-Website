"""UPG Assistant — the site chatbot.

Tries Azure OpenAI (Chat Completions) when AZURE_OPENAI_API_KEY and
AZURE_OPENAI_ENDPOINT are configured; otherwise (or on any failure) it
falls back to a deterministic keyword matcher built from the published
product facts, so the widget always answers even fully offline.

Reply text is plain text; the frontend renders it with white-space:pre.
"""
import os

import httpx

KNOWLEDGE = """
UPG PIPE CO., LTD — company facts:
- Cambodian manufacturer established June 2016. Head office: Building #6, St. 289, Sangkat Boeung Kak 2, Khan Toul Kork, Phnom Penh. Factory: Phoum Por Mongkoul, Sangkat Prek Phnov, Khan Prek Phnov, Phnom Penh.
- Phone +855 (0)23 939 399. Email sales@upgpipe.com. HR: hr@upgpipe.com. Office hours Mon-Sat 07:30-17:00.
- 177 staff: 30 head office, 147 factory.
- First ISO 9001:2015 certified factory of its kind in Cambodia. Certificate 745371, Guardian Independent Certification Ltd, issued 22 March 2024, expires 21 March 2027, first certified 2017. Scope: manufacturing of uPVC, HDPE, LDPE, PPR pipes and electrical cable conduits and fitting products.
- Three brands, all ISO 9001:2015: EAGLE (flagship, full range), LION HEAD (uPVC value line), SMART (uPVC and HDPE engineering line).
- Vision: leading innovative and specialised manufacturer and supplier of high-quality polymer products in Cambodia and international markets.

Products:
1. uPVC pressure pipe, class 13.5 and 8.5, market sizes 21, 27, 34, 42, 49, 60, 75, 90, 100, 125, 165, 200, 250, 300 mm = 1/2" to 12". UPG sizes 22, 26, 34, 42, 48, 60, 76, 89, 114, 140, 165, 216, 267, 318 mm. Outside diameters 22.4 mm (1/2") up to 320.7 mm (12"). Socket end. For cold water supply, drainage, irrigation, fire sprinkler systems, chemical transfer and as electrical conduit.
2. PPR pipe (polypropylene random copolymer) for hot and cold water: series S3.2 at 2.0 MPa for hot water, series S5 at 1.25 MPa for cold water. Nominal sizes 20, 25, 32, 40, 50, 63, 75, 90, 110 mm. Joined by heat fusion.
3. HDPE pipe, PE100 raw material, outside diameters 20 to 400 mm, pressure classes PN6 to PN20 following the SDR series. For municipal water supply and drainage, telecom conduit, electricity conduit and gas conduit. Joined by butt fusion or electrofusion.
4. uPVC electrical conduit: sizes 16, 20, 25, 32 mm = 3/8", 1/2", 3/4", 1". Outside diameters 15.80, 19.95, 24.95, 31.78 mm.
5. Corrugated flexible conduit: sizes 16, 20, 25, 32 mm with outside diameters 18, 22, 26, 33 mm. Rated -5 C to 60 C.
6. uPVC trunking with snap-on lid, several sizes including 40 mm x 20 mm.
7. uPVC fittings: class 13.5 in 21-165 mm and class 8.5 in 60-165 mm. Tees, reducing tees, 90 and 45 degree elbows, female and male elbows, couplings, reducing sockets, male plugs, end caps, clamps.
8. Conduit fittings: 90 degree elbows, 1-4 way junction boxes, cover boxes, connectors, U-clips for 16-32 mm conduit.

Quality: in-house R&D lab and own compound formulations. Tests include visual inspection, non-transparency, vertical reversion rate, impact, tensile and hydrostatic pressure testing. Products are non-toxic and safe for potable water, resistant to corrosion, heat and UV, and self-extinguishing in the conduit range.

Projects supplied: AEON Mall Phnom Penh, Booyoung Town, Jebsen & Jessen, Sumitomo Mitsui Construction, Diamond One, ORKIDE Development, Borey Kheang Heng, Borey New Hope, The Blue Sky Tower, ACLEDA, Kang Hwa E&C, Galaxy Residence and many other local developers and contractors.

Pricing: UPG does not publish prices on the website. Quotes are given by the sales team based on sizes, class and quantity.

Website:
- This site is bilingual. The ខ្មែរ / EN toggle is at the top right of every page, and the language is part of the URL.
- Pages: Home, Products, About Us, Events, Careers and Contact Us. A "Request a quote" button in the header jumps to the Contact page.
- The Products page groups everything by brand — Eagle, Lion Head and Smart — with full size/class tables for each product and a quick-jump list.
- The Contact page has the quote request form (name, phone, product, message) plus phone and email. The Careers page lists open roles. The Events page lists company activities, factory visits and milestones.
- There is no price list on the site; the form or a phone call to sales is how quotes are requested.
"""

SYSTEM_PROMPT = (
    "You are the UPG Assistant on the website of UPG PIPE CO., LTD, a pipe manufacturer in "
    "Phnom Penh, Cambodia.\n\n"
    "Answer only from the company information below. If something is not covered — pricing, "
    "current stock, lead times, project-specific engineering advice — say so plainly and point "
    "the person to sales on +855 (0)23 939 399 or sales@upgpipe.com. Never invent a "
    "specification, a price or a certificate detail.\n\n"
    "Be brief: two to four sentences, or a short list when giving sizes. Sound like a "
    "knowledgeable person at the counter, not a brochure. Reply in the language the visitor "
    "writes in — Khmer if they write Khmer, English if they write English.\n\n"
    f"{KNOWLEDGE}"
)

FALLBACK = [
    {
        "k": ["price", "cost", "how much", "quote", "តម្លៃ"],
        "a": "We don't publish prices — they depend on size, class and quantity. Send your sizes and quantities through the quote form on the Contact page, or call sales on +855 (0)23 939 399 and they'll price it the same day.",
    },
    {
        "k": ["upvc", "pvc", "pressure pipe"],
        "a": 'Our uPVC pressure pipe comes in class 13.5 and class 8.5, market sizes 21 mm to 300 mm (1/2" to 12"), under the Eagle, Lion Head and Smart brands. Outside diameters run from 22.4 mm up to 320.7 mm. Open the uPVC card on the Products page for the full dimension table.',
    },
    {
        "k": ["ppr", "hot water"],
        "a": "Eagle PPR is made for hot and cold water: series S3.2 at 2.0 MPa for hot, series S5 at 1.25 MPa for cold, in 20, 25, 32, 40, 50, 63, 75, 90 and 110 mm. It is heat-fusion welded, so the joint is as strong as the pipe.",
    },
    {
        "k": ["hdpe", "pe100", "butt fusion", "mains"],
        "a": "Eagle and Smart HDPE is made from PE100 in outside diameters from 20 mm to 400 mm, pressure classes PN6 to PN20. It's used for water mains, drainage, and telecom, electricity and gas conduit, joined by butt fusion or electrofusion.",
    },
    {
        "k": ["conduit", "electrical", "wiring", "corrugated", "trunking"],
        "a": 'We make rigid electrical conduit in 16, 20, 25 and 32 mm (3/8"–1"), flexible corrugated conduit in the same sizes, uPVC trunking with a snap-on lid, plus junction boxes, elbows, connectors and U-clips.',
    },
    {
        "k": ["fitting", "elbow", "tee", "coupling", "socket"],
        "a": "uPVC fittings are moulded in class 13.5 (21–165 mm) and class 8.5 (60–165 mm): tees, reducing tees, 90° and 45° elbows, female and male elbows, couplings, reducing sockets, plugs, end caps and clamps. They're dimensioned to the same tables as our pipe.",
    },
    {
        "k": ["iso", "certif", "quality", "test", "standard"],
        "a": "UPG is the first factory of its kind in Cambodia certified to ISO 9001:2015 — certificate 745371 through Guardian Independent Certification Ltd, valid to March 2027, first certified in 2017. We run our own lab: hydrostatic pressure, impact, tensile, reversion and dimensional checks.",
    },
    {
        "k": ["size", "diameter", "dimension", "mm", "inch"],
        "a": 'uPVC runs 21–300 mm (1/2"–12"), PPR 20–110 mm, HDPE 20–400 mm, and conduit 16–32 mm. Every dimension table is on the Products page — open the card for the product you need.',
    },
    {
        "k": ["where", "address", "location", "factory", "office", "map", "visit"],
        "a": "Head office: Building #6, St. 289, Sangkat Boeung Kak 2, Khan Toul Kork, Phnom Penh. Factory: Phoum Por Mongkoul, Sangkat Prek Phnov. We host customer factory visits — ask sales to arrange one.",
    },
    {
        "k": ["contact", "call", "phone", "email", "telegram"],
        "a": "Call +855 (0)23 939 399 or email sales@upgpipe.com, Monday to Saturday 7:30–17:00. For jobs, write to hr@upgpipe.com.",
    },
    {
        "k": ["job", "career", "hiring", "apply", "cv", "recruit"],
        "a": "We're hiring in sales, production, quality, warehouse and marketing — the open roles are listed on the Careers page. Send your CV to hr@upgpipe.com with the role in the subject line.",
    },
    {
        "k": ["deliver", "lead time", "stock", "ship", "transport"],
        "a": "Delivery and stock depend on the size and quantity, so sales will confirm both when they quote. Call +855 (0)23 939 399 with your list and they'll check availability.",
    },
    {
        "k": ["brand", "eagle", "lion", "smart"],
        "a": "Three brands, one factory and one quality system: EAGLE is the flagship covering the full range, LION HEAD is the uPVC value line for housing work, and SMART is the uPVC and HDPE engineering line. All three are ISO 9001:2015.",
    },
    {
        "k": ["drink", "potable", "safe", "toxic", "health"],
        "a": "Our compounds are non-toxic and suitable for potable water — no bad odour or taste carried into the supply, and no chemicals leaching from the pipe wall.",
    },
    {
        "k": ["distributor", "dealer", "wholesale", "partner"],
        "a": "We work with distributors across Cambodia. Tell us your province and the range you'd stock through the Contact page, and the sales team will follow up.",
    },
    {
        "k": ["who", "about", "company", "history"],
        "a": "UPG PIPE CO., LTD is a Cambodian manufacturer established in June 2016, with 177 staff between the Toul Kork head office and the Prek Phnov factory. We produce uPVC, HDPE and PPR pipe, fittings, electrical conduit and trunking.",
    },
    {
        "k": ["language", "khmer", "english", "translate", "switch"],
        "a": "Use the ខ្មែរ / EN toggle at the top right of any page — the whole site switches language and the URL updates. Ask your next question in Khmer and I'll answer in Khmer.",
    },
    {
        "k": ["website", "site", "page", "navigate", "section", "find", "menu", "form"],
        "a": "The site has Home, Products, About Us, Events, Careers and Contact pages — the menu is at the top of every page. The quote request form lives on the Contact page, and the 'Request a quote' button in the header jumps straight there.",
    },
]

GENERIC = (
    "I can help with pipe sizes, pressure classes, our brands, certification, careers and how "
    "to reach us. For pricing, stock or anything project-specific, call sales on +855 (0)23 939 "
    "399 or email sales@upgpipe.com."
)

# Question keyword -> site pages worth offering as action buttons.
PAGE_RULES = (
    ("products", "/products",
     ["product", "size", "ppr", "hdpe", "upvc", "pvc", "pipe", "fitting", "elbow", "conduit",
      "brand", "eagle", "lion", "smart", " mm", "pressure", "class", "diameter", "trunking"]),
    ("contact", "/contact",
     ["quote", "price", "pricing", "order", "buy", "contact", "call", "phone", "email",
      "deliver", "stock", "distributor", "dealer", "wholesale", "visit"]),
    ("about", "/about",
     ["about", "company", "who", "history", "iso", "certif", "quality", "vision", "staff",
      "factory", "lab", "test"]),
    ("careers", "/careers",
     ["job", "career", "hiring", "cv", "apply", "vacancy", "hr"]),
    ("events", "/events",
     ["event", "activity", "news", "milestone", "training", "audit"]),
)


def site_links(question: str) -> list[dict]:
    """Pick 1-3 site pages the visitor would want to open next."""
    s = question.lower()
    out, seen = [], set()
    for page, to, keys in PAGE_RULES:
        if page in seen:
            continue
        if any(k in s for k in keys):
            out.append({"to": to, "label": page})
            seen.add(page)
            if len(out) == 3:
                break
    return out


AZURE_ENDPOINT = os.getenv("AZURE_OPENAI_ENDPOINT", "").rstrip("/")
AZURE_DEPLOYMENT = os.getenv("AZURE_OPENAI_DEPLOYMENT", "gpt-4o")
AZURE_API_VERSION = os.getenv("AZURE_OPENAI_API_VERSION", "2024-08-01-preview")


def local_answer(question: str) -> str:
    """Keyword matcher — always available, deterministic, offline."""
    s = question.lower()
    best, score = None, 0
    for entry in FALLBACK:
        hits = sum(1 for k in entry["k"] if k in s)
        if hits > score:
            score, best = hits, entry
    return best["a"] if best else GENERIC


async def answer(question: str, history: list) -> tuple[str, str, list]:
    """Return (reply, source, links). source is 'ai' or 'local'."""
    links = site_links(question)
    api_key = os.getenv("AZURE_OPENAI_API_KEY")
    if api_key and AZURE_ENDPOINT:
        try:
            messages = [{"role": "system", "content": SYSTEM_PROMPT}]
            messages += [m for m in history[-10:] if m.get("role") in ("user", "assistant")]
            messages.append({"role": "user", "content": question})
            url = (
                f"{AZURE_ENDPOINT}/openai/deployments/{AZURE_DEPLOYMENT}"
                f"/chat/completions?api-version={AZURE_API_VERSION}"
            )
            async with httpx.AsyncClient(timeout=30) as client:
                res = await client.post(
                    url,
                    headers={"Content-Type": "application/json", "api-key": api_key},
                    json={"messages": messages, "max_tokens": 1000},
                )
                if res.status_code == 200:
                    data = res.json()
                    text = data["choices"][0]["message"]["content"].strip()
                    if text:
                        return text, "ai", links
        except Exception:
            # Network failure, bad key, rate limit — degrade gracefully.
            pass
    return local_answer(question), "local", links
