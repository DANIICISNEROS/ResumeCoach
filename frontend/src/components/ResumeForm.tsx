"use client";

type Props = {
  jobDesc: string;
  setJobDesc: (v: string) => void;
  file: File | null;
  setFile: (f: File | null) => void;
  onAnalyze: () => void;
  loading: boolean;
  error: string;
};

export default function ResumeForm({ jobDesc, setJobDesc, file, setFile, onAnalyze, loading, error }: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h2 className="font-semibold mb-4">1. Upload Your Resume</h2>
      <label className="border-2 border-dashed border-zinc-700 rounded-xl h-40 flex flex-col items-center justify-center cursor-pointer hover:border-zinc-500 transition">
        <input type="file" className="hidden" accept=".pdf,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <span className="text-3xl">📄</span>
        <span className="text-sm text-zinc-400 mt-2">{file ? file.name : "Drag and drop your PDF"}</span>
      </label>

      {error && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500 text-red-500 px-4 py-2.5 rounded-xl">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      <button
        onClick={onAnalyze}
        disabled={loading}
        className="w-full mt-6 bg-white text-black font-bold py-3 rounded-xl transition-all delay-150 duration-300 ease-in-out hover:bg-zinc-200 hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
      >
        {loading ? "Analizing..." : "Analyze Resume →"}
      </button>
    </div>
  );
}