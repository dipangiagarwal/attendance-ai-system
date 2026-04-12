import requests
import numpy as np
from app.utils.config import BACKEND_URL
import os

def fetch_embeddings_from_backend():
    url = f"{BACKEND_URL}/embeddings"

    try:
        response = requests.get(url)

        if response.status_code != 200:
            print("[ERROR] Failed to fetch embeddings")
            return [], []

        data = response.json()

        # ← CORRECT — matches your backend response format
        student_ids = data["student_ids"]
        embeddings = [np.array(e, dtype=np.float32) for e in data["embeddings"]]

        print(f"[INFO] Fetched {len(student_ids)} embeddings from backend")

        return student_ids, embeddings

    except Exception as e:
        print("[ERROR] Backend connection failed:", e)
        return [], []


def send_attendance_to_backend(student_id, timestamp, confidence_score= None):
    url = f"{BACKEND_URL}/attendance/mark"

    payload = {
        "student_id": student_id,
        "batch_id": 1,              # ← hardcode for now, fix later
        "status": "present",
        "confidence_score": confidence_score,
        "camera_id": "camera_default"
    }

    try:
        response = requests.post(url, json=payload)
        
        print(f"[DEBUG] Status: {response.status_code}")
        print(f"[DEBUG] Response: {response.text}")

        if response.status_code == 200:
            print(f"[BACKEND] Attendance sent for {student_id}")
        else:
            print("[ERROR] Backend attendance API failed")

    except Exception as e:
        print("[ERROR] Failed to send attendance:", e)



# def send_whatsapp_message(phone_number, message):
#     try:
#         WAHA_URL = os.getenv("WAHA_URL", "http://localhost:3001")
#         WAHA_API_KEY = os.getenv("WAHA_API_KEY")

#         response = requests.post(
#             f"{WAHA_URL}/api/sendText",
#             json={
#                 "chatId": f"{phone_number}@c.us",
#                 "text": message,
#                 "session": "default"
#             },
#             headers={"X-Api-Key": WAHA_API_KEY}
#         )
#         print(f"[INFO] WhatsApp message sent to {phone_number}")
#         return True
#     except Exception as e:
#         print(f"[ERROR] WhatsApp send failed: {e}")
#         return False