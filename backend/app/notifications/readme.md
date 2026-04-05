Attendance detected
        ↓
producer pushes event
        ↓
redis queue
        ↓
consumer reads event
        ↓
message_builder
        ↓
whatsapp_service
        ↓
WAHA API
        ↓
parent gets whatsapp


In my AI-based attendance system, I implemented an event-driven notification architecture to send attendance alerts to parents via WhatsApp. When the system marks a student as present or absent, a producer module generates a notification event containing details like student name, batch, and parent phone number. This event is pushed into a Redis message queue, which acts as a broker and decouples the main application from the notification process. A consumer service runs in the background and continuously listens to the queue, retrieves events, and processes them asynchronously. The event is then passed through a notification router, which decides the delivery channel, and a message builder, which formats the human-readable message. Finally, the message is sent through a WhatsApp service that calls a self-hosted WAHA API, which delivers the message to the parent’s WhatsApp. This architecture follows the producer–consumer pattern and asynchronous processing, making the system scalable, fault-tolerant, and independent from the core attendance pipeline.