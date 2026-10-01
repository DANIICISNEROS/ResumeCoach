"use client";

export default function ResultView({ result, loading }: { result: any, loading: boolean }) {
  if (loading) return <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 animate-pulse">Analizing your resume with AI...</div>
  if (!result) return <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-zinc-500 text-sm">The result will appear here</div>

  var answer = JSON.parse(result['analysis']);
  console.log(answer);

  return (
    <div className="space-y-4">
      {/* SCORE POR FUERA */}
      <div className="bg-zinc-900 border border-yellow-500/30 bg-yellow-500/10 rounded-2xl p-6 flex items-center justify-between">
        <div>
          <p className="text-zinc-400 text-xs uppercase tracking-widest">Score</p>
          <p className="text-zinc-500 text-xs mt-1">Resume Analysis</p>
        </div>
        <div>
          <span className="text-5xl font-black text-yellow-400">{answer.score}</span>
          <span className="text-zinc-600 text-xl">/100</span>
        </div>
      </div>

      {/* TABLA */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h2 className="font-semibold mb-4">Result</h2>

        <div className="overflow-hidden rounded-xl border border-zinc-800">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-800/50 text-zinc-400 text-[11px] uppercase">
              <tr>
                <th className="px-4 py-3 w-[130px]">Category</th>
                <th className="px-4 py-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              <tr>
                <td className="px-4 py-3 text-blue-400 font-medium">Concrete Improvements</td>
                <td className="px-4 py-3 text-zinc-300">
                  <ul className="space-y-1">
                    {answer.concrete_improvements.map((strength: string, index: number) => (
                      <li>• {strength}</li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-green-400 font-medium">Strengths</td>
                <td className="px-4 py-3 text-zinc-300">
                  <ul className="space-y-1">
                    {answer.strengths.map((strength: string, index: number) => (
                      <li>• {strength}</li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-red-400 font-medium">Weaknesses</td>
                <td className="px-4 py-3 text-zinc-300">
                  <ul className="space-y-1">
                    {answer.weaknesses.map((weakness: string, index: number) => (
                      <li>• {weakness}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}