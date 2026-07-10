import { useMemo } from 'react';
import { useProgressStore, MASTERY_GOAL } from '../lib/store';
import { labelForItem } from '../lib/itemLookup';

const KIND_LABELS: Record<string, string> = {
  letter: 'Lettres',
  word: 'Mots',
  phrase: 'Phrases',
  puzzle: 'Puzzles',
  personal: 'Mots personnels',
};

export function Mastered() {
  const srsStates = useProgressStore((s) => s.srsStates);
  const masteredItems = useMemo(() => Object.values(srsStates).filter((s) => s.mastered), [srsStates]);

  const grouped = masteredItems.reduce<Record<string, typeof masteredItems>>((acc, item) => {
    (acc[item.kind] ??= []).push(item);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-4 px-4 py-5">
      <div>
        <h1 className="text-xl font-extrabold">Mémorisé ✅</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Après {MASTERY_GOAL} bonnes réponses, un élément est considéré comme acquis.
        </p>
      </div>

      <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950 p-4 text-center">
        <span className="text-3xl font-extrabold text-emerald-600">{masteredItems.length}</span>
        <p className="text-sm text-emerald-700 dark:text-emerald-300">éléments mémorisés</p>
      </div>

      {masteredItems.length === 0 ? (
        <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-6 text-center text-gray-400">
          Continue à t'entraîner : tes premiers mots mémorisés apparaîtront ici.
        </div>
      ) : (
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
      )}
    </div>
  );
}
