# 🎓 AI-Based Real-Time Attendance System using Face Recognition

An AI-powered real-time attendance system that uses **face recognition technology** to automatically mark attendance.  
The system captures frames from cameras, detects faces, recognizes registered students, records attendance, and supports notification services.

This project integrates **AI inference**, **backend APIs**, **frontend dashboard**, and **containerized services** into a complete production-ready architecture.

---

# 🚀 Key Features

✅ Real-time face detection  
✅ Face recognition using InsightFace models  
✅ Multi-student recognition support  
✅ Automatic attendance marking  
✅ Redis-based fast processing  
✅ WhatsApp notification integration (WAHA)  
✅ FastAPI backend services  
✅ Next.js frontend dashboard  
✅ Docker-based deployment  
✅ Modular AI engine architecture  
✅ Admin-ready backend structure  
✅ Scalable system design  

---

# 🧠 System Architecture

This system consists of multiple services working together:

Camera → AI Engine → Backend → Database → Frontend → Notifications


Components:

- **AI Engine** → Detects & recognizes faces  
- **Backend** → Stores attendance data  
- **Frontend** → Displays dashboard  
- **Redis** → Handles caching  
- **WAHA** → Sends WhatsApp messages  

---

# 🧰 Tech Stack

## 🧠 AI Engine
- Python
- InsightFace
- OpenCV
- ONNX Runtime
- NumPy

## ⚙️ Backend
- FastAPI
- Python
- Redis
- REST APIs

## 🌐 Frontend
- Next.js
- React
- Tailwind CSS
- Axios

## 🐳 Infrastructure
- Docker
- Docker Compose
- Redis
- WAHA (WhatsApp HTTP API)

---

# 📁 Project Structure

ai-attendance/
│
├── backend/ # FastAPI backend
│ ├── app/
│ ├── requirements.txt
│ └── .env
│
├── ai_engine/ # AI face recognition engine
│ ├── insightface_models/
│ ├── main.py
│ └── requirements.txt
│
├── ai_frontend/ # Next.js frontend
│ ├── src/
│ ├── public/
│ └── .env.local
│
├── docker-compose.yml # Multi-service Docker setup
├── .gitignore
└── README.md


---


# ⚙️ Installation Guide

You can run this project using **Docker** (recommended) or **without Docker**.

---

# 🐳 Option 1 — Run Using Docker (Recommended)

## Step 1 — Clone Repository

```bash
git clone https://github.com/dipangiagarwal/attendance-ai-system.git
cd attendance-ai-system
docker compose up --build

