import numpy as np
import cv2
from app.models.insightface_model import load_insightface_model

model = load_insightface_model()
frame_saved = False

def detect_faces_and_embeddings(frame):
    global frame_saved

    # =========================================
    # OFFICE CAMERA (Kal use karna) — IP Camera
    # 90 degree rotate — office camera ulta laga hai
    # Kal ye uncomment karo, aur laptop wala comment karo
    # =========================================
    # frame = cv2.rotate(frame, cv2.ROTATE_90_CLOCKWISE)
    # if not frame_saved:
    #     cv2.imwrite("/app/debug_frame_rotated.jpg", frame)
    #     print(f"[DEBUG] Rotated frame saved — size: {frame.shape}")
    #     frame_saved = True
    # height, width = frame.shape[:2]
    # if width < 640:
    #     scale = 640 / width
    #     frame = cv2.resize(frame, (640, int(height * scale)))

    # =========================================
    # LAPTOP WEBCAM (Abhi testing ke liye)
    # Seedha frame — koi rotation nahi
    # Kal ye comment karo, aur office wala uncomment karo
    # =========================================
    if not frame_saved:
        cv2.imwrite("/app/debug_frame.jpg", frame)
        print(f"[DEBUG] Frame saved — size: {frame.shape}")
        frame_saved = True

    faces = model.get(frame)
    print(f"[DEBUG] Faces detected: {len(faces)}")

    face_boxes = []
    embeddings = []

    for face in faces:
        bbox = face.bbox.astype(int)
        embedding = np.array(face.embedding, dtype=np.float32)
        face_boxes.append(bbox)
        embeddings.append(embedding)

    return face_boxes, embeddings