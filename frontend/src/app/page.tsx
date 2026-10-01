"use client";
import { useState } from "react";
import ResumeForm from "@/components/ResumeForm";
import ResultView from "@/components/ResultView";

export default function Home() {
  const [jobDesc, setJobDesc] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please, upload your resume first to continue.");
      return;
    }

    setError(""); // limpia el error
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/analyzer", { method: "POST", body: fd });

      if (!res.ok) throw new Error("Error al analizar");

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError("Hubo un error al analizar el CV. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 flex justify-center">
      <div className="max-w-5xl w-full">
        <h1 className="text-4xl font-bold">Resume Coach</h1>
        <span className="font-bold">I will help you optimize your resume for any job description</span>
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <ResumeForm jobDesc={jobDesc} setJobDesc={setJobDesc} file={file} setFile={setFile} onAnalyze={handleAnalyze} loading={loading} error={error} />
          <ResultView result={result} loading={loading} />
        </div>
      </div>
    </main>
  );
}