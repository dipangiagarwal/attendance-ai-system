# this file is handling real time camera frames
import numpy as np
from app.recognition.insightface_encoder import detect_faces_and_embeddings


def encode_faces(frame):
    """
    Detect faces and generate embeddings from frame
    """

    face_boxes, embeddings = detect_faces_and_embeddings(frame)

    return face_boxes, embeddings