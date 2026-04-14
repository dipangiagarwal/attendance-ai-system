import redis
from app.notifications.events import NotificationEvent


redis_client = redis.Redis(
    host="attendance_redis",
    port=6379,
    db=0,
    decode_responses=True
)

QUEUE_NAME = "notification_queue"


def push_event(event: NotificationEvent):
    event_data = event.model_dump_json()
    redis_client.rpush(QUEUE_NAME, event_data)