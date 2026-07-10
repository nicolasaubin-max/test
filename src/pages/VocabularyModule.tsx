import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { VOCABULARY, THEMES } from '../data/vocabulary';
import { levelColor } from '../data/levels';
import { useProgressStore } from '../lib/store';
import { buildVocabExercise, shuffle } from '../lib/exerciseBuilders';

const LESSON_SIZE = 8;

export function VocabularyModule() {
  const { level } = useParams();
  const levelNum = Number(level) as 1 | 2 | 3;
  const navigate = useNavigate();
  const getSrs = useProgressStore((s) => s.getSrs);
  const color = levelColor(levelNum);
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const [activeTheme, setActiveTheme] = useState<string | null>(null);

  const wordsForLevel = VOCABULARY.filter((w) => w.level <= levelNum);
  const themesForLevel = THEMES.filter((t) => wordsForLevel.some((w) => w.theme === t));

  const startLesson = () => {
    const withState = wordsForLevel.map((word) => ({ word, srs: getSrs(`word-${word.id}`) }));
    const notMastered = withState.filter((w) => !w.srs?.mastered);
    const picked = shuffle(notMastered).slice(0, LESSON_SIZE);
    const exercises = picked.map((w) => buildVocabExercise(w.word, wordsForLevel, !!w.srs));
    navigate('/lesson', {
      state: { exercises, accentColor: color, returnTo: `/level/${levelNum}/vocabulary` },
    });
  };

  const displayedWords = activeTheme ? wordsForLevel.filter((w) => w.theme === activeTheme) : wordsForLevel;

  return (
    <div className="flex flex-col gap-4 px-4 py-5">
      <div>
        <Link to={`/level/${levelNum}`} className="text-sm text-gray-400">
          ← Retour
        </Link>
        <h1 className="text-xl font-extrabold mt-1">Vocabulaire</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Cartes mémoire + quiz, classés par thème.</p>
      </div>

      <button
        type="button"
        onClick={startLesson}
        className="w-full py-3 rounded-xl text-white font-bold active:scale-[0.99] transition"
        style={{ background: color }}
      >
        ▶ Commencer une leçon
      </button>

      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        <ThemeChip label="Tous" active={!activeTheme} onClick={() => setActiveTheme(null)} />
        {themesForLevel.map((t) => (
          <ThemeChip key={t} label={t} active={activeTheme === t} onClick={() => setActiveTheme(t)} />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {displayedWords.map((word) => {
          const isFlipped = flipped[word.id];
          const srs = getSrs(`word-${word.id}`);
          return (
            <button
              key={word.id}
              type="button"
              onClick={() => setFlipped((f) => ({ ...f, [word.id]: !f[word.id] }))}
              className={`relative rounded-xl border-2 p-3 h-28 flex flex-col items-center justify-center text-center transition ${
                srs?.mastered ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
              }`}
            >
              {srs?.mastered && <span className="absolute top-1 right-1 text-xs">✅</span>}
              {isFlipped ? (
                <span className="font-semibold">{word.fr}</span>
              ) : (
                <>
                  <span className="font-bold text-lg">{word.ru}</span>
                  <span className="text-xs text-gray-400 italic">{word.translit}</span>
                </>
              )}
            </button>
          );
        })}
      </div>
      <p className="text-xs text-center text-gray-400">Touche une carte pour voir la traduction</p>
    </div>
  );
}

function ThemeChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition ${
        active ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
      }`}
    >
      {label}
    </button>
  );
}
