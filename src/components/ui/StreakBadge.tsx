export function StreakBadge({ streak }: { streak: number }) {
  return (
    <div className="flex items-center gap-1 text-orange-500 font-bold text-sm" aria-label={`Série de ${streak} jours`}>
      <span>🔥</span>
      <span>{streak}</span>
    </div>
  );
}
