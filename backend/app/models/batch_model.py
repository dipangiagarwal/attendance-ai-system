from sqlalchemy import Column, Integer, String, DateTime, Time, Boolean
from datetime import datetime
from app.database.db import Base


class Batch(Base):

    __tablename__ = "batches"

    id = Column(Integer, primary_key=True, index=True)

    batch_name = Column(String, nullable=False)

    class_name = Column(String, nullable=False)

    start_time = Column(Time, nullable=False)

    end_time = Column(Time, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)

    absent_marked_today = Column(Boolean, default=False)