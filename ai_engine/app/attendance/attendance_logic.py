# Handles:

# mark attendance
# prevent duplicates
# cooldown logic

import os
from datetime import datetime
from app.services.backend_api import send_attendance_to_backend

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

ATTENDANCE_DIR = os.path.join(BASE_DIR, "data", "attendance_logs")
ATTENDANCE_FILE = os.path.join(ATTENDANCE_DIR, "attendance_records.csv")

os.makedirs(ATTENDANCE_DIR, exist_ok=True)

marked_today = set()


def mark_attendance(student_id):
    """
    Mark attendance and notify backend
    """

    if student_id in marked_today:
        return

    marked_today.add(student_id)
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # create file if not exists
    if not os.path.exists(ATTENDANCE_FILE):
        with open(ATTENDANCE_FILE, "w") as f:
            f.write("StudentID,DateTime\n")

    with open(ATTENDANCE_FILE, "a") as f:
        f.write(f"{student_id},{now}\n")

    print(f"[ATTENDANCE] {student_id} marked present")

    # send to backend
    try:
        send_attendance_to_backend(student_id, now)
    except Exception as e:
        print("[ERROR] Failed to send attendance to backend:", e)