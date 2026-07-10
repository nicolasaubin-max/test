import type { SentencePuzzle } from '../types';

let n = 0;
const id = () => `pz${++n}`;

// 12 puzzles de construction de phrase (glisser/taper les tuiles dans l'ordre)
// Niveau 1 : une seule structure correcte, pas de distracteurs.
// Niveau 2 : quelques distracteurs.
// Niveau 3 : distracteurs + parfois plusieurs ordres valides (flexibilité du russe).
export const PUZZLES: SentencePuzzle[] = [
  {
    id: id(), level: 1, fr: 'Je suis étudiant.', ru: 'Я студент.', translit: 'Ya student.',
    correctTiles: ['Я', 'студент'],
  },
  {
    id: id(), level: 1, fr: 'C\'est maman.', ru: 'Это мама.', translit: 'Eto mama.',
    correctTiles: ['Это', 'мама'],
  },
  {
    id: id(), level: 1, fr: 'Je ne sais pas.', ru: 'Я не знаю.', translit: 'Ya ne znayu.',
    correctTiles: ['Я', 'не', 'знаю'],
  },
  {
    id: id(), level: 1, fr: 'Tu parles russe ?', ru: 'Ты говоришь по-русски?', translit: 'Ty govorish\' po-russki?',
    correctTiles: ['Ты', 'говоришь', 'по-русски?'],
    distractorTiles: ['я'],
  },
  {
    id: id(), level: 2, fr: 'Je veux parler russe.', ru: 'Я хочу говорить по-русски.', translit: 'Ya khochu govorit\' po-russki.',
    correctTiles: ['Я', 'хочу', 'говорить', 'по-русски'],
    distractorTiles: ['она', 'делать'],
  },
  {
    id: id(), level: 2, fr: 'Elle veut un café.', ru: 'Она хочет кофе.', translit: 'Ona khochet kofe.',
    correctTiles: ['Она', 'хочет', 'кофе'],
    distractorTiles: ['говорит', 'хлеб'],
  },
  {
    id: id(), level: 2, fr: 'Nous faisons cela ensemble.', ru: 'Мы делаем это вместе.', translit: 'My delayem eto vmeste.',
    correctTiles: ['Мы', 'делаем', 'это', 'вместе'],
    distractorTiles: ['они', 'знают'],
  },
  {
    id: id(), level: 2, fr: 'Je rentre à la maison.', ru: 'Я иду домой.', translit: 'Ya idu domoy.',
    correctTiles: ['Я', 'иду', 'домой'],
    distractorTiles: ['вы', 'идёте'],
  },
  {
    id: id(), level: 2, fr: 'J\'ai un frère.', ru: 'У меня есть брат.', translit: 'U menya yest\' brat.',
    correctTiles: ['У', 'меня', 'есть', 'брат'],
    distractorTiles: ['сестра', 'нет'],
  },
  {
    id: id(), level: 3, fr: 'Je veux acheter du pain.', ru: 'Я хочу купить хлеб.', translit: 'Ya khochu kupit\' khleb.',
    correctTiles: ['Я', 'хочу', 'купить', 'хлеб'],
    distractorTiles: ['мы', 'вода', 'знаем'],
  },
  {
    id: id(), level: 3, fr: 'Il lit un livre.', ru: 'Он читает книгу.', translit: 'On chitayet knigu.',
    correctTiles: ['Он', 'читает', 'книгу'],
    distractorTiles: ['она', 'газету'],
  },
  {
    id: id(), level: 3, fr: 'Nous allons au restaurant.', ru: 'Мы идём в ресторан.', translit: 'My idyom v restoran.',
    correctTiles: ['Мы', 'идём', 'в', 'ресторан'],
    distractorTiles: ['на', 'магазин'],
    altOrders: [['В', 'ресторан', 'мы', 'идём']],
  },
  {
    id: id(), level: 3, fr: 'J\'ai besoin d\'aide !', ru: 'Мне нужна помощь!', translit: 'Mne nuzhna pomoshch\'!',
    correctTiles: ['Мне', 'нужна', 'помощь!'],
    distractorTiles: ['нужен', 'тебе'],
  },
];

export function puzzlesByLevel(level: 1 | 2 | 3): SentencePuzzle[] {
  return PUZZLES.filter((p) => p.level === level);
}
