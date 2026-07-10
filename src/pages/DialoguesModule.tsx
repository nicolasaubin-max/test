import { Link, useParams } from 'react-router-dom';
import { DIALOGUES } from '../data/dialogues';
import { useProgressStore } from '../lib/store';

export function DialoguesModule() {
  const { level } = useParams();
  const levelNum = Number(level) as 1 | 2 | 3;
  const completed = useProgressStore((s) => s.completedDialogues);

  const dialoguesForLevel = DIALOGUES.filter((d) => d.level <= levelNum);

  return (
    <div className="flex flex-col gap-4 px-4 py-5">
      <div>
        <Link to={`/level/${levelNum}`} className="text-sm text-gray-400">
          ← Retour
        </Link>
        <h1 className="text-xl font-extrabold mt-1">Mini-dialogues</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Des situations réelles à compléter.</p>
      </div>

      <div className="flex flex-col gap-2">
        {dialoguesForLevel.map((d) => (
          <Link
            key={d.id}
            to={`/level/${levelNum}/dialogues/${d.id}`}
            className={`rounded-xl border p-4 flex items-center gap-3 ${
              completed.includes(d.id) ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950' : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="flex-1">
              <p className="font-semibold">{d.scenario}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{d.title}</p>
            </div>
            {completed.includes(d.id) && <span>✅</span>}
            <span className="text-gray-300">›</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
