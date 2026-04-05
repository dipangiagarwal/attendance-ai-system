from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.sql import func
from app.database.db import Base
from datetime import datetime


class Camera(Base):
    __tablename__ = "cameras"

    id = Column(Integer, primary_key=True, index=True)
    camera_name = Column(String, nullable=False)
    camera_ip = Column(String, nullable=False)
    location = Column(String, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    last_seen = Column(DateTime, default=datetime.utcnow)
    is_online = Column(Boolean, default=True)