import { useMemo, useState } from 'react';
import type { PuzzleExerciseData } from '../../types';
import { shuffle } from '../../lib/exerciseBuilders';
import { speakRussian } from '../../lib/tts';

interface Tile {
  uid: string;
  text: string;
}

function tilesEqual(a: string[], b: string[]) {
  return a.length === b.length && a.every((t, i) => t === b[i]);
}

export function PuzzleExercise({
  data,
  onResult,
}: {
  data: PuzzleExerciseData;
  onResult: (correct: boolean) => void;
}) {
  const { puzzle } = data;

  const allTiles = useMemo<Tile[]>(() => {
    const tiles = [...puzzle.correctTiles, ...(puzzle.distractorTiles ?? [])].map((text, i) => ({
      uid: `${puzzle.id}-${i}-${text}`,
      text,
    }));
    return shuffle(tiles);
  }, [puzzle]);

  const [bank, setBank] = useState<Tile[]>(allTiles);
  const [placed, setPlaced] = useState<Tile[]>([]);
  const [checked, setChecked] = useState<null | boolean>(null);

  const placeTile = (tile: Tile) => {
    if (checked) return;
    setBank((b) => b.filter((t) => t.uid !== tile.uid));
    setPlaced((p) => [...p, tile]);
  };

  const removeTile = (tile: Tile) => {
    if (checked) return;
    setPlaced((p) => p.filter((t) => t.uid !== tile.uid));
    setBank((b) => [...b, tile]);
  };

  const verify = () => {
    const answer = placed.map((t) => t.text);
    const validOrders = [puzzle.correctTiles, ...(puzzle.altOrders ?? [])];
    const correct = validOrders.some((order) => tilesEqual(answer, order));
    setChecked(correct);
    if (correct) speakRussian(puzzle.ru);
  };

  const retry = () => {
    setBank((b) => [...b, ...placed]);
    setPlaced([]);
    setChecked(null);
  };

  return (
    <div className="flex flex-col gap-5 px-5 py-6">
      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Reconstitue la phrase en russe :</p>
      <p className="text-xl font-bold text-center">{puzzle.fr}</p>

      <div className="min-h-16 flex flex-wrap gap-2 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-3">
        {placed.length === 0 && <span className="text-gray-300 dark:text-gray-600 text-sm">Touche les tuiles ci-dessous…</span>}
        {placed.map((tile, i) => {
          let cls = 'bg-blue-100 dark:bg-blue-950 border-blue-300 dark:border-blue-800';
          if (checked !== null) {
            const isRightSpot = puzzle.correctTiles[i] === tile.text;
            cls = isRightSpot
              ? 'bg-emerald-100 border-emerald-400 dark:bg-emerald-950'
              : 'bg-red-100 border-red-400 dark:bg-red-950';
          }
          return (
            <button
              key={tile.uid}
              type="button"
              onClick={() => removeTile(tile)}
              className={`px-3 py-2 rounded-lg border-2 font-medium text-base ${cls}`}
            >
              {tile.text}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {bank.map((tile) => (
          <button
            key={tile.uid}
            type="button"
            onClick={() => placeTile(tile)}
            className="px-3 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-medium text-base active:scale-95 transition"
          >
            {tile.text}
          </button>
        ))}
      </div>

      {checked === true && (
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 italic">{puzzle.translit}</div>
      )}

      {checked === null ? (
        <button
          type="button"
          disabled={placed.length === 0}
          onClick={verify}
          className="w-full py-3 rounded-xl bg-blue-600 disabled:opacity-40 text-white font-bold active:scale-[0.99] transition"
        >
          Vérifier
        </button>
      ) : checked ? (
        <button
          type="button"
          onClick={() => onResult(true)}
          className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold active:scale-[0.99] transition"
        >
          Continuer
        </button>
      ) : (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={retry}
            className="flex-1 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 font-bold active:scale-[0.99] transition"
          >
            Réessayer
          </button>
          <button
            type="button"
            onClick={() => onResult(false)}
            className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold active:scale-[0.99] transition"
          >
            Passer
          </button>
        </div>
      )}
    </div>
  );
}
