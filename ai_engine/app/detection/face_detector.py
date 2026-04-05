#only detects faces
# Example detectors: HOG, MTCNN, RetinaFace, YOLO face

#output: face bounding boxes

from app.recognition.insightface_encoder import detect_faces_and_embeddings


def detect_faces(frame):
    """
    Detect faces using InsightFace.
    Returns only bounding boxes (used for drawing / tracking).
    """

    face_boxes, _ = detect_faces_and_embeddings(frame)

    return face_boxes