import secure
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from slowapi.middleware import SlowAPIMiddleware
from slowapi.errors import RateLimitExceeded

from app.utils.limiter import limiter   # ✅ IMPORT FROM UTILS

from app.middleware.auth import JWTAuthMiddleware

from app.routes import (
    admin_routes,
    student_routes,
    attendance_routes,
    batch_routes,
    student_batch_routes,
    camera_routes
)

from app.database.db import Base, engine
from app.services.scheduler_service import start_scheduler
from app.api.embeddings import router as embeddings_router


# ==========================
# CREATE APP
# ==========================

app = FastAPI()


# ==========================
# RATE LIMITER
# ==========================

app.state.limiter = limiter

app.add_middleware(
    SlowAPIMiddleware
)


@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(request, exc):
    return JSONResponse(
        status_code=429,
        content={"detail": "Too many requests! Try again after 1 minute."}
    )


# ==========================
# JWT Middleware
# ==========================

app.add_middleware(
    JWTAuthMiddleware
)


# ==========================
# Secure Headers
# ==========================

secure_headers = secure.Secure()

@app.middleware("http")
async def set_secure_headers(request, call_next):
    response = await call_next(request)
    secure_headers.set_headers(response)
    return response


# ==========================
# CORS
# ==========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================
# Production error handling
# ==========================

IS_PRODUCTION = os.getenv("ENVIRONMENT") == "production"

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):

    if IS_PRODUCTION:
        return JSONResponse(
            status_code=500,
            content={"detail": "Internal server error"}
        )

    return JSONResponse(
        status_code=500,
        content={"detail": str(exc)}
    )


# ==========================
# Create Tables
# ==========================

Base.metadata.create_all(bind=engine)


# ==========================
# Background Scheduler
# ==========================

@app.on_event("startup")
def start_background_tasks():
    start_scheduler()


# ==========================
# Routers
# ==========================

app.include_router(admin_routes.router)
app.include_router(student_routes.router)
app.include_router(attendance_routes.router)
app.include_router(batch_routes.router)
app.include_router(student_batch_routes.router)
app.include_router(camera_routes.router)
app.include_router(embeddings_router)


# ==========================
# Root
# ==========================

@app.get("/")
def root():
    return {
        "message": "AI Attendance System API Running"
    }