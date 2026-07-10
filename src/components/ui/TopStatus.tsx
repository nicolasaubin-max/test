import { useProgressStore } from '../../lib/store';
import { Hearts } from './Hearts';
import { StreakBadge } from './StreakBadge';

export function TopStatus() {
  const hearts = useProgressStore((s) => s.hearts);
  const streak = useProgressStore((s) => s.streak);
  const xp = useProgressStore((s) => s.xp);

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur sticky top-0 z-20">
      <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
        <span>⭐</span>
        <span>{xp} XP</span>
      </div>
      <StreakBadge streak={streak} />
      <Hearts hearts={hearts} />
    </div>
  );
}
