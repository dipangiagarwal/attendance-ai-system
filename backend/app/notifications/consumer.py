# 1. read event from redis
# 2. convert json → object
# 3. build message
# 4. send whatsapp

import json
import redis
from app.notifications.events import NotificationEvent
from app.notifications.notification_router import route_notification


redis_client = redis.Redis(
    host="attendance_redis",
    port=6379,
    db=0,
    decode_responses=True
)

QUEUE_NAME = "notification_queue"


def start_consumer():

    print("Notification consumer started...")

    while True:
        print("Waiting for event...")

        _, event_data = redis_client.blpop(QUEUE_NAME)

        print("Event received:", event_data)

        event_dict = json.loads(event_data)

        event = NotificationEvent(**event_dict)

        route_notification(event)

if __name__ == "__main__":
    start_consumer()
