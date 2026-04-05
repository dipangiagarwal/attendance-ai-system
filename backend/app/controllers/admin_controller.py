from fastapi import Response
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.models.admin_model import Admin
from app.schemas.admin_schema import AdminRegister, AdminLogin
from app.utils.hash import hash_password, verify_password
from app.utils.jwt import create_access_token
from app.schemas.admin_schema import AdminResponse

def create_admin(db: Session, admin: AdminRegister):

    existing_admin = db.query(Admin).filter(Admin.email == admin.email).first()

    if existing_admin:
        return None

    hashed_password = hash_password(admin.password)

    new_admin = Admin(
        name=admin.name,
        email=admin.email,
        password_hash=hashed_password
    )

    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)

    return new_admin


def login_admin(db: Session, admin: AdminLogin, response: Response):

    existing_admin = db.query(Admin).filter(Admin.email == admin.email).first()

    if not existing_admin:
        return None

    if not verify_password(admin.password, existing_admin.password_hash):
        return None

    # create token
    token = create_access_token(
        data={"sub": existing_admin.email}
    )

    # set token in cookie
    response.set_cookie(
        key = "access_token",
        value = token,
        httponly= True,  # JS can't access it
        # max_age= 86400
        samesite="lax",
        secure= False  #true in production
    )

    return {
        "message": "Login successful",
        "admin": AdminResponse.model_validate(existing_admin)
    }