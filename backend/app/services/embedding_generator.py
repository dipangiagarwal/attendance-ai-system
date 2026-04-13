# import os
# import requests
# import numpy as np
# import cv2
# from typing import List
# from insightface.app import FaceAnalysis
# from dotenv import load_dotenv
# from app.database.embedding_repository import save_embedding
# from app.database.db import SessionLocal
# from app.models.student_model import Student

# load_dotenv()
# MODEL_ROOT = os.getenv("MODEL_ROOT")

# def generate_embedding_from_image(student_id, image_url):
#     face_app = FaceAnalysis(name="buffalo_l", root=MODEL_ROOT)
#     face_app.prepare(ctx_id=-1, det_size=(320, 320))
#     try:
#         response = requests.get(image_url)

#         if response.status_code != 200:
#             print(f"[ERROR] Could not download image for student {student_id}")
#             return False

#         image_array = np.frombuffer(response.content, np.uint8)
#         image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

#         if image is None:
#             print(f"[ERROR] Could not decode image for student {student_id}")
#             return False

#         faces = face_app.get(image)

#         if len(faces) == 0:
#             print(f"[WARNING] No face detected for student {student_id}")
#             return False

#         embedding = faces[0].embedding
#         embedding = embedding / np.linalg.norm(embedding)

#         save_embedding(student_id, image_url, embedding)
#         print(f"[INFO] Embedding saved for student {student_id}")
#         return True

#     except Exception as e:
#         print(f"[ERROR] Embedding generation failed for student {student_id}: {e}")
#         return False


# def generate_all_embeddings():
#     db = SessionLocal()
#     try:
#         students: List[Student] = db.query(Student).all()

#         if not students:
#             print("[WARNING] No students found in DB")
#             return {"message": "No students found"}

#         success = 0
#         failed = 0

#         for student in students:
#             photo_url = getattr(student, "photo_url", None)
#             student_id = getattr(student, "id", None)
#             student_name = getattr(student, "name", None)

#             if not photo_url:
#                 print(f"[WARNING] No photo for student {student_id}")
#                 failed += 1
#                 continue

#             print(f"[INFO] Processing student {student_id} - {student_name}")
#             result = generate_embedding_from_image(student_id, photo_url)

#             if result:
#                 success += 1
#             else:
#                 failed += 1

#         return {"success": success, "failed": failed}

#     finally:
#         db.close()

import os
import requests
import numpy as np
import cv2
from typing import List
from insightface.app import FaceAnalysis
from dotenv import load_dotenv
from app.database.embedding_repository import save_embedding
from app.database.db import SessionLocal
from app.models.student_model import Student

load_dotenv()
MODEL_ROOT = os.getenv("MODEL_ROOT")

# =========================================
# OFFICE + LAPTOP DONO KE LIYE SAME
# Lazy load — RAM bachane ke liye
# Model sirf tab load hoga jab naya student add ho
# =========================================
_face_app = None

def get_face_app():
    global _face_app
    if _face_app is None:
        print("[INFO] InsightFace load ho raha hai backend mein...")
        _face_app = FaceAnalysis(name="buffalo_l", root=MODEL_ROOT)
        _face_app.prepare(ctx_id=-1, det_size=(640, 640))
        print("[INFO] InsightFace ready!")
    return _face_app


def generate_embedding_from_image(student_id, image_url):
    try:
        response = requests.get(image_url)
        if response.status_code != 200:
            print(f"[ERROR] Image download failed for student {student_id}")
            return False

        image_array = np.frombuffer(response.content, np.uint8)
        image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

        if image is None:
            print(f"[ERROR] Image decode failed for student {student_id}")
            return False

        face_app = get_face_app()  # ✅ lazy load
        faces = face_app.get(image)

        if len(faces) == 0:
            print(f"[WARNING] No face detected for student {student_id}")
            return False

        embedding = faces[0].embedding
        embedding = embedding / np.linalg.norm(embedding)
        save_embedding(student_id, image_url, embedding)
        print(f"[INFO] Embedding saved for student {student_id}")
        return True

    except Exception as e:
        print(f"[ERROR] Embedding generation failed: {e}")
        return False


def generate_all_embeddings():
    db = SessionLocal()
    try:
        students: List[Student] = db.query(Student).all()

        if not students:
            print("[WARNING] No students found in DB")
            return {"message": "No students found"}

        success = 0
        failed = 0

        for student in students:
            photo_url = getattr(student, "photo_url", None)
            student_id = getattr(student, "id", None)
            student_name = getattr(student, "name", None)

            if not photo_url:
                print(f"[WARNING] No photo for student {student_id}")
                failed += 1
                continue

            print(f"[INFO] Processing {student_id} - {student_name}")
            result = generate_embedding_from_image(student_id, photo_url)

            if result:
                success += 1
            else:
                failed += 1

        return {"success": success, "failed": failed}

    finally:
        db.close()