export interface LevelDef {
  level: 1 | 2 | 3;
  title: string;
  subtitle: string;
  color: string; // couleur d'accent du niveau
  modules: { id: string; title: string; icon: string }[];
}

export const LEVELS: LevelDef[] = [
  {
    level: 1,
    title: 'Débutant',
    subtitle: 'Alphabet + premiers mots',
    color: '#22c55e',
    modules: [
      { id: 'alphabet', title: 'Alphabet cyrillique', icon: '🔤' },
      { id: 'vocabulary', title: 'Vocabulaire de base', icon: '📚' },
      { id: 'phrases', title: 'Premières phrases', icon: '💬' },
    ],
  },
  {
    level: 2,
    title: 'Élémentaire',
    subtitle: 'Vocabulaire thématique + phrases simples',
    color: '#3b82f6',
    modules: [
      { id: 'vocabulary', title: 'Vocabulaire thématique', icon: '📚' },
      { id: 'phrases', title: 'Phrases & conjugaison', icon: '💬' },
      { id: 'puzzle', title: 'Puzzle de phrases', icon: '🧩' },
      { id: 'dialogues', title: 'Mini-dialogues', icon: '🗣️' },
    ],
  },
  {
    level: 3,
    title: 'Intermédiaire',
    subtitle: 'Conjugaison + puzzles + phrases complexes',
    color: '#a855f7',
    modules: [
      { id: 'vocabulary', title: 'Vocabulaire avancé', icon: '📚' },
      { id: 'phrases', title: 'Phrases complexes', icon: '💬' },
      { id: 'puzzle', title: 'Puzzle de phrases', icon: '🧩' },
      { id: 'dialogues', title: 'Dialogues de la vie réelle', icon: '🗣️' },
      { id: 'grammar', title: 'Les cas russes', icon: '🎨' },
    ],
  },
];

export function levelColor(level: 1 | 2 | 3): string {
  return LEVELS.find((l) => l.level === level)?.color ?? '#3b82f6';
}
