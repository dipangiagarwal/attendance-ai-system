# Responsibilities:
# compare embeddings
# calculate distance
# identify student
   
import numpy as np
from app.recognition.face_encoder import encode_faces
from app.services.faiss_service import search_face
from app.utils.logger import get_logger

logger = get_logger(__name__)


def recognize_faces(frame):
    """
    Detect faces in frame and recognize them
    """

    face_boxes, embeddings = encode_faces(frame)

    recognized_faces = []

    for box, embedding in zip(face_boxes, embeddings):

        student_id, distance = search_face(embedding)

        if student_id is not None:

            recognized_faces.append({
                "student_id": student_id,
                "box": box,
                "distance": float(distance)
            })

        else:

            recognized_faces.append({
                "student_id": "unknown",
                "box": box,
                "distance": None
            })

    return recognized_faces