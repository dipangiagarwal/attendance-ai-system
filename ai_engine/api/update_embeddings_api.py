# reload embeddings when a new student is added
# this file is just reloading the system of embeddings and nothing else

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.services.faiss_service import reload_embeddings

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/reload-embeddings")
def reload_embeddings_api():
    """
    Reload embeddings and rebuild FAISS index
    """

    try:

        reload_embeddings()

        return {
            "status": "success",
            "message": "Embeddings reloaded successfully"
        }

    except Exception as e:

        return {
            "status": "error",
            "message": str(e)
        }