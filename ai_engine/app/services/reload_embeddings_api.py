from fastapi import APIRouter
from app.services.backend_api import fetch_embeddings_from_backend

router = APIRouter()

known_face_ids = []
known_face_encodings = []


@router.post("/reload-embeddings")
def reload_embeddings():

    global known_face_ids
    global known_face_encodings

    ids, encodings = fetch_embeddings_from_backend()

    known_face_ids = ids
    known_face_encodings = encodings

    print("[INFO] Embeddings reloaded successfully")

    return {"message": "Embeddings reloaded"}