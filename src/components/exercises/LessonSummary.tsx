export interface LessonSummaryData {
  xpGained: number;
  total: number;
  correctCount: number;
  accuracy: number;
  heartsLeft: number;
  toReviewCount: number;
}

export function LessonSummary({ summary, onDone }: { summary: LessonSummaryData; onDone: () => void }) {
  return (
    <div className="flex flex-col items-center gap-6 px-6 py-10 text-center flex-1 justify-center">
      <div className="text-6xl">{summary.accuracy >= 80 ? '🎉' : summary.accuracy >= 50 ? '👍' : '💪'}</div>
      <h1 className="text-2xl font-bold">Leçon terminée !</h1>

      <div className="grid grid-cols-2 gap-4 w-full">
        <StatTile label="XP gagnée" value={`+${summary.xpGained}`} color="text-amber-500" />
        <StatTile label="Précision" value={`${summary.accuracy}%`} color="text-emerald-500" />
        <StatTile label="Vies restantes" value={'♥'.repeat(summary.heartsLeft) || '0'} color="text-red-500" />
        <StatTile label="À revoir" value={`${summary.toReviewCount}`} color="text-blue-500" />
      </div>

      <button
        type="button"
        onClick={onDone}
        className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold active:scale-[0.99] transition"
      >
        Continuer
      </button>
    </div>
  );
}

function StatTile({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4 flex flex-col items-center gap-1">
      <span className={`text-2xl font-extrabold ${color}`}>{value}</span>
      <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
    </div>
  );
}
