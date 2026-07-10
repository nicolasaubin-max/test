import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PHRASES } from '../data/phrases';
import { PRONOUNS, VERBS } from '../data/verbs';
import { levelColor } from '../data/levels';
import { useProgressStore } from '../lib/store';
import { buildPhraseExercise, shuffle } from '../lib/exerciseBuilders';
import { AudioButton } from '../components/ui/AudioButton';

const LESSON_SIZE = 6;

export function PhrasesModule() {
  const { level } = useParams();
  const levelNum = Number(level) as 1 | 2 | 3;
  const navigate = useNavigate();
  const getSrs = useProgressStore((s) => s.getSrs);
  const color = levelColor(levelNum);
  const [openVerb, setOpenVerb] = useState<string | null>(null);

  const phrasesForLevel = PHRASES.filter((p) => p.level <= levelNum);

  const startLesson = () => {
    const withState = phrasesForLevel.map((phrase) => ({ phrase, srs: getSrs(`phrase-${phrase.id}`) }));
    const notMastered = withState.filter((w) => !w.srs?.mastered);
    const picked = shuffle(notMastered).slice(0, LESSON_SIZE);
    const exercises = picked.map((w) => buildPhraseExercise(w.phrase, !!w.srs));
    navigate('/lesson', {
      state: { exercises, accentColor: color, returnTo: `/level/${levelNum}/phrases` },
    });
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-5">
      <div>
        <Link to={`/level/${levelNum}`} className="text-sm text-gray-400">
          ← Retour
        </Link>
        <h1 className="text-xl font-extrabold mt-1">Phrases & conjugaison</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Sujet + verbe + complément.</p>
      </div>

      <button
        type="button"
        onClick={startLesson}
        className="w-full py-3 rounded-xl text-white font-bold active:scale-[0.99] transition"
        style={{ background: color }}
      >
        ▶ Commencer une leçon
      </button>

      <section className="flex flex-col gap-2">
        <h2 className="font-bold text-sm text-gray-500 dark:text-gray-400">Pronoms personnels</h2>
        <div className="flex flex-wrap gap-2">
          {PRONOUNS.map((p) => (
            <span key={p.ru} className="text-sm bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1">
              {p.ru} <span className="text-gray-400">({p.fr})</span>
            </span>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-bold text-sm text-gray-500 dark:text-gray-400">Verbes essentiels au présent</h2>
        {VERBS.map((v) => (
          <div key={v.id} className="rounded-xl border border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => setOpenVerb(openVerb === v.id ? null : v.id)}
              className="w-full flex items-center justify-between px-3 py-2"
            >
              <span className="font-semibold">
                {v.infinitive} <span className="text-gray-400 font-normal">— {v.fr}</span>
              </span>
              <span className="text-gray-300">{openVerb === v.id ? '−' : '+'}</span>
            </button>
            {openVerb === v.id && (
              <div className="px-3 pb-3 grid grid-cols-2 gap-1 text-sm">
                {v.present.map((c) => (
                  <div key={c.pronoun} className="flex justify-between gap-2">
                    <span className="text-gray-400">{c.pronoun}</span>
                    <span className="font-medium">{c.form}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-bold text-sm text-gray-500 dark:text-gray-400">Phrases de ce niveau</h2>
        {phrasesForLevel.map((phrase) => {
          const srs = getSrs(`phrase-${phrase.id}`);
          return (
            <div
              key={phrase.id}
              className={`rounded-xl border p-3 flex flex-col gap-1 ${
                srs?.mastered ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950' : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">{phrase.ru}</span>
                <AudioButton text={phrase.ru} size="sm" />
                {srs?.mastered && <span className="text-xs ml-auto">✅</span>}
              </div>
              <p className="text-gray-400 italic text-sm">{phrase.translit}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{phrase.fr}</p>
              {phrase.grammarNote && (
                <p className="text-xs mt-1 bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300 rounded-lg px-2 py-1">
                  💡 {phrase.grammarNote}
                </p>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}
