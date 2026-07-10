import { useState } from 'react';
import type { LessonExerciseData } from '../../types';
import { McqExercise } from './McqExercise';
import { TypingExercise } from './TypingExercise';
import { PuzzleExercise } from './PuzzleExercise';
import { ListenRepeatExercise } from './ListenRepeatExercise';
import { useProgressStore } from '../../lib/store';
import { LessonSummary, type LessonSummaryData } from './LessonSummary';

export function LessonRunner({
  exercises,
  onExit,
  accentColor = '#3b82f6',
}: {
  exercises: LessonExerciseData[];
  onExit: () => void;
  accentColor?: string;
}) {
  const recordAnswer = useProgressStore((s) => s.recordAnswer);
  const hearts = useProgressStore((s) => s.hearts);

  const [index, setIndex] = useState(0);
  const [xpGained, setXpGained] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [toReview, setToReview] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);

  const current = exercises[index];
  const progressPct = Math.round((index / exercises.length) * 100);

  const handleResult = (correct: boolean) => {
    const { xpGained: gained } = recordAnswer({ itemId: current.itemId, kind: current.kind, correct });
    setXpGained((x) => x + gained);
    if (correct) {
      setCorrectCount((c) => c + 1);
    } else {
      setToReview((r) => [...r, current.itemId]);
    }

    if (index + 1 >= exercises.length) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
    }
  };

  if (finished || exercises.length === 0) {
    const summary: LessonSummaryData = {
      xpGained,
      total: exercises.length,
      correctCount,
      accuracy: exercises.length ? Math.round((correctCount / exercises.length) * 100) : 100,
      heartsLeft: hearts,
      toReviewCount: toReview.length,
    };
    return <LessonSummary summary={summary} onDone={onExit} />;
  }

  return (
    <div className="flex flex-col min-h-full">
      <div className="flex items-center gap-3 px-4 py-3">
        <button type="button" onClick={onExit} aria-label="Quitter" className="text-gray-400 text-xl leading-none">
          ✕
        </button>
        <div className="h-2.5 flex-1 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%`, background: accentColor }}
          />
        </div>
      </div>

      <div className="flex-1" key={current.itemId}>
        {current.type === 'mcq' && <McqExercise data={current} onResult={handleResult} />}
        {current.type === 'typing' && <TypingExercise data={current} onResult={handleResult} />}
        {current.type === 'puzzle' && <PuzzleExercise data={current} onResult={handleResult} />}
        {current.type === 'listen-repeat' && <ListenRepeatExercise data={current} onResult={handleResult} />}
      </div>
    </div>
  );
}
