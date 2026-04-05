from sqlalchemy import Column, Integer, ForeignKey
from app.database.db import Base


class StudentBatch(Base):

    __tablename__ = "student_batches"

    id = Column(Integer, primary_key=True, index=True)

    student_id = Column(Integer, ForeignKey("students.id"), nullable=False)

    batch_id = Column(Integer, ForeignKey("batches.id"), nullable=False)