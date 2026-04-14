import os
import secure
import threading
from datetime import datetime, timedelta
import time

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from slowapi.middleware import SlowAPIMiddleware
from slowapi.errors import RateLimitExceeded

from app.utils.limiter import limiter
from app.middleware.auth import JWTAuthMiddleware

from app.database.db import Base, engine

from app.routes import (
    admin_routes,
    student_routes,
    attendance_routes,
    batch_routes,
    student_batch_routes,
    camera_routes
)

from app.api.embeddings import router as embeddings_router

from app.services.scheduler_service import start_scheduler
from app.notifications.consumer import start_consumer

from app.tasks.batch_scheduler import run_batch_scheduler
from app.tasks.daily_reset import reset_batches


# =========================
# APP INIT
# =========================

app = FastAPI()


# =========================
# RATE LIMITER
# =========================

app.state.limiter = limiter

app.add_middleware(SlowAPIMiddleware)


@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(request, exc):
    return JSONResponse(
        status_code=429,
        content={"detail": "Too many requests! Try again later."}
    )


# =========================
# JWT MIDDLEWARE
# =========================

app.add_middleware(JWTAuthMiddleware)


# =========================
# SECURITY HEADERS
# =========================

secure_headers = secure.Secure()

@app.middleware("http")
async def set_secure_headers(request, call_next):
    response = await call_next(request)
    secure_headers.set_headers(response)
    return response


# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# GLOBAL ERROR HANDLER
# =========================

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


# =========================
# DB TABLE CREATE
# =========================

Base.metadata.create_all(bind=engine)


# =========================
# DAILY RESET SCHEDULER
# =========================

def run_daily_reset_scheduler():
    while True:
        now = datetime.now()

        next_run = datetime.combine(now.date(), datetime.min.time()) + timedelta(days=1)
        sleep_seconds = (next_run - now).total_seconds()

        print(f"[RESET] Sleeping {sleep_seconds} seconds until midnight reset")
        time.sleep(sleep_seconds)

        try:
            reset_batches()
            print("[RESET] Batch flags reset successfully")
        except Exception as e:
            print("[RESET ERROR]", e)


# =========================
# STARTUP TASKS
# =========================

@app.on_event("startup")
def start_background_tasks():

    # -------------------------
    # 1. Batch Scheduler
    # -------------------------
    scheduler_thread = threading.Thread(
        target=run_batch_scheduler,
        daemon=True
    )
    scheduler_thread.start()
    print("[INFO] Batch scheduler started")

    # -------------------------
    # 2. WhatsApp Consumer
    # -------------------------
    consumer_thread = threading.Thread(
        target=start_consumer,
        daemon=True
    )
    consumer_thread.start()
    print("[INFO] Notification consumer started")

    # -------------------------
    # 3. Daily Reset Scheduler
    # -------------------------
    reset_thread = threading.Thread(
        target=run_daily_reset_scheduler,
        daemon=True
    )
    reset_thread.start()
    print("[INFO] Daily reset scheduler started")


# =========================
# ROUTES
# =========================

app.include_router(admin_routes.router)
app.include_router(student_routes.router)
app.include_router(attendance_routes.router)
app.include_router(batch_routes.router)
app.include_router(student_batch_routes.router)
app.include_router(camera_routes.router)
app.include_router(embeddings_router)


# =========================
# ROOT ENDPOINT
# =========================

@app.get("/")
def root():
    return {
        "message": "AI Attendance System API Running"
    }