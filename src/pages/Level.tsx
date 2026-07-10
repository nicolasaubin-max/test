import { Link, Navigate, useParams } from 'react-router-dom';
import { LEVELS } from '../data/levels';
import { useProgressStore } from '../lib/store';

export function Level() {
  const { level } = useParams();
  const levelNum = Number(level) as 1 | 2 | 3;
  const unlockedLevels = useProgressStore((s) => s.unlockedLevels);
  const def = LEVELS.find((l) => l.level === levelNum);

  if (!def) return <Navigate to="/" replace />;
  if (!unlockedLevels.includes(levelNum)) return <Navigate to="/" replace />;

  return (
    <div className="flex flex-col gap-4 px-4 py-5">
      <div>
        <Link to="/" className="text-sm text-gray-400">
          ← Retour
        </Link>
        <h1 className="text-xl font-extrabold mt-1" style={{ color: def.color }}>
          Niveau {def.level} — {def.title}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">{def.subtitle}</p>
      </div>

      <div className="flex flex-col gap-3">
        {def.modules.map((m) => (
          <Link
            key={m.id}
            to={`/level/${levelNum}/${m.id}`}
            className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-3 active:scale-[0.99] transition"
          >
            <span className="text-2xl">{m.icon}</span>
            <span className="font-semibold">{m.title}</span>
            <span className="ml-auto text-gray-300">›</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
