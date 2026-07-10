import { Link } from 'react-router-dom';
import { LEVELS } from '../data/levels';
import { useProgressStore } from '../lib/store';
import { XPBar } from '../components/ui/XPBar';

export function Home() {
  const unlockedLevels = useProgressStore((s) => s.unlockedLevels);
  const xpLevel = useProgressStore((s) => s.xpLevel());
  const xpProgress = useProgressStore((s) => s.xpProgressInLevel());
  const todayXp = useProgressStore((s) => s.todayXp);
  const dailyGoalXp = useProgressStore((s) => s.dailyGoalXp);
  const placementDone = useProgressStore((s) => s.placementDone);

  const dailyPct = Math.min(100, Math.round((todayXp / dailyGoalXp) * 100));

  return (
    <div className="flex flex-col gap-5 px-4 py-5">
      <div>
        <h1 className="text-xl font-extrabold">Привет 👋</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Apprends le russe, un peu chaque jour.</p>
      </div>

      <XPBar progress={xpProgress} level={xpLevel} />

      <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4 flex flex-col gap-2">
        <div className="flex justify-between text-sm font-semibold">
          <span>Objectif du jour</span>
          <span>
            {todayXp} / {dailyGoalXp} XP
          </span>
        </div>
        <div className="h-2.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <div className="h-full rounded-full bg-amber-500 transition-all duration-500" style={{ width: `${dailyPct}%` }} />
        </div>
      </div>

      {!placementDone && (
        <Link
          to="/placement"
          className="rounded-xl border-2 border-dashed border-blue-300 dark:border-blue-800 p-4 text-center text-blue-600 dark:text-blue-300 font-semibold"
        >
          🎯 Passer le test de placement
        </Link>
      )}

      <div className="flex flex-col gap-4">
        {LEVELS.map((lvl) => {
          const unlocked = unlockedLevels.includes(lvl.level);
          return (
            <Link
              key={lvl.level}
              to={unlocked ? `/level/${lvl.level}` : '#'}
              onClick={(e) => !unlocked && e.preventDefault()}
              className={`rounded-2xl p-4 flex flex-col gap-2 border-2 transition ${
                unlocked ? 'active:scale-[0.99]' : 'opacity-50 cursor-not-allowed'
              }`}
              style={{ borderColor: lvl.color }}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg" style={{ color: lvl.color }}>
                  Niveau {lvl.level} — {lvl.title}
                </span>
                {!unlocked && <span>🔒</span>}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{lvl.subtitle}</p>
              <div className="flex gap-2 flex-wrap">
                {lvl.modules.map((m) => (
                  <span key={m.id} className="text-xs bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1">
                    {m.icon} {m.title}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
