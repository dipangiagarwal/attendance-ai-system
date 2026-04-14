from fastapi import Request
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from jose import jwt, JWTError
import os

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"

PUBLIC_ROUTES = [
    "/api/admin/login",
    "/api/admin/register",
    "/docs",
    "/openapi.json",
    "/redoc",
    "/embeddings",
    "/attendance/mark",
]

class JWTAuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):

        # Public routes skip karo
        if any(request.url.path.startswith(route) for route in PUBLIC_ROUTES):
            return await call_next(request)

        # Cookie se token lo
        token = request.cookies.get("access_token")  # ← Cookie se
        
        # print("token here",token)

        if not token:
            return JSONResponse(
                status_code=401,
                content={"detail": "Not authenticated"}
            )

        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            request.state.user = payload  # user info attach karo request mein

        except JWTError:
            return JSONResponse(
                status_code=401,
                content={"detail": "Invalid or expired token"}
            )

        return await call_next(request)