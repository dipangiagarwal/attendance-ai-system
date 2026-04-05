# AI-Powered Attendance System 🎓🤖

An AI-based real-time attendance system using Face Recognition.  
This system captures frames from cameras, detects faces, marks attendance, and sends notifications.

---

# 🚀 Project Overview

This project consists of:

- **Backend** → FastAPI (API + Database logic)
- **AI Engine** → Face recognition & attendance processing
- **Frontend** → Next.js Admin Dashboard
- **Redis** → Task queue / caching
- **WAHA** → WhatsApp notification service
- **Docker** → Containerized environment

---

# 🧱 Project Structure

attendance-ai/

├── backend/              # FastAPI Backend  
├── ai_engine/            # AI Face Recognition Engine  
├── ai_frontend/          # Next.js Frontend  
├── waha_sessions/        # WhatsApp session storage  
├── docker-compose.yml    # Docker setup  
├── README.md  
├── .gitignore  

---

# ⚙️ Requirements

## If using Docker (Recommended)

Install:

- Docker
- Docker Compose

## If NOT using Docker

Install:

- Python 3.10+
- Node.js 18+
- Redis
- npm

---

# 🐳 Run Using Docker (Recommended)

## Step 1 — Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/attendance-ai.git
cd attendance-ai