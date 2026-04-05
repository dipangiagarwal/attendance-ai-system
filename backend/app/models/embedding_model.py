from sqlalchemy import Column, Integer, String, ARRAY, Float, ForeignKey, DateTime
from datetime import datetime
from app.database.db import Base

class StudentEmbedding(Base):
    __tablename__ = "student_embeddings"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)
    image_url = Column(String, nullable=True)
    embedding = Column(ARRAY(Float), nullable=False)  # stores as float array
    created_at = Column(DateTime, default=datetime.utcnow)