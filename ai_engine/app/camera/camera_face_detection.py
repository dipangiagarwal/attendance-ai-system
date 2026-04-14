import cv2
import time
from datetime import datetime
from app.recognition.face_recognizer import recognize_faces
from app.services.faiss_service import is_index_initialized
from app.services.backend_api import send_attendance_to_backend, send_whatsapp_message  
from app.utils.config import ATTENDANCE_COOLDOWN                  
from app.utils.logger import get_logger     
                      

logger = get_logger(__name__)

# Track last attendance time per student to prevent duplicates
last_attendance_time = {}                                         # ← new


def process_frame(frame):
    if not is_index_initialized():
        return frame, []

    recognized_faces = recognize_faces(frame)

    for face in recognized_faces:
        box = face["box"]
        student_id = face["student_id"]

        x1, y1, x2, y2 = map(int, box)

        if student_id != "unknown":
            color = (0, 255, 0)
            label = str(student_id)

            # ↓ NEW — mark attendance with cooldown
            current_time = time.time()
            last_time = last_attendance_time.get(student_id, 0)

            if current_time - last_time > ATTENDANCE_COOLDOWN:
                timestamp = datetime.now().isoformat()
                confidence = face.get("distance", None)
                # save the attendance
                send_attendance_to_backend(student_id, timestamp, confidence)
                last_attendance_time[student_id] = current_time
                logger.info(f"Attendance marked for student {student_id}")

                # ✅ WhatsApp message bhejo
                send_whatsapp_message(
                    student_phone,   # student ka phone number
                    f"✅ Attendance marked for Student {student_id} at {timestamp}"
                )
        else:
            color = (0, 0, 255)
            label = "Unknown"

        cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)

        cv2.putText(
            frame,
            label,
            (x1, y1 - 10),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            color,
            2
        )

    return frame, recognized_faces