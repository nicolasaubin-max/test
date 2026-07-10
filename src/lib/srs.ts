import type { SrsItemState, ItemKind } from '../types';

const MASTERY_THRESHOLD = 10;

export function createSrsState(itemId: string, kind: ItemKind): SrsItemState {
  return {
    itemId,
    kind,
    repetitions: 0,
    interval: 0,
    easeFactor: 2.5,
    dueDate: new Date().toISOString(),
    correctCount: 0,
    wrongCount: 0,
    mastered: false,
  };
}

/**
 * Variante allégée de SM-2. `quality` va de 0 (échec total) à 5 (parfait).
 * On simplifie en pratique à deux valeurs : 2 (faux) et 4 (correct) ou 5 (correct rapide).
 */
export function reviewItem(state: SrsItemState, quality: 0 | 1 | 2 | 3 | 4 | 5): SrsItemState {
  const now = new Date();
  let { repetitions, interval, easeFactor } = state;

  if (quality < 3) {
    // échec : on relance la révision de très près, on ne casse pas l'ease factor trop fort
    repetitions = 0;
    interval = 0; // dû à nouveau presque immédiatement (dans la même session / dans quelques minutes)
  } else {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 3;
    else interval = Math.round(interval * easeFactor);
    repetitions += 1;
  }

  easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

  const dueDate = new Date(now);
  if (interval === 0) {
    dueDate.setMinutes(dueDate.getMinutes() + 10);
  } else {
    dueDate.setDate(dueDate.getDate() + interval);
  }

  const correctCount = quality >= 3 ? state.correctCount + 1 : state.correctCount;
  const wrongCount = quality < 3 ? state.wrongCount + 1 : state.wrongCount;
  const mastered = correctCount >= MASTERY_THRESHOLD;

  return {
    ...state,
    repetitions,
    interval,
    easeFactor,
    dueDate: dueDate.toISOString(),
    correctCount,
    wrongCount,
    mastered,
    lastReviewed: now.toISOString(),
  };
}

export function isDue(state: SrsItemState): boolean {
  return new Date(state.dueDate).getTime() <= Date.now();
}

export { MASTERY_THRESHOLD };
