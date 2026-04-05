from fastapi import APIRouter
from app.database.embedding_repository import load_all_embeddings
from app.services.embedding_generator import generate_all_embeddings

router = APIRouter()

@router.get("/embeddings")
def get_embeddings():
    
    student_ids, embeddings = load_all_embeddings()

    return {
        "student_ids": student_ids,
        "embeddings": [e.tolist() for e in embeddings]
    }


@router.post("/embeddings/generate")
def generate_embeddings():
    result = generate_all_embeddings()
    return {"message": "Embeddings generated", "result": result}