import type { VocabWord } from '../types';

let n = 0;
const id = () => `w${++n}`;

export const VOCABULARY: VocabWord[] = [
  // --- Salutations (niveau 1) ---
  { id: id(), theme: 'Salutations', ru: 'привет', translit: 'privet', fr: 'salut', level: 1 },
  { id: id(), theme: 'Salutations', ru: 'здравствуйте', translit: 'zdravstvuyte', fr: 'bonjour (formel)', level: 1 },
  { id: id(), theme: 'Salutations', ru: 'пока', translit: 'poka', fr: 'au revoir (familier)', level: 1 },
  { id: id(), theme: 'Salutations', ru: 'до свидания', translit: 'do svidaniya', fr: 'au revoir (formel)', level: 1 },
  { id: id(), theme: 'Salutations', ru: 'спасибо', translit: 'spasibo', fr: 'merci', level: 1 },
  { id: id(), theme: 'Salutations', ru: 'пожалуйста', translit: 'pozhaluysta', fr: 's\'il vous plaît / de rien', level: 1 },
  { id: id(), theme: 'Salutations', ru: 'да', translit: 'da', fr: 'oui', level: 1 },
  { id: id(), theme: 'Salutations', ru: 'нет', translit: 'net', fr: 'non', level: 1 },
  { id: id(), theme: 'Salutations', ru: 'извините', translit: 'izvinite', fr: 'excusez-moi', level: 1 },
  { id: id(), theme: 'Salutations', ru: 'как дела?', translit: 'kak dela?', fr: 'comment ça va ?', level: 2 },

  // --- Chiffres (niveau 1) ---
  { id: id(), theme: 'Chiffres', ru: 'один', translit: 'odin', fr: 'un', level: 1 },
  { id: id(), theme: 'Chiffres', ru: 'два', translit: 'dva', fr: 'deux', level: 1 },
  { id: id(), theme: 'Chiffres', ru: 'три', translit: 'tri', fr: 'trois', level: 1 },
  { id: id(), theme: 'Chiffres', ru: 'четыре', translit: 'chetyre', fr: 'quatre', level: 1 },
  { id: id(), theme: 'Chiffres', ru: 'пять', translit: 'pyat\'', fr: 'cinq', level: 1 },
  { id: id(), theme: 'Chiffres', ru: 'шесть', translit: 'shest\'', fr: 'six', level: 1 },
  { id: id(), theme: 'Chiffres', ru: 'семь', translit: 'sem\'', fr: 'sept', level: 1 },
  { id: id(), theme: 'Chiffres', ru: 'восемь', translit: 'vosem\'', fr: 'huit', level: 1 },
  { id: id(), theme: 'Chiffres', ru: 'девять', translit: 'devyat\'', fr: 'neuf', level: 1 },
  { id: id(), theme: 'Chiffres', ru: 'десять', translit: 'desyat\'', fr: 'dix', level: 1 },

  // --- Jours (niveau 2) ---
  { id: id(), theme: 'Jours', ru: 'понедельник', translit: 'ponedel\'nik', fr: 'lundi', level: 2 },
  { id: id(), theme: 'Jours', ru: 'вторник', translit: 'vtornik', fr: 'mardi', level: 2 },
  { id: id(), theme: 'Jours', ru: 'среда', translit: 'sreda', fr: 'mercredi', level: 2 },
  { id: id(), theme: 'Jours', ru: 'четверг', translit: 'chetverg', fr: 'jeudi', level: 2 },
  { id: id(), theme: 'Jours', ru: 'пятница', translit: 'pyatnitsa', fr: 'vendredi', level: 2 },
  { id: id(), theme: 'Jours', ru: 'суббота', translit: 'subbota', fr: 'samedi', level: 2 },
  { id: id(), theme: 'Jours', ru: 'воскресенье', translit: 'voskresen\'ye', fr: 'dimanche', level: 2 },
  { id: id(), theme: 'Jours', ru: 'сегодня', translit: 'segodnya', fr: 'aujourd\'hui', level: 2 },
  { id: id(), theme: 'Jours', ru: 'завтра', translit: 'zavtra', fr: 'demain', level: 2 },

  // --- Famille (niveau 1-2) ---
  { id: id(), theme: 'Famille', ru: 'мама', translit: 'mama', fr: 'maman', level: 1 },
  { id: id(), theme: 'Famille', ru: 'папа', translit: 'papa', fr: 'papa', level: 1 },
  { id: id(), theme: 'Famille', ru: 'брат', translit: 'brat', fr: 'frère', level: 1 },
  { id: id(), theme: 'Famille', ru: 'сестра', translit: 'sestra', fr: 'sœur', level: 1 },
  { id: id(), theme: 'Famille', ru: 'сын', translit: 'syn', fr: 'fils', level: 2 },
  { id: id(), theme: 'Famille', ru: 'дочь', translit: 'doch\'', fr: 'fille', level: 2 },
  { id: id(), theme: 'Famille', ru: 'бабушка', translit: 'babushka', fr: 'grand-mère', level: 2 },
  { id: id(), theme: 'Famille', ru: 'дедушка', translit: 'dedushka', fr: 'grand-père', level: 2 },
  { id: id(), theme: 'Famille', ru: 'семья', translit: 'sem\'ya', fr: 'famille', level: 2 },

  // --- Nourriture (niveau 2) ---
  { id: id(), theme: 'Nourriture', ru: 'хлеб', translit: 'khleb', fr: 'pain', level: 2 },
  { id: id(), theme: 'Nourriture', ru: 'вода', translit: 'voda', fr: 'eau', level: 1 },
  { id: id(), theme: 'Nourriture', ru: 'молоко', translit: 'moloko', fr: 'lait', level: 2 },
  { id: id(), theme: 'Nourriture', ru: 'чай', translit: 'chay', fr: 'thé', level: 2 },
  { id: id(), theme: 'Nourriture', ru: 'кофе', translit: 'kofe', fr: 'café', level: 2 },
  { id: id(), theme: 'Nourriture', ru: 'суп', translit: 'sup', fr: 'soupe', level: 2 },
  { id: id(), theme: 'Nourriture', ru: 'рыба', translit: 'ryba', fr: 'poisson', level: 2 },
  { id: id(), theme: 'Nourriture', ru: 'яблоко', translit: 'yabloko', fr: 'pomme', level: 2 },
  { id: id(), theme: 'Nourriture', ru: 'ресторан', translit: 'restoran', fr: 'restaurant', level: 2 },

  // --- Voyage (niveau 2-3) ---
  { id: id(), theme: 'Voyage', ru: 'вокзал', translit: 'vokzal', fr: 'gare', level: 2 },
  { id: id(), theme: 'Voyage', ru: 'аэропорт', translit: 'aeroport', fr: 'aéroport', level: 2 },
  { id: id(), theme: 'Voyage', ru: 'билет', translit: 'bilet', fr: 'billet', level: 2 },
  { id: id(), theme: 'Voyage', ru: 'гостиница', translit: 'gostinitsa', fr: 'hôtel', level: 2 },
  { id: id(), theme: 'Voyage', ru: 'такси', translit: 'taksi', fr: 'taxi', level: 2 },
  { id: id(), theme: 'Voyage', ru: 'улица', translit: 'ulitsa', fr: 'rue', level: 3 },
  { id: id(), theme: 'Voyage', ru: 'магазин', translit: 'magazin', fr: 'magasin', level: 3 },
  { id: id(), theme: 'Voyage', ru: 'паспорт', translit: 'pasport', fr: 'passeport', level: 3 },

  // --- Urgences (niveau 3) ---
  { id: id(), theme: 'Urgences', ru: 'помощь', translit: 'pomoshch\'', fr: 'aide', level: 3 },
  { id: id(), theme: 'Urgences', ru: 'больница', translit: 'bol\'nitsa', fr: 'hôpital', level: 3 },
  { id: id(), theme: 'Urgences', ru: 'врач', translit: 'vrach', fr: 'médecin', level: 3 },
  { id: id(), theme: 'Urgences', ru: 'полиция', translit: 'politsiya', fr: 'police', level: 3 },
  { id: id(), theme: 'Urgences', ru: 'опасно', translit: 'opasno', fr: 'dangereux', level: 3 },
  { id: id(), theme: 'Urgences', ru: 'больно', translit: 'bol\'no', fr: 'douloureux / ça fait mal', level: 3 },

  // --- Mots complémentaires (niveau 3, variété/thèmes divers) ---
  { id: id(), theme: 'Quotidien', ru: 'работа', translit: 'rabota', fr: 'travail', level: 3 },
  { id: id(), theme: 'Quotidien', ru: 'дом', translit: 'dom', fr: 'maison', level: 1 },
  { id: id(), theme: 'Quotidien', ru: 'друг', translit: 'drug', fr: 'ami', level: 2 },
  { id: id(), theme: 'Quotidien', ru: 'книга', translit: 'kniga', fr: 'livre', level: 3 },
  { id: id(), theme: 'Quotidien', ru: 'время', translit: 'vremya', fr: 'temps', level: 3 },
];

export const THEMES = Array.from(new Set(VOCABULARY.map((w) => w.theme)));

export function vocabByLevel(level: 1 | 2 | 3): VocabWord[] {
  return VOCABULARY.filter((w) => w.level === level);
}

export function vocabByTheme(theme: string): VocabWord[] {
  return VOCABULARY.filter((w) => w.theme === theme);
}
