import type { Letter, VocabWord, Phrase, SentencePuzzle, LessonExerciseData, PersonalWord } from '../types';

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickDistractors<T>(pool: T[], correct: T, n: number): T[] {
  const others = pool.filter((x) => x !== correct);
  return shuffle(others).slice(0, n);
}

// --- Alphabet ---

export function buildLetterExercise(
  letter: Letter,
  pool: Letter[],
  hasBeenSeen: boolean,
): LessonExerciseData {
  if (!hasBeenSeen) {
    // Introduction : voir la lettre → choisir le son
    const distractors = pickDistractors(pool, letter, 3);
    const options = shuffle([
      { id: letter.id, label: letter.sound },
      ...distractors.map((d) => ({ id: d.id, label: d.sound })),
    ]);
    return {
      itemId: `letter-${letter.id}`,
      kind: 'letter',
      type: 'mcq',
      instruction: 'Quel est le son de cette lettre ?',
      promptText: `${letter.upper} ${letter.lower}`,
      audioText: letter.exampleWord.ru,
      options,
      correctOptionId: letter.id,
      afterCorrectAudio: letter.exampleWord.ru,
      afterCorrectTranslit: `${letter.exampleWord.translit} — ${letter.exampleWord.fr}`,
    };
  }
  // Renforcement : entendre le son → choisir la lettre
  const distractors = pickDistractors(pool, letter, 3);
  const options = shuffle([
    { id: letter.id, label: `${letter.upper} ${letter.lower}` },
    ...distractors.map((d) => ({ id: d.id, label: `${d.upper} ${d.lower}` })),
  ]);
  return {
    itemId: `letter-${letter.id}`,
    kind: 'letter',
    type: 'mcq',
    instruction: 'Écoute et choisis la bonne lettre.',
    promptAudioOnly: true,
    audioText: letter.exampleWord.ru,
    options,
    correctOptionId: letter.id,
    afterCorrectAudio: letter.exampleWord.ru,
    afterCorrectTranslit: `${letter.exampleWord.translit} — ${letter.exampleWord.fr}`,
  };
}

// --- Vocabulaire ---

export function buildVocabExercise(
  word: VocabWord,
  pool: VocabWord[],
  hasBeenSeen: boolean,
): LessonExerciseData {
  if (!hasBeenSeen) {
    const distractors = pickDistractors(pool, word, 3);
    const options = shuffle([
      { id: word.id, label: word.fr },
      ...distractors.map((d) => ({ id: d.id, label: d.fr })),
    ]);
    return {
      itemId: `word-${word.id}`,
      kind: 'word',
      type: 'mcq',
      instruction: 'Que veut dire ce mot ?',
      promptText: word.ru,
      audioText: word.ru,
      options,
      correctOptionId: word.id,
      afterCorrectTranslit: word.translit,
    };
  }
  return {
    itemId: `word-${word.id}`,
    kind: 'word',
    type: 'typing',
    instruction: 'Traduis en russe :',
    promptText: word.fr,
    expectedRu: word.ru,
    translit: word.translit,
    fr: word.fr,
  };
}

export function buildDictationExercise(word: VocabWord): LessonExerciseData {
  return {
    itemId: `word-${word.id}`,
    kind: 'word',
    type: 'typing',
    instruction: 'Écoute et écris ce que tu entends :',
    isDictation: true,
    dictationAudioText: word.ru,
    expectedRu: word.ru,
    translit: word.translit,
    fr: word.fr,
  };
}

// --- Phrases ---

export function buildPhraseExercise(phrase: Phrase, hasBeenSeen: boolean): LessonExerciseData {
  if (!hasBeenSeen) {
    return {
      itemId: `phrase-${phrase.id}`,
      kind: 'phrase',
      type: 'listen-repeat',
      targetRu: phrase.ru,
      targetFr: phrase.fr,
      translit: phrase.translit,
    };
  }
  return {
    itemId: `phrase-${phrase.id}`,
    kind: 'phrase',
    type: 'typing',
    instruction: 'Traduis cette phrase en russe :',
    promptText: phrase.fr,
    expectedRu: phrase.ru,
    translit: phrase.translit,
    fr: phrase.fr,
  };
}

export function buildPuzzleExercise(puzzle: SentencePuzzle): LessonExerciseData {
  return {
    itemId: `puzzle-${puzzle.id}`,
    kind: 'puzzle',
    type: 'puzzle',
    puzzle,
  };
}

export function buildPersonalWordExercise(word: PersonalWord, hasBeenSeen: boolean): LessonExerciseData {
  if (!hasBeenSeen) {
    return {
      itemId: `personal-${word.id}`,
      kind: 'personal',
      type: 'listen-repeat',
      targetRu: word.ru,
      targetFr: word.fr,
      translit: word.translit,
    };
  }
  return {
    itemId: `personal-${word.id}`,
    kind: 'personal',
    type: 'typing',
    instruction: 'Traduis en russe :',
    promptText: word.fr,
    expectedRu: word.ru,
    translit: word.translit,
    fr: word.fr,
  };
}

export function normalizeAnswer(s: string): string {
  return s
    .toLowerCase()
    .replace(/[.,!?;:"'«»]/g, '')
    .replace(/ё/g, 'е')
    .trim()
    .replace(/\s+/g, ' ');
}

export function checkTypingAnswer(input: string, expected: string, acceptable?: string[]): boolean {
  const norm = normalizeAnswer(input);
  const candidates = [expected, ...(acceptable ?? [])].map(normalizeAnswer);
  return candidates.includes(norm);
}
