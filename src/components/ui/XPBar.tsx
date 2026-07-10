export function XPBar({ progress, level, colorClass = 'bg-emerald-500' }: { progress: number; level: number; colorClass?: string }) {
  return (
    <div className="flex items-center gap-2 w-full">
      <span className="text-xs font-bold text-gray-500 dark:text-gray-400 shrink-0">Niv. {level}</span>
      <div className="h-2.5 flex-1 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <div
          className={`h-full rounded-full ${colorClass} transition-all duration-500`}
          style={{ width: `${Math.min(100, progress)}%` }}
        />
      </div>
    </div>
  );
}
