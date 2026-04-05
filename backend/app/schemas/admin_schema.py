from pydantic import BaseModel, EmailStr, Field


class AdminRegister(BaseModel):
    name: str
    email: EmailStr
    password: str = Field(..., min_length=6, max_length=50)


class AdminLogin(BaseModel):
    email: EmailStr
    password: str


class AdminResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        from_attributes = True


class MessageResponse(BaseModel):
    message: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class AdminLoginResponse(BaseModel):
    message: str
    admin: AdminResponse