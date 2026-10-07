from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pdf_reader import extract_text_from_pdf
from analyser import analyze_resume

app = FastAPI(title="My FastAPI Application")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
@app.get("/api")
async def home():
    return {"message": "IA Resume Coach done!"}

@app.post("/upload-cv/")
@app.post("/api/upload-cv/")
async def upload_cv(file: UploadFile = File(...)):
    pdf_bytes = await file.read()
    text = extract_text_from_pdf(pdf_bytes)
    analysis = analyze_resume(text)
    
    return {
        "filename": file.filename,
        "text_preview": text[:500],
        "analysis": analysis
    }