import { useState } from 'react';
import type { ListenRepeatExerciseData } from '../../types';
import { speakRussian } from '../../lib/tts';
import { comparePronunciation, isSpeechRecognitionAvailable, listenOnce } from '../../lib/speech';

export function ListenRepeatExercise({
  data,
  onResult,
}: {
  data: ListenRepeatExerciseData;
  onResult: (correct: boolean) => void;
}) {
  const [status, setStatus] = useState<'idle' | 'listening' | 'done'>('idle');
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);
  const [heard, setHeard] = useState<string>('');
  const speechAvailable = isSpeechRecognitionAvailable();

  const record = async () => {
    setStatus('listening');
    const result = await listenOnce('ru-RU');
    if (!result) {
      setStatus('idle');
      return;
    }
    setHeard(result.transcript);
    const { correct } = comparePronunciation(data.targetRu, result.transcript);
    setWasCorrect(correct);
    setStatus('done');
  };

  return (
    <div className="flex flex-col gap-6 px-5 py-6">
      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Écoute puis répète à voix haute :</p>

      <div className="flex flex-col items-center gap-4 py-4">
        <div className="text-3xl font-bold text-center">{data.targetRu}</div>
        <p className="text-gray-400 italic">{data.translit}</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{data.targetFr}</p>
        <button
          type="button"
          onClick={() => speakRussian(data.targetRu)}
          className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-300 text-3xl flex items-center justify-center active:scale-95 transition"
        >
          🔊
        </button>
      </div>

      {speechAvailable ? (
        <>
          <button
            type="button"
            onClick={record}
            disabled={status === 'listening'}
            className={`w-full py-4 rounded-xl font-bold text-white active:scale-[0.99] transition ${
              status === 'listening' ? 'bg-red-500 animate-pulse' : 'bg-emerald-600'
            }`}
          >
            {status === 'listening' ? '🎤 Je t\'écoute…' : '🎤 Parler'}
          </button>

          {status === 'done' && (
            <div
              className={`rounded-xl p-3 text-center text-sm ${
                wasCorrect ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300'
              }`}
            >
              {wasCorrect ? '✅ Bonne prononciation !' : '❌ À retravailler'}
              <div className="text-xs text-gray-400 mt-1">J\'ai entendu : « {heard} »</div>
            </div>
          )}
        </>
      ) : (
        <div className="rounded-xl p-3 text-center text-sm bg-gray-100 dark:bg-gray-800 text-gray-500">
          La reconnaissance vocale n'est pas disponible sur ce navigateur. Répète la phrase à voix haute, puis
          continue.
        </div>
      )}

      <button
        type="button"
        onClick={() => onResult(speechAvailable ? wasCorrect ?? false : true)}
        disabled={speechAvailable && status !== 'done'}
        className="w-full py-3 rounded-xl bg-blue-600 disabled:opacity-40 text-white font-bold active:scale-[0.99] transition"
      >
        Continuer
      </button>
    </div>
  );
}
