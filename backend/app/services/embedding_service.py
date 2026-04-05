import requests

def notify_ai_engine_reload():

    try:
        requests.post("http://localhost:9000/reload-embeddings")
        print("[INFO] AI Engine embeddings reloaded")

    except Exception as e:
        print("[ERROR] Could not notify AI engine:", e)