from insightface.app import FaceAnalysis
import os

def load_insightface_model():
    MODEL_ROOT = os.getenv("MODEL_ROOT")
    face_model = FaceAnalysis(
        name="buffalo_l",
        root=MODEL_ROOT
    )
    face_model.prepare(
        ctx_id=-1,
        det_size=(640,640)  # ✅ 640 → 320 kiya, kam RAM use karega
    )
    return face_model