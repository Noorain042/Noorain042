# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agents import run_jalsathi   # assumes you have agents/__init__.py exporting run_jalsathi

app = FastAPI(title="JALSATHI AI Backend")

# Allow frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # change to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    query: str
    location: str | None = None
    issue_type: str | None = None

@app.post("/api/analyze")
def analyze(request: AnalyzeRequest):
    result = run_jalsathi(
        query=request.query,
        location=request.location or "Unknown",
        issue_type=request.issue_type
    )
    return result

@app.get("/")
def root():
    return {"status": "JALSATHI AI Backend is running"}