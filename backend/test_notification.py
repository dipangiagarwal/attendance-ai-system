from app.notifications.events import NotificationEvent, EventType
from app.notifications.queue import push_event


event = NotificationEvent(
    event_type=EventType.STUDENT_PRESENT,
    student_id=1,
    student_name="dipangi agarwal",
    batch_name="Morning Batch",
    parent_phone="9999888877"
)

push_event(event)

print("Event pushed to Redis queue successfully")