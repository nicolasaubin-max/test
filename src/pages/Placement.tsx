import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ALPHABET } from '../data/alphabet';
import { VOCABULARY } from '../data/vocabulary';
import { PHRASES } from '../data/phrases';
import { useProgressStore } from '../lib/store';
import { shuffle } from '../lib/exerciseBuilders';

interface Question {
  prompt: string;
  options: string[];
  correct: string;
}

function buildPlacementQuestions(): Question[] {
  const letterQs: Question[] = shuffle(ALPHABET)
    .slice(0, 3)
    .map((letter) => {
      const distractors = shuffle(ALPHABET.filter((l) => l.id !== letter.id)).slice(0, 3);
      return {
        prompt: `Quel est le son de « ${letter.upper}${letter.lower} » ?`,
        options: shuffle([letter.sound, ...distractors.map((d) => d.sound)]),
        correct: letter.sound,
      };
    });

  const wordQs: Question[] = shuffle(VOCABULARY)
    .slice(0, 3)
    .map((word) => {
      const distractors = shuffle(VOCABULARY.filter((w) => w.id !== word.id)).slice(0, 3);
      return {
        prompt: `Que veut dire « ${word.ru} » ?`,
        options: shuffle([word.fr, ...distractors.map((d) => d.fr)]),
        correct: word.fr,
      };
    });

  const phraseQs: Question[] = shuffle(PHRASES)
    .slice(0, 2)
    .map((phrase) => {
      const distractors = shuffle(PHRASES.filter((p) => p.id !== phrase.id)).slice(0, 3);
      return {
        prompt: `Que veut dire « ${phrase.ru} » ?`,
        options: shuffle([phrase.fr, ...distractors.map((d) => d.fr)]),
        correct: phrase.fr,
      };
    });

  return shuffle([...letterQs, ...wordQs, ...phraseQs]);
}

export function Placement() {
  const navigate = useNavigate();
  const unlockLevel = useProgressStore((s) => s.unlockLevel);
  const markPlacementDone = useProgressStore((s) => s.markPlacementDone);
  const questions = useMemo(buildPlacementQuestions, []);

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const current = questions[index];

  const pick = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    if (opt === current.correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (index + 1 >= questions.length) {
      setFinished(true);
      const ratio = (score + (selected === current.correct ? 1 : 0)) / questions.length;
      if (ratio >= 0.8) {
        unlockLevel(2);
        unlockLevel(3);
      } else if (ratio >= 0.4) {
        unlockLevel(2);
      }
      markPlacementDone();
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
    }
  };

  if (finished) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 flex-1 px-6 py-10 text-center">
        <div className="text-5xl">🎯</div>
        <h1 className="text-xl font-extrabold">Test terminé !</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Score : {score} / {questions.length}
        </p>
        <button
          type="button"
          onClick={() => navigate('/', { replace: true })}
          className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold active:scale-[0.99] transition"
        >
          Voir mon parcours
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-5 py-8 flex-1">
      <p className="text-sm text-gray-400">
        Question {index + 1} / {questions.length}
      </p>
      <p className="text-xl font-bold">{current.prompt}</p>
      <div className="flex flex-col gap-3">
        {current.options.map((opt) => {
          let cls = 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800';
          if (selected) {
            if (opt === current.correct) cls = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950';
            else if (opt === selected) cls = 'border-red-500 bg-red-50 dark:bg-red-950';
          }
          return (
            <button
              key={opt}
              type="button"
              disabled={!!selected}
              onClick={() => pick(opt)}
              className={`text-left px-4 py-3 rounded-xl border-2 font-medium ${cls}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {selected && (
        <button
          type="button"
          onClick={next}
          className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold active:scale-[0.99] transition mt-auto"
        >
          {index + 1 >= questions.length ? 'Terminer' : 'Suivant'}
        </button>
      )}
    </div>
  );
}
