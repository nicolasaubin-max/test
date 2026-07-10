import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgressStore } from '../lib/store';
import { isDue } from '../lib/srs';
import { labelForItem, resolveSrsItemToExercise } from '../lib/itemLookup';
import { shuffle } from '../lib/exerciseBuilders';

const KIND_LABELS: Record<string, string> = {
  letter: 'Lettres',
  word: 'Mots',
  phrase: 'Phrases',
  puzzle: 'Puzzles',
  personal: 'Mots personnels',
};

export function Review() {
  const navigate = useNavigate();
  const srsStates = useProgressStore((s) => s.srsStates);
  const dueItems = useMemo(
    () => Object.values(srsStates).filter((s) => !s.mastered && isDue(s)),
    [srsStates],
  );

  const grouped = dueItems.reduce<Record<string, typeof dueItems>>((acc, item) => {
    (acc[item.kind] ??= []).push(item);
    return acc;
  }, {});

  const startReview = () => {
    const picked = shuffle(dueItems).slice(0, 15);
    const exercises = picked.map(resolveSrsItemToExercise).filter((e): e is NonNullable<typeof e> => !!e);
    navigate('/lesson', { state: { exercises, accentColor: '#f97316', returnTo: '/review' } });
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-5">
      <div>
        <h1 className="text-xl font-extrabold">À revoir</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Les éléments sur le point d'être oubliés, au bon moment.
        </p>
      </div>

      {dueItems.length === 0 ? (
        <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-6 text-center text-gray-400">
          🎉 Rien à réviser pour l'instant. Reviens plus tard !
        </div>
      ) : (
        <>
          <button
            type="button"
            onClick={startReview}
            className="w-full py-3 rounded-xl bg-orange-500 text-white font-bold active:scale-[0.99] transition"
          >
            🔁 Réviser maintenant ({dueItems.length})
          </button>

          <div className="flex flex-col gap-3">
            {Object.entries(grouped).map(([kind, items]) => (
              <div key={kind}>
                <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">
                  {KIND_LABELS[kind] ?? kind} ({items.length})
                </h2>
                <div className="flex flex-col gap-1">
                  {items.map((item) => {
                    const { label, sub } = labelForItem(item);
                    return (
                      <div key={item.itemId} className="rounded-lg bg-gray-50 dark:bg-gray-800 px-3 py-2 flex justify-between text-sm">
                        <span className="font-medium">{label}</span>
                        <span className="text-gray-400">{sub}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
