import { Link, useNavigate, useParams } from 'react-router-dom';
import { ALPHABET } from '../data/alphabet';
import { levelColor } from '../data/levels';
import { useProgressStore } from '../lib/store';
import { buildLetterExercise, shuffle } from '../lib/exerciseBuilders';

const LESSON_SIZE = 8;

export function AlphabetModule() {
  const { level } = useParams();
  const levelNum = Number(level) as 1 | 2 | 3;
  const navigate = useNavigate();
  const getSrs = useProgressStore((s) => s.getSrs);
  const color = levelColor(levelNum);

  const startLesson = () => {
    const withState = ALPHABET.map((letter) => ({
      letter,
      srs: getSrs(`letter-${letter.id}`),
    }));
    const notMastered = withState.filter((w) => !w.srs?.mastered);
    const picked = shuffle(notMastered).slice(0, LESSON_SIZE);
    const exercises = picked.map((w) => buildLetterExercise(w.letter, ALPHABET, !!w.srs));
    navigate('/lesson', {
      state: { exercises, accentColor: color, returnTo: `/level/${levelNum}/alphabet` },
    });
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-5">
      <div>
        <Link to={`/level/${levelNum}`} className="text-sm text-gray-400">
          ← Retour
        </Link>
        <h1 className="text-xl font-extrabold mt-1">Alphabet cyrillique</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Les 33 lettres, une à une.</p>
      </div>

      <button
        type="button"
        onClick={startLesson}
        className="w-full py-3 rounded-xl text-white font-bold active:scale-[0.99] transition"
        style={{ background: color }}
      >
        ▶ Commencer une leçon
      </button>

      <div className="grid grid-cols-4 gap-2">
        {ALPHABET.map((letter) => {
          const srs = getSrs(`letter-${letter.id}`);
          return (
            <Link
              key={letter.id}
              to={`/level/${levelNum}/alphabet/${letter.id}`}
              className={`relative aspect-square rounded-xl border-2 flex flex-col items-center justify-center font-bold text-xl transition ${
                srs?.mastered
                  ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
              }`}
            >
              {letter.upper}{letter.lower}
              {letter.falseFriend && <span className="absolute top-1 right-1 text-[10px]">⚠️</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
