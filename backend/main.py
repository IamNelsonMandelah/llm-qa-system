from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware 
from pydantic import BaseModel
from datetime import datetime
from dotenv import load_dotenv
from fastapi.staticfiles import StaticFiles
import os
import google.generativeai as genai


load_dotenv()


genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


app = FastAPI()

# # CORS settings
# origins = [
#     "http://localhost:3000",
#     "http://127.0.0.1:3000",
#     "http://192.168.139.239:3000",
# not neccessary for now
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# Defining request schema
class Query(BaseModel):
    question: str

# POST endpoint
@app.post("/api/ask")
async def ask_question(query: Query):
    try:
        timestamp_received = datetime.now().isoformat()
        model = genai.GenerativeModel("models/gemini-1.5-flash")
        response = model.generate_content(query.question)
        timestamp_responded = datetime.now().isoformat()

        return {
            "question": query.question,
            "answer": response.text.strip(),
            "timestamp_received": timestamp_received,
            "timestamp_responded": timestamp_responded
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#  Mounting frontend build directory
app.mount("/", StaticFiles(directory="frontend_build", html=True), name="frontend")
