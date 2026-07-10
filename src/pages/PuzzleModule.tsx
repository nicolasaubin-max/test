import { Link, useNavigate, useParams } from 'react-router-dom';
import { PUZZLES } from '../data/puzzles';
import { levelColor } from '../data/levels';
import { useProgressStore } from '../lib/store';
import { buildPuzzleExercise, shuffle } from '../lib/exerciseBuilders';

const LESSON_SIZE = 5;

export function PuzzleModule() {
  const { level } = useParams();
  const levelNum = Number(level) as 1 | 2 | 3;
  const navigate = useNavigate();
  const getSrs = useProgressStore((s) => s.getSrs);
  const color = levelColor(levelNum);

  const puzzlesForLevel = PUZZLES.filter((p) => p.level <= levelNum);

  const startLesson = (puzzleId?: string) => {
    let picked = puzzlesForLevel;
    if (puzzleId) {
      picked = puzzlesForLevel.filter((p) => p.id === puzzleId);
    } else {
      const withState = puzzlesForLevel.map((puzzle) => ({ puzzle, srs: getSrs(`puzzle-${puzzle.id}`) }));
      const notMastered = withState.filter((w) => !w.srs?.mastered);
      picked = shuffle(notMastered).slice(0, LESSON_SIZE).map((w) => w.puzzle);
    }
    const exercises = picked.map((p) => buildPuzzleExercise(p));
    navigate('/lesson', {
      state: { exercises, accentColor: color, returnTo: `/level/${levelNum}/puzzle` },
    });
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-5">
      <div>
        <Link to={`/level/${levelNum}`} className="text-sm text-gray-400">
          ← Retour
        </Link>
        <h1 className="text-xl font-extrabold mt-1">Puzzle de phrases</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Glisse les tuiles dans le bon ordre pour construire la phrase russe.
        </p>
      </div>

      <button
        type="button"
        onClick={() => startLesson()}
        className="w-full py-3 rounded-xl text-white font-bold active:scale-[0.99] transition"
        style={{ background: color }}
      >
        ▶ Commencer une série de puzzles
      </button>

      <div className="flex flex-col gap-2">
        {puzzlesForLevel.map((puzzle) => {
          const srs = getSrs(`puzzle-${puzzle.id}`);
          return (
            <button
              key={puzzle.id}
              type="button"
              onClick={() => startLesson(puzzle.id)}
              className={`rounded-xl border p-3 text-left flex items-center gap-2 ${
                srs?.mastered ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950' : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <span className="flex-1 font-medium">{puzzle.fr}</span>
              {srs?.mastered && <span>✅</span>}
              {puzzle.distractorTiles?.length ? <span className="text-xs text-amber-500">🪤 pièges</span> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
