"use client";

export default function ResultView({ result, loading }: { result: any, loading: boolean }) {
  if (loading) return <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 animate-pulse">Analizando tu CV con IA...</div>
  if (!result) return <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-zinc-500 text-sm">El resultado aparecerá acá</div>

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h2 className="font-semibold mb-4">Resultado</h2>
      <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
    </div>
  )
}