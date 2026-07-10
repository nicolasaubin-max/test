import type { Phrase } from '../types';

let n = 0;
const id = () => `p${++n}`;

// 18 phrases réparties par niveau, avec conjugaison de base
// et découpage mot-à-mot pour les puzzles
export const PHRASES: Phrase[] = [
  { id: id(), level: 1, ru: 'Я студент.', translit: 'Ya student.', fr: 'Je suis étudiant.',
    words: ['Я', 'студент'],
    grammarNote: 'En russe présent, le verbe « être » ne s\'écrit pas : « я студент » = littéralement « je étudiant ».' },
  { id: id(), level: 1, ru: 'Это мама.', translit: 'Eto mama.', fr: 'C\'est maman.',
    words: ['Это', 'мама'] },
  { id: id(), level: 1, ru: 'Я не знаю.', translit: 'Ya ne znayu.', fr: 'Je ne sais pas.',
    words: ['Я', 'не', 'знаю'],
    grammarNote: 'La négation « не » se place juste avant le verbe.' },
  { id: id(), level: 1, ru: 'Ты говоришь по-русски?', translit: 'Ty govorish\' po-russki?', fr: 'Tu parles russe ?',
    words: ['Ты', 'говоришь', 'по-русски?'] },
  { id: id(), level: 1, ru: 'Я говорю по-французски.', translit: 'Ya govoryu po-frantsuzski.', fr: 'Je parle français.',
    words: ['Я', 'говорю', 'по-французски'] },
  { id: id(), level: 2, ru: 'Я хочу говорить по-русски.', translit: 'Ya khochu govorit\' po-russki.', fr: 'Je veux parler russe.',
    words: ['Я', 'хочу', 'говорить', 'по-русски'] },
  { id: id(), level: 2, ru: 'Она хочет кофе.', translit: 'Ona khochet kofe.', fr: 'Elle veut un café.',
    words: ['Она', 'хочет', 'кофе'],
    grammarNote: 'Au cas accusatif, « кофе » ne change pas (mot invariable emprunté), mais beaucoup de noms changent de terminaison.' },
  { id: id(), level: 2, ru: 'Мы делаем это вместе.', translit: 'My delayem eto vmeste.', fr: 'Nous faisons cela ensemble.',
    words: ['Мы', 'делаем', 'это', 'вместе'] },
  { id: id(), level: 2, ru: 'Вы знаете этот город?', translit: 'Vy znayete etot gorod?', fr: 'Connaissez-vous cette ville ?',
    words: ['Вы', 'знаете', 'этот', 'город?'] },
  { id: id(), level: 2, ru: 'Я иду домой.', translit: 'Ya idu domoy.', fr: 'Je rentre à la maison.',
    words: ['Я', 'иду', 'домой'] },
  { id: id(), level: 2, ru: 'Они говорят по-английски.', translit: 'Oni govoryat po-angliyski.', fr: 'Ils parlent anglais.',
    words: ['Они', 'говорят', 'по-английски'] },
  { id: id(), level: 2, ru: 'У меня есть брат.', translit: 'U menya yest\' brat.', fr: 'J\'ai un frère.',
    words: ['У', 'меня', 'есть', 'брат'],
    grammarNote: '« Avoir » se construit avec « у меня есть » (littéralement « chez moi il y a »).' },
  { id: id(), level: 3, ru: 'Я хочу купить хлеб.', translit: 'Ya khochu kupit\' khleb.', fr: 'Je veux acheter du pain.',
    words: ['Я', 'хочу', 'купить', 'хлеб'],
    grammarNote: '« Хлеб » est au cas accusatif (complément d\'objet direct) : pour un nom inanimé masculin, il ne change pas de forme.' },
  { id: id(), level: 3, ru: 'Он читает книгу.', translit: 'On chitayet knigu.', fr: 'Il lit un livre.',
    words: ['Он', 'читает', 'книгу'],
    grammarNote: '« Книга » (nominatif) devient « книгу » à l\'accusatif : la terminaison -а devient -у.' },
  { id: id(), level: 3, ru: 'Мы идём в ресторан.', translit: 'My idyom v restoran.', fr: 'Nous allons au restaurant.',
    words: ['Мы', 'идём', 'в', 'ресторан'],
    grammarNote: '« в + accusatif » exprime une direction (« vers, dans »).' },
  { id: id(), level: 3, ru: 'Вы хотите билет на поезд?', translit: 'Vy khotite bilet na poyezd?', fr: 'Voulez-vous un billet de train ?',
    words: ['Вы', 'хотите', 'билет', 'на', 'поезд?'] },
  { id: id(), level: 3, ru: 'Мне нужна помощь!', translit: 'Mne nuzhna pomoshch\'!', fr: 'J\'ai besoin d\'aide !',
    words: ['Мне', 'нужна', 'помощь!'],
    grammarNote: '« Мне нужен/нужна/нужно » = « j\'ai besoin de », le mot pour « besoin » s\'accorde en genre avec l\'objet.' },
  { id: id(), level: 3, ru: 'Где ближайшая больница?', translit: 'Gde blizhayshaya bol\'nitsa?', fr: 'Où est l\'hôpital le plus proche ?',
    words: ['Где', 'ближайшая', 'больница?'] },
];

export function phrasesByLevel(level: 1 | 2 | 3): Phrase[] {
  return PHRASES.filter((p) => p.level === level);
}
