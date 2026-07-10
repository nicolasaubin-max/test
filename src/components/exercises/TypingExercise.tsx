import { useState } from 'react';
import type { TypingExerciseData } from '../../types';
import { CyrillicKeyboard } from '../ui/CyrillicKeyboard';
import { checkTypingAnswer } from '../../lib/exerciseBuilders';
import { speakRussian } from '../../lib/tts';

export function TypingExercise({
  data,
  onResult,
}: {
  data: TypingExerciseData;
  onResult: (correct: boolean) => void;
}) {
  const [answer, setAnswer] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);

  const check = () => {
    if (revealed) return;
    const correct = checkTypingAnswer(answer, data.expectedRu, data.acceptableAnswers);
    setWasCorrect(correct);
    setRevealed(true);
    if (correct) speakRussian(data.expectedRu);
  };

  return (
    <div className="flex flex-col gap-5 px-5 py-6">
      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">{data.instruction}</p>

      <div className="flex flex-col items-center gap-3 py-2">
        {data.isDictation ? (
          <button
            type="button"
            onClick={() => speakRussian(data.dictationAudioText!)}
            className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-300 text-4xl flex items-center justify-center active:scale-95 transition"
            aria-label="Écouter"
          >
            🔊
          </button>
        ) : (
          <div className="text-3xl font-bold text-center">{data.promptText}</div>
        )}
      </div>

      <div
        className={`min-h-14 w-full rounded-xl border-2 px-3 py-3 text-2xl font-medium flex items-center break-all ${
          revealed
            ? wasCorrect
              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950'
              : 'border-red-500 bg-red-50 dark:bg-red-950'
            : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800'
        }`}
      >
        {answer || <span className="text-gray-300 dark:text-gray-600">Tape ta réponse…</span>}
      </div>

      {revealed && !wasCorrect && (
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Réponse attendue : <span className="font-bold">{data.expectedRu}</span>
          <span className="italic text-gray-400"> ({data.translit})</span>
        </div>
      )}

      {!revealed && (
        <CyrillicKeyboard
          onKey={(c) => setAnswer((a) => a + c)}
          onBackspace={() => setAnswer((a) => a.slice(0, -1))}
          onSubmit={check}
        />
      )}

      {revealed && (
        <button
          type="button"
          onClick={() => onResult(wasCorrect)}
          className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold active:scale-[0.99] transition"
        >
          Continuer
        </button>
      )}
    </div>
  );
}
