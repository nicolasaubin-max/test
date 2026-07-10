import type { Letter } from '../types';

// Les 33 lettres de l'alphabet cyrillique russe
export const ALPHABET: Letter[] = [
  {
    id: 'a', upper: 'А', lower: 'а', name: 'a', sound: '« a »',
    anchor: 'comme dans amie', hasFrenchEquivalent: true,
    exampleWord: { ru: 'мама', translit: 'mama', fr: 'maman' },
  },
  {
    id: 'b', upper: 'Б', lower: 'б', name: 'be', sound: '« b »',
    anchor: 'comme dans bébé', hasFrenchEquivalent: true,
    exampleWord: { ru: 'брат', translit: 'brat', fr: 'frère' },
  },
  {
    id: 'v', upper: 'В', lower: 'в', name: 've', sound: '« v »',
    anchor: 'comme dans vélo', hasFrenchEquivalent: true,
    falseFriend: 'ressemble à un B latin, mais se prononce V',
    exampleWord: { ru: 'вода', translit: 'voda', fr: 'eau' },
  },
  {
    id: 'g', upper: 'Г', lower: 'г', name: 'ghe', sound: '« g » dur',
    anchor: 'comme dans gare', hasFrenchEquivalent: true,
    exampleWord: { ru: 'город', translit: 'gorod', fr: 'ville' },
  },
  {
    id: 'd', upper: 'Д', lower: 'д', name: 'de', sound: '« d »',
    anchor: 'comme dans danse', hasFrenchEquivalent: true,
    exampleWord: { ru: 'дом', translit: 'dom', fr: 'maison' },
  },
  {
    id: 'e', upper: 'Е', lower: 'е', name: 'ie', sound: '« yé »',
    anchor: 'comme le « ié » dans Iéna', hasFrenchEquivalent: true,
    exampleWord: { ru: 'еда', translit: 'yeda', fr: 'nourriture' },
  },
  {
    id: 'yo', upper: 'Ё', lower: 'ё', name: 'io', sound: '« yo »',
    anchor: 'comme dans yogourt', hasFrenchEquivalent: true,
    exampleWord: { ru: 'ёж', translit: 'yozh', fr: 'hérisson' },
  },
  {
    id: 'zh', upper: 'Ж', lower: 'ж', name: 'je', sound: '« j » dur',
    anchor: 'proche de jour, mais plus grave (pas d\'équivalent exact en français)',
    hasFrenchEquivalent: false,
    exampleWord: { ru: 'жизнь', translit: 'jizn\'', fr: 'vie' },
  },
  {
    id: 'z', upper: 'З', lower: 'з', name: 'ze', sound: '« z »',
    anchor: 'comme dans zèbre', hasFrenchEquivalent: true,
    falseFriend: 'ressemble visuellement au chiffre 3',
    exampleWord: { ru: 'зима', translit: 'zima', fr: 'hiver' },
  },
  {
    id: 'i', upper: 'И', lower: 'и', name: 'i', sound: '« i »',
    anchor: 'comme dans idée', hasFrenchEquivalent: true,
    falseFriend: 'ressemble à un N latin inversé',
    exampleWord: { ru: 'игра', translit: 'igra', fr: 'jeu' },
  },
  {
    id: 'i-court', upper: 'Й', lower: 'й', name: 'i kratkoïe', sound: '« i » bref',
    anchor: 'comme le "y" dans yaourt (semi-voyelle rapide)', hasFrenchEquivalent: true,
    exampleWord: { ru: 'йогурт', translit: 'yogurt', fr: 'yaourt' },
  },
  {
    id: 'k', upper: 'К', lower: 'к', name: 'ka', sound: '« k »',
    anchor: 'comme dans café', hasFrenchEquivalent: true,
    exampleWord: { ru: 'кот', translit: 'kot', fr: 'chat' },
  },
  {
    id: 'l', upper: 'Л', lower: 'л', name: 'el', sound: '« l »',
    anchor: 'comme dans lune', hasFrenchEquivalent: true,
    exampleWord: { ru: 'лето', translit: 'leto', fr: 'été' },
  },
  {
    id: 'm', upper: 'М', lower: 'м', name: 'em', sound: '« m »',
    anchor: 'comme dans maman', hasFrenchEquivalent: true,
    exampleWord: { ru: 'молоко', translit: 'moloko', fr: 'lait' },
  },
  {
    id: 'n', upper: 'Н', lower: 'н', name: 'en', sound: '« n »',
    anchor: 'comme dans nature', hasFrenchEquivalent: true,
    falseFriend: 'ressemble à un H latin, mais se prononce N',
    exampleWord: { ru: 'небо', translit: 'nebo', fr: 'ciel' },
  },
  {
    id: 'o', upper: 'О', lower: 'о', name: 'o', sound: '« o »',
    anchor: 'comme dans hôtel', hasFrenchEquivalent: true,
    exampleWord: { ru: 'окно', translit: 'okno', fr: 'fenêtre' },
  },
  {
    id: 'p', upper: 'П', lower: 'п', name: 'pe', sound: '« p »',
    anchor: 'comme dans papa', hasFrenchEquivalent: true,
    falseFriend: 'ressemble à un pi grec (π) ou un pont',
    exampleWord: { ru: 'папа', translit: 'papa', fr: 'papa' },
  },
  {
    id: 'r', upper: 'Р', lower: 'р', name: 'er', sound: '« r » roulé',
    anchor: 'roulé, comme en espagnol', hasFrenchEquivalent: false,
    falseFriend: 'ressemble à un P latin, mais se prononce R',
    exampleWord: { ru: 'рыба', translit: 'ryba', fr: 'poisson' },
  },
  {
    id: 's', upper: 'С', lower: 'с', name: 'es', sound: '« s »',
    anchor: 'comme dans soleil', hasFrenchEquivalent: true,
    falseFriend: 'ressemble à un C latin, mais se prononce S',
    exampleWord: { ru: 'солнце', translit: 'solntse', fr: 'soleil' },
  },
  {
    id: 't', upper: 'Т', lower: 'т', name: 'te', sound: '« t »',
    anchor: 'comme dans table', hasFrenchEquivalent: true,
    exampleWord: { ru: 'телефон', translit: 'telefon', fr: 'téléphone' },
  },
  {
    id: 'u', upper: 'У', lower: 'у', name: 'ou', sound: '« ou »',
    anchor: 'comme le "ou" dans coucou', hasFrenchEquivalent: true,
    falseFriend: 'ressemble à un U ou un V latin, mais se prononce "ou"',
    exampleWord: { ru: 'утро', translit: 'utro', fr: 'matin' },
  },
  {
    id: 'f', upper: 'Ф', lower: 'ф', name: 'ef', sound: '« f »',
    anchor: 'comme dans film', hasFrenchEquivalent: true,
    exampleWord: { ru: 'фото', translit: 'foto', fr: 'photo' },
  },
  {
    id: 'kh', upper: 'Х', lower: 'х', name: 'kha', sound: '« kh »',
    anchor: 'son guttural, comme la jota espagnole (aucun équivalent français)',
    hasFrenchEquivalent: false,
    falseFriend: 'ressemble à un X latin, mais se prononce "kh"',
    exampleWord: { ru: 'хлеб', translit: 'khleb', fr: 'pain' },
  },
  {
    id: 'ts', upper: 'Ц', lower: 'ц', name: 'tse', sound: '« ts »',
    anchor: 'comme dans pizza', hasFrenchEquivalent: true,
    exampleWord: { ru: 'цветок', translit: 'tsvetok', fr: 'fleur' },
  },
  {
    id: 'ch', upper: 'Ч', lower: 'ч', name: 'tche', sound: '« tch »',
    anchor: 'comme dans tchao', hasFrenchEquivalent: true,
    exampleWord: { ru: 'час', translit: 'chas', fr: 'heure' },
  },
  {
    id: 'sh', upper: 'Ш', lower: 'ш', name: 'cha', sound: '« ch » dur',
    anchor: 'comme "ch" dans chat, en plus dur', hasFrenchEquivalent: true,
    exampleWord: { ru: 'школа', translit: 'shkola', fr: 'école' },
  },
  {
    id: 'shch', upper: 'Щ', lower: 'щ', name: 'chtcha', sound: '« chtch »',
    anchor: 'un "ch" long et doux, sans équivalent exact en français',
    hasFrenchEquivalent: false,
    exampleWord: { ru: 'щенок', translit: 'shchenok', fr: 'chiot' },
  },
  {
    id: 'hard-sign', upper: 'Ъ', lower: 'ъ', name: 'signe dur', sound: '(aucun son)',
    anchor: 'ne se prononce pas : sépare une consonne et une voyelle qui suit',
    hasFrenchEquivalent: false,
    exampleWord: { ru: 'подъезд', translit: 'pod\"yezd', fr: 'entrée d\'immeuble' },
  },
  {
    id: 'y', upper: 'Ы', lower: 'ы', name: 'y', sound: '« y »',
    anchor: 'son entre "i" et "ou", sans équivalent en français', hasFrenchEquivalent: false,
    exampleWord: { ru: 'ты', translit: 'ty', fr: 'tu' },
  },
  {
    id: 'soft-sign', upper: 'Ь', lower: 'ь', name: 'signe mou', sound: '(aucun son)',
    anchor: 'ne se prononce pas : adoucit la consonne qui précède',
    hasFrenchEquivalent: false,
    exampleWord: { ru: 'мать', translit: 'mat\'', fr: 'mère' },
  },
  {
    id: 'e-ouvert', upper: 'Э', lower: 'э', name: 'e', sound: '« è »',
    anchor: 'comme dans ère', hasFrenchEquivalent: true,
    exampleWord: { ru: 'этаж', translit: 'etazh', fr: 'étage' },
  },
  {
    id: 'yu', upper: 'Ю', lower: 'ю', name: 'iou', sound: '« you »',
    anchor: 'comme dans youpi', hasFrenchEquivalent: true,
    exampleWord: { ru: 'юг', translit: 'yug', fr: 'sud' },
  },
  {
    id: 'ya', upper: 'Я', lower: 'я', name: 'ia', sound: '« ya »',
    anchor: 'comme dans yaourt', hasFrenchEquivalent: true,
    exampleWord: { ru: 'я', translit: 'ya', fr: 'je' },
  },
];

// Faux amis visuels à mettre en évidence particulièrement
export const FALSE_FRIENDS = ALPHABET.filter((l) => l.falseFriend);
