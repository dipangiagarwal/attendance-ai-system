import os
import cv2
import pickle
import numpy as np
from app.models.insightface_model import load_insightface_model

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DATASET_DIR = os.path.join(BASE_DIR, "data", "dataset")

EMBEDDINGS_DIR = os.path.join(BASE_DIR, "data", "embeddings")
EMBEDDINGS_PATH = os.path.join(EMBEDDINGS_DIR, "face_embeddings.pkl")

os.makedirs(EMBEDDINGS_DIR, exist_ok=True)

# Load InsightFace model once
model = load_insightface_model()


def encode_faces():
    known_encodings = []
    known_ids = []

    for student_id in os.listdir(DATASET_DIR):

        student_path = os.path.join(DATASET_DIR, student_id)

        if not os.path.isdir(student_path):
            continue

        for img_name in os.listdir(student_path):

            img_path = os.path.join(student_path, img_name)

            image = cv2.imread(img_path)

            if image is None:
                continue

            faces = model.get(image)

            for face in faces:

                embedding = np.array(face.embedding, dtype=np.float32)

                known_encodings.append(embedding)
                known_ids.append(student_id)

    data = {
        "encodings": known_encodings,
        "ids": known_ids
    }

    with open(EMBEDDINGS_PATH, "wb") as f:
        pickle.dump(data, f)

    print("[INFO] Face embeddings saved successfully")


if __name__ == "__main__":
    encode_faces()