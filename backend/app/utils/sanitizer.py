import bleach

def sanitize_input(text: str) -> str:
    if not text:
        return text
    # Remove HTML tags and dangerous characters
    return bleach.clean(text, tags=[], strip=True).strip()