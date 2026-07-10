// Types partagés de l'application

export type CaseName = 'nominatif' | 'accusatif' | 'genitif' | 'datif' | 'instrumental' | 'prepositionnel';

export interface Letter {
  id: string;
  upper: string;
  lower: string;
  name: string; // nom de la lettre en russe (translittéré)
  sound: string; // son / translittération
  anchor: string; // ancrage mnémotechnique FR, ou description si pas d'équivalent
  hasFrenchEquivalent: boolean;
  falseFriend?: string; // ex. "ressemble au B latin mais se prononce V"
  exampleWord: {
    ru: string;
    translit: string;
    fr: string;
  };
}

export interface VocabWord {
  id: string;
  theme: string;
  ru: string;
  translit: string;
  fr: string;
  level: 1 | 2 | 3;
}

export interface Conjugation {
  pronoun: string; // я, ты, он/она...
  form: string;
  translit: string;
}

export interface Verb {
  id: string;
  infinitive: string;
  infinitiveTranslit: string;
  fr: string;
  present: Conjugation[];
}

export interface Phrase {
  id: string;
  ru: string;
  translit: string;
  fr: string;
  level: 1 | 2 | 3;
  words: string[]; // découpage mot-à-mot russe pour puzzle
  grammarNote?: string;
}

export interface SentencePuzzle {
  id: string;
  fr: string;
  translit: string;
  ru: string;
  correctTiles: string[]; // tuiles russes dans l'ordre correct
  distractorTiles?: string[]; // tuiles pièges
  level: 1 | 2 | 3;
  altOrders?: string[][]; // ordres alternatifs valides (niveaux avancés)
}

export interface DialogueLine {
  speaker: string;
  ru: string;
  translit: string;
  fr: string;
  blank?: boolean; // si true, l'utilisateur doit compléter cette ligne
}

export interface Dialogue {
  id: string;
  scenario: string;
  title: string;
  level: 1 | 2 | 3;
  lines: DialogueLine[];
}

export interface GrammarNote {
  id: string;
  title: string;
  body: string;
  caseName?: CaseName;
  colorHint?: string;
}

export type ItemKind = 'letter' | 'word' | 'phrase' | 'puzzle' | 'personal';

// Etat de progression / SRS pour un item donné
export interface SrsItemState {
  itemId: string;
  kind: ItemKind;
  repetitions: number; // nombre de succès consécutifs (SM-2)
  interval: number; // en jours
  easeFactor: number;
  dueDate: string; // ISO date
  correctCount: number; // total bonnes réponses (pour "Mémorisé" à 10)
  wrongCount: number;
  mastered: boolean;
  lastReviewed?: string;
}

export type ExerciseKind =
  | 'mcq-letter-sound'
  | 'mcq-sound-letter'
  | 'mcq-vocab'
  | 'typing-vocab'
  | 'typing-phrase'
  | 'puzzle'
  | 'dictation'
  | 'listen-repeat'
  | 'dialogue-fill';

export interface PersonalWord {
  id: string;
  ru: string;
  translit: string;
  fr: string;
  createdAt: string;
}

// --- Données prêtes à consommer par les composants d'exercice ---

export interface McqOption {
  id: string;
  label: string;
  audioText?: string;
}

export interface McqExerciseData {
  itemId: string;
  kind: ItemKind;
  type: 'mcq';
  instruction: string;
  promptText?: string; // texte affiché (ex. la lettre, le mot russe)
  promptAudioOnly?: boolean; // si true, l'utilisateur doit écouter avant de voir les options
  audioText?: string; // texte à prononcer pour le bouton audio du prompt
  options: McqOption[];
  correctOptionId: string;
  afterCorrectAudio?: string;
  afterCorrectTranslit?: string;
}

export interface TypingExerciseData {
  itemId: string;
  kind: ItemKind;
  type: 'typing';
  instruction: string;
  promptText?: string; // texte français à traduire (absent si dictée pure)
  isDictation?: boolean;
  dictationAudioText?: string;
  expectedRu: string;
  acceptableAnswers?: string[];
  translit: string;
  fr: string;
}

export interface PuzzleExerciseData {
  itemId: string;
  kind: ItemKind;
  type: 'puzzle';
  puzzle: SentencePuzzle;
}

export interface ListenRepeatExerciseData {
  itemId: string;
  kind: ItemKind;
  type: 'listen-repeat';
  targetRu: string;
  targetFr: string;
  translit: string;
}

export type LessonExerciseData =
  | McqExerciseData
  | TypingExerciseData
  | PuzzleExerciseData
  | ListenRepeatExerciseData;
