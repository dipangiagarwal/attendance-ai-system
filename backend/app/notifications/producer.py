from app.notifications.events import NotificationEvent, EventType
from app.notifications.queue import push_event


def send_present_event(student_id, student_name, parent_phone, batch_name):

    event = NotificationEvent(
        event_type=EventType.STUDENT_PRESENT,
        student_id=student_id,
        student_name=student_name,
        parent_phone=parent_phone,
        batch_name=batch_name
    )

    push_event(event)

def send_absent_event(student_id, student_name, parent_phone, batch_name):

    event = NotificationEvent(
        event_type=EventType.STUDENT_ABSENT,
        student_id=student_id,
        student_name=student_name,
        parent_phone=parent_phone,
        batch_name=batch_name
    )

    push_event(event)

def send_holiday_event(message):

    event = NotificationEvent(
        event_type=EventType.HOLIDAY,
        message=message
    )

    push_event(event)
