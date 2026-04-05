import numpy as np
from app.models.insightface_model import load_insightface_model


model = load_insightface_model()


def detect_faces_and_embeddings(frame):
    """
    Detect faces and generate embeddings using InsightFace
    """

    faces = model.get(frame)

    face_boxes = []
    embeddings = []

    for face in faces:

        bbox = face.bbox.astype(int)

        embedding = np.array(face.embedding, dtype=np.float32)

        face_boxes.append(bbox)

        embeddings.append(embedding)

    return face_boxes, embeddings