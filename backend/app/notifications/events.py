from enum import Enum
from pydantic import BaseModel
from typing import Optional


class EventType(str, Enum):
    STUDENT_PRESENT = "student_present"
    STUDENT_ABSENT = "student_absent"
    HOLIDAY = "holiday"
    SYSTEM_ALERT = "system_alert"


class NotificationEvent(BaseModel):
    event_type: EventType
    student_id: Optional[int] = None
    parent_phone: Optional[str] = None
    student_name: Optional[str] = None
    batch_name: Optional[str] = None
    message: Optional[str] = None