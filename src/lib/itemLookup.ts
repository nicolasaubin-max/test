import { ALPHABET } from '../data/alphabet';
import { VOCABULARY } from '../data/vocabulary';
import { PHRASES } from '../data/phrases';
import { PUZZLES } from '../data/puzzles';
import type { LessonExerciseData, SrsItemState } from '../types';
import { buildLetterExercise, buildVocabExercise, buildPhraseExercise, buildPuzzleExercise, buildPersonalWordExercise } from './exerciseBuilders';
import { useProgressStore } from './store';

// Résout un itemId de la forme "letter-a" / "word-w3" / "phrase-p2" / "puzzle-pz1" / "personal-pw-..."
// vers un exercice concret (toujours en mode "déjà vu" -> production privilégiée pour la révision).
export function resolveSrsItemToExercise(state: SrsItemState): LessonExerciseData | null {
  const [prefix] = splitItemId(state.itemId);

  if (prefix === 'letter') {
    const rawId = state.itemId.replace('letter-', '');
    const letter = ALPHABET.find((l) => l.id === rawId);
    if (!letter) return null;
    return buildLetterExercise(letter, ALPHABET, true);
  }
  if (prefix === 'word') {
    const rawId = state.itemId.replace('word-', '');
    const word = VOCABULARY.find((w) => w.id === rawId);
    if (!word) return null;
    return buildVocabExercise(word, VOCABULARY, true);
  }
  if (prefix === 'phrase') {
    const rawId = state.itemId.replace('phrase-', '');
    const phrase = PHRASES.find((p) => p.id === rawId);
    if (!phrase) return null;
    return buildPhraseExercise(phrase, true);
  }
  if (prefix === 'puzzle') {
    const rawId = state.itemId.replace('puzzle-', '');
    const puzzle = PUZZLES.find((p) => p.id === rawId);
    if (!puzzle) return null;
    return buildPuzzleExercise(puzzle);
  }
  if (prefix === 'personal') {
    const rawId = state.itemId.replace('personal-', '');
    const personalWords = useProgressStore.getState().personalWords;
    const word = personalWords.find((w) => w.id === rawId);
    if (!word) return null;
    return buildPersonalWordExercise(word, true);
  }
  return null;
}

function splitItemId(itemId: string): [string, string] {
  const idx = itemId.indexOf('-');
  return [itemId.slice(0, idx), itemId.slice(idx + 1)];
}

export function labelForItem(state: SrsItemState): { label: string; sub: string } {
  const rawId = state.itemId.slice(state.itemId.indexOf('-') + 1);
  if (state.kind === 'letter') {
    const letter = ALPHABET.find((l) => l.id === rawId);
    return { label: letter ? `${letter.upper} ${letter.lower}` : '?', sub: letter?.exampleWord.fr ?? '' };
  }
  if (state.kind === 'word') {
    const word = VOCABULARY.find((w) => w.id === rawId);
    return { label: word?.ru ?? '?', sub: word?.fr ?? '' };
  }
  if (state.kind === 'phrase') {
    const phrase = PHRASES.find((p) => p.id === rawId);
    return { label: phrase?.ru ?? '?', sub: phrase?.fr ?? '' };
  }
  if (state.kind === 'puzzle') {
    const puzzle = PUZZLES.find((p) => p.id === rawId);
    return { label: puzzle?.ru ?? '?', sub: puzzle?.fr ?? '' };
  }
  if (state.kind === 'personal') {
    const word = useProgressStore.getState().personalWords.find((w) => w.id === rawId);
    return { label: word?.ru ?? '?', sub: word?.fr ?? '' };
  }
  return { label: '?', sub: '' };
}
