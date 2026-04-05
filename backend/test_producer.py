from app.notifications.producer import send_present_event

send_present_event(
    student_id=3,
    student_name="Rohit",
    parent_phone="9888777744",
    batch_name="9B"
)

print("Present event sent")