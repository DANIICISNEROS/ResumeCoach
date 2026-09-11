import time
import pathlib
import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-3.5-flash-lite')

def analyze_resume_from_path(pdf_path: str):
    pdf_bytes = pathlib.Path(pdf_path).read_bytes()
    prompt = "Eres reclutador tech. Analiza este CV en PDF: score 0-100, 3 fortalezas, 3 debilidades, 3 mejoras."
    
    for i in range(3): # intenta 3 veces
        try:
            response = model.generate_content([
                prompt,
                {"mime_type": "application/pdf", "data": pdf_bytes}
            ])
            return response.text
        except Exception as e:
            if "429" in str(e):
                print(f"Cuota llena, esperando 12s... intento {i+1}/3")
                time.sleep(12)
            else:
                raise e

if __name__ == "__main__":
    print(analyze_resume_from_path("testFiles/CV-HOS.pdf"))