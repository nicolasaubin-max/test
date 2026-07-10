import type { Verb } from '../types';

export const PRONOUNS = [
  { ru: 'я', translit: 'ya', fr: 'je' },
  { ru: 'ты', translit: 'ty', fr: 'tu' },
  { ru: 'он / она', translit: 'on / ona', fr: 'il / elle' },
  { ru: 'мы', translit: 'my', fr: 'nous' },
  { ru: 'вы', translit: 'vy', fr: 'vous' },
  { ru: 'они', translit: 'oni', fr: 'ils / elles' },
];

export const VERBS: Verb[] = [
  {
    id: 'byt',
    infinitive: 'быть',
    infinitiveTranslit: 'byt\'',
    fr: 'être',
    present: [
      { pronoun: 'я', form: '(omis)', translit: '—' },
      { pronoun: 'ты', form: '(omis)', translit: '—' },
      { pronoun: 'он / она', form: '(omis)', translit: '—' },
      { pronoun: 'мы', form: '(omis)', translit: '—' },
      { pronoun: 'вы', form: '(omis)', translit: '—' },
      { pronoun: 'они', form: '(omis)', translit: '—' },
    ],
  },
  {
    id: 'znat',
    infinitive: 'знать',
    infinitiveTranslit: 'znat\'',
    fr: 'savoir / connaître',
    present: [
      { pronoun: 'я', form: 'знаю', translit: 'znayu' },
      { pronoun: 'ты', form: 'знаешь', translit: 'znayesh\'' },
      { pronoun: 'он / она', form: 'знает', translit: 'znayet' },
      { pronoun: 'мы', form: 'знаем', translit: 'znayem' },
      { pronoun: 'вы', form: 'знаете', translit: 'znayete' },
      { pronoun: 'они', form: 'знают', translit: 'znayut' },
    ],
  },
  {
    id: 'khotet',
    infinitive: 'хотеть',
    infinitiveTranslit: 'khotet\'',
    fr: 'vouloir',
    present: [
      { pronoun: 'я', form: 'хочу', translit: 'khochu' },
      { pronoun: 'ты', form: 'хочешь', translit: 'khochesh\'' },
      { pronoun: 'он / она', form: 'хочет', translit: 'khochet' },
      { pronoun: 'мы', form: 'хотим', translit: 'khotim' },
      { pronoun: 'вы', form: 'хотите', translit: 'khotite' },
      { pronoun: 'они', form: 'хотят', translit: 'khotyat' },
    ],
  },
  {
    id: 'govorit',
    infinitive: 'говорить',
    infinitiveTranslit: 'govorit\'',
    fr: 'parler',
    present: [
      { pronoun: 'я', form: 'говорю', translit: 'govoryu' },
      { pronoun: 'ты', form: 'говоришь', translit: 'govorish\'' },
      { pronoun: 'он / она', form: 'говорит', translit: 'govorit' },
      { pronoun: 'мы', form: 'говорим', translit: 'govorim' },
      { pronoun: 'вы', form: 'говорите', translit: 'govorite' },
      { pronoun: 'они', form: 'говорят', translit: 'govoryat' },
    ],
  },
  {
    id: 'delat',
    infinitive: 'делать',
    infinitiveTranslit: 'delat\'',
    fr: 'faire',
    present: [
      { pronoun: 'я', form: 'делаю', translit: 'delayu' },
      { pronoun: 'ты', form: 'делаешь', translit: 'delayesh\'' },
      { pronoun: 'он / она', form: 'делает', translit: 'delayet' },
      { pronoun: 'мы', form: 'делаем', translit: 'delayem' },
      { pronoun: 'вы', form: 'делаете', translit: 'delayete' },
      { pronoun: 'они', form: 'делают', translit: 'delayut' },
    ],
  },
  {
    id: 'idti',
    infinitive: 'идти',
    infinitiveTranslit: 'idti',
    fr: 'aller (à pied)',
    present: [
      { pronoun: 'я', form: 'иду', translit: 'idu' },
      { pronoun: 'ты', form: 'идёшь', translit: 'idyosh\'' },
      { pronoun: 'он / она', form: 'идёт', translit: 'idyot' },
      { pronoun: 'мы', form: 'идём', translit: 'idyom' },
      { pronoun: 'вы', form: 'идёте', translit: 'idyote' },
      { pronoun: 'они', form: 'идут', translit: 'idut' },
    ],
  },
];
