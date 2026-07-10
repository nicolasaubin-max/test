import { useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { DIALOGUES } from '../data/dialogues';
import { useProgressStore } from '../lib/store';
import { AudioButton } from '../components/ui/AudioButton';
import { shuffle } from '../lib/exerciseBuilders';

const allLines = DIALOGUES.flatMap((d) => d.lines);

export function DialogueDetail() {
  const { level, dialogueId } = useParams();
  const dialogue = DIALOGUES.find((d) => d.id === dialogueId);
  const markDialogueComplete = useProgressStore((s) => s.markDialogueComplete);
  const [answers, setAnswers] = useState<Record<number, string | null>>({});

  const optionsByLine = useMemo(() => {
    if (!dialogue) return {};
    const map: Record<number, string[]> = {};
    dialogue.lines.forEach((line, i) => {
      if (!line.blank) return;
      const distractors = shuffle(allLines.filter((l) => l.ru !== line.ru)).slice(0, 2).map((l) => l.ru);
      map[i] = shuffle([line.ru, ...distractors]);
    });
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogueId]);

  if (!dialogue) return <Navigate to={`/level/${level}/dialogues`} replace />;

  const blankIndices = dialogue.lines.map((l, i) => (l.blank ? i : -1)).filter((i) => i >= 0);
  const allAnswered = blankIndices.every((i) => answers[i]);

  const handlePick = (lineIndex: number, option: string) => {
    if (answers[lineIndex]) return;
    setAnswers((a) => ({ ...a, [lineIndex]: option }));
  };

  const finish = () => {
    markDialogueComplete(dialogue.id);
  };

  const isDone = allAnswered;

  return (
    <div className="flex flex-col gap-4 px-4 py-5">
      <Link to={`/level/${level}/dialogues`} className="text-sm text-gray-400">
        ← Retour aux dialogues
      </Link>
      <div>
        <h1 className="text-xl font-extrabold">{dialogue.scenario}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">{dialogue.title}</p>
      </div>

      <div className="flex flex-col gap-3">
        {dialogue.lines.map((line, i) => {
          if (!line.blank) {
            return (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-400">{line.speaker}</span>
                <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-3 flex items-center gap-2">
                  <div className="flex-1">
                    <p className="font-medium">{line.ru}</p>
                    <p className="text-xs text-gray-400 italic">{line.translit}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{line.fr}</p>
                  </div>
                  <AudioButton text={line.ru} size="sm" />
                </div>
              </div>
            );
          }

          const picked = answers[i];
          const options = optionsByLine[i] ?? [];
          return (
            <div key={i} className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-gray-400">{line.speaker} (à toi de compléter — {line.fr})</span>
              <div className="flex flex-col gap-2">
                {options.map((opt) => {
                  let cls = 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800';
                  if (picked) {
                    if (opt === line.ru) cls = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950';
                    else if (opt === picked) cls = 'border-red-500 bg-red-50 dark:bg-red-950';
                  }
                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={!!picked}
                      onClick={() => handlePick(i, opt)}
                      className={`text-left px-3 py-2 rounded-lg border-2 font-medium ${cls}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {isDone && (
        <button
          type="button"
          onClick={finish}
          className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold active:scale-[0.99] transition"
        >
          ✅ Dialogue terminé
        </button>
      )}
    </div>
  );
}
