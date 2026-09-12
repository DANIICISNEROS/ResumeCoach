# boss, join everything together
from fastapi import FastAPI, UploadFile, File
from pdf_reader import extract_text_from_pdf
from analyser import analyze_resume_from_path
import google.generativeai as genai
import os
import time
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-3.5-flash-lite')

app = FastAPI(title="My FastAPI Application")

@app.get("/")
async def home():
    return {"message": "IA Resume Coach done!"}

@app.post("/upload-cv/")
async def upload_cv(file: UploadFile = File(...)):
    pdf_bytes = await file.read()
    text = extract_text_from_pdf(pdf_bytes)
    # analysis = analyze_resume_from_path(file.filename)
    
    prompt = f"""
    Eres un reclutador tech experto. Analiza este CV:
    ---
    {text[:8000]}
    ---
    Dame en formato JSON:
    1. score (0-100)
    2. fortalezas (3 bullets)
    3. debilidades (3 bullets)
    4. mejoras_concretas (3 bullets)
    """

    for i in range(3):
        try:
            response = model.generate_content(prompt)
            return {
                "filename": file.filename,
                "text_preview": text[:500],
                "analysis": response.text
            }
        except Exception as e:
            if "429" in str(e):
                time.sleep(12)
            else:
                return {"error": str(e)}
    
    return {"error": "Cuota excedida, espera 1 min"}