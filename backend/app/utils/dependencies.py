# this is done per route, the route which you want to protect
from fastapi import Depends, HTTPException, Cookie
from typing import Optional
from jose import jwt, JWTError
from app.utils.jwt import SECRET_KEY, ALGORITHM
from app.database.db import SessionLocal


def get_current_admin(access_token: Optional[str] = Cookie(None)):
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    try:
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")

        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")

        return email

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()