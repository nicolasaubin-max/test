import { useState } from 'react';
import type { McqExerciseData } from '../../types';
import { speakRussian } from '../../lib/tts';

export function McqExercise({
  data,
  onResult,
}: {
  data: McqExerciseData;
  onResult: (correct: boolean) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handlePick = (optionId: string) => {
    if (revealed) return;
    setSelected(optionId);
    setRevealed(true);
    const correct = optionId === data.correctOptionId;
    if (correct && data.afterCorrectAudio) {
      speakRussian(data.afterCorrectAudio);
    }
  };

  return (
    <div className="flex flex-col gap-6 px-5 py-6">
      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">{data.instruction}</p>

      <div className="flex flex-col items-center gap-3 py-4">
        {!data.promptAudioOnly && data.promptText && (
          <div className="text-5xl font-bold tracking-wide">{data.promptText}</div>
        )}
        {data.audioText && (
          <button
            type="button"
            onClick={() => speakRussian(data.audioText!)}
            className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-300 text-3xl flex items-center justify-center active:scale-95 transition"
            aria-label="Écouter"
          >
            🔊
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3">
        {data.options.map((opt) => {
          const isCorrect = opt.id === data.correctOptionId;
          const isSelected = opt.id === selected;
          let cls = 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800';
          if (revealed && isCorrect) cls = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950';
          else if (revealed && isSelected && !isCorrect) cls = 'border-red-500 bg-red-50 dark:bg-red-950';

          return (
            <button
              key={opt.id}
              type="button"
              disabled={revealed}
              onClick={() => handlePick(opt.id)}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 font-medium text-lg transition ${cls} disabled:opacity-100`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div className="flex flex-col gap-3 mt-2">
          {data.afterCorrectTranslit && (
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 italic">{data.afterCorrectTranslit}</p>
          )}
          <button
            type="button"
            onClick={() => onResult(selected === data.correctOptionId)}
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold active:scale-[0.99] transition"
          >
            Continuer
          </button>
        </div>
      )}
    </div>
  );
}
