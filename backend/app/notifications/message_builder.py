from app.notifications.events import EventType


def build_message(event):

    if event.event_type == EventType.STUDENT_PRESENT:

        return f"""
Hello Parent,

Your child {event.student_name} is PRESENT today.

Batch: {event.batch_name}

Thank you.
"""

    elif event.event_type == EventType.STUDENT_ABSENT:

        return f"""
Hello Parent,

Your child {event.student_name} is ABSENT today.

Batch: {event.batch_name}

Please contact the institute if needed.
"""

    elif event.event_type == EventType.HOLIDAY:

        return f"""
Holiday Notice

{event.message}
"""

    elif event.event_type == EventType.SYSTEM_ALERT:

        return f"""
System Alert

{event.message}
"""