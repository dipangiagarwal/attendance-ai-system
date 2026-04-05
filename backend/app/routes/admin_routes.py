from fastapi import APIRouter, Depends, HTTPException, Response, Request
from sqlalchemy.orm import Session

from app.controllers.admin_controller import (
    create_admin,
    login_admin
)

from app.database.db import get_db

from app.schemas.admin_schema import (
    AdminRegister,
    AdminLogin,
    AdminResponse,
    MessageResponse,
    AdminLoginResponse
)

from app.utils.dependencies import get_current_admin


router = APIRouter(
    prefix="/api/admin",
    tags=["admin"]
)


# ---------------- REGISTER ----------------

@router.post("/register", response_model=AdminResponse)
def register_admin(
    admin: AdminRegister,
    db: Session = Depends(get_db)
):

    new_admin = create_admin(
        db,
        admin
    )

    if not new_admin:
        raise HTTPException(
            status_code=400,
            detail="Admin already exists"
        )

    return new_admin


# ---------------- LOGIN ----------------

@router.post("/login", response_model=AdminLoginResponse)
def login(
    admin: AdminLogin,
    response: Response,
    db: Session = Depends(get_db)
):

    result = login_admin(
        db,        # positional argument
        admin,     # ✅ FIXED
        response
    )

    if not result:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    return result


# ---------------- LOGOUT ----------------

@router.post("/logout", response_model=MessageResponse)
def logout(response: Response):

    response.delete_cookie(
        key="access_token",
        path="/"
    )

    return {
        "message": "Admin logged out successfully"
    }


# ---------------- DASHBOARD ----------------

@router.get("/dashboard")
def admin_dashboard(
    current_admin: str = Depends(get_current_admin)
):

    return {
        "message": "Welcome Admin",
        "admin_email": current_admin
    }