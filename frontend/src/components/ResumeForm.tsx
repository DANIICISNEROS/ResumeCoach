"use client";

type Props = {
  jobDesc: string;
  setJobDesc: (v: string) => void;
  file: File | null;
  setFile: (f: File | null) => void;
  onAnalyze: () => void;
  loading: boolean;
};

export default function ResumeForm({ jobDesc, setJobDesc, file, setFile, onAnalyze, loading }: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h2 className="font-semibold mb-4">1. Tu CV</h2>
      <label className="border-2 border-dashed border-zinc-700 rounded-xl h-40 flex flex-col items-center justify-center cursor-pointer hover:border-zinc-500 transition">
        <input type="file" className="hidden" accept=".pdf,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <span className="text-3xl">📄</span>
        <span className="text-sm text-zinc-400 mt-2">{file? file.name : "Arrastrá tu PDF o DOCX"}</span>
      </label>

      <h2 className="font-semibold mt-8 mb-4">2. Descripción del trabajo</h2>
      <textarea
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        placeholder="Pegá acá la descripción de LinkedIn..."
        className="w-full h-40 bg-black border border-zinc-800 rounded-xl p-4 text-sm outline-none focus:border-white"
      />

      <button
        onClick={onAnalyze}
        disabled={loading}
        className="w-full mt-6 bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200 disabled:opacity-50"
      >
        {loading? "Analizando..." : "Analizar CV →"}
      </button>
    </div>
  );
}