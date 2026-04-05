from app.notifications.events import EventType
from app.notifications.whatsapp_service import send_whatsapp
from app.notifications.message_builder import build_message


def route_notification(event):

    message = build_message(event)

    if event.event_type == EventType.STUDENT_PRESENT:

        if event.parent_phone:
            send_whatsapp(event.parent_phone, message)

    elif event.event_type == EventType.STUDENT_ABSENT:

        if event.parent_phone:
            send_whatsapp(event.parent_phone, message)

    elif event.event_type == EventType.HOLIDAY:

        if event.parent_phone:
            send_whatsapp(event.parent_phone, message)

    elif event.event_type == EventType.SYSTEM_ALERT:

        print("System Alert:", message)