import type { GrammarNote } from '../types';

// Micro-leçons de grammaire "juste à temps"
export const GRAMMAR_NOTES: GrammarNote[] = [
  {
    id: 'no-verb-etre',
    title: 'Pas de verbe « être » au présent',
    body: 'En russe, on omet le verbe « être » au présent : « Я студент » = « (Je) étudiant ». Le verbe réapparaît au passé et au futur.',
  },
  {
    id: 'negation',
    title: 'La négation avec « не »',
    body: 'Pour dire « ne...pas », on place simplement « не » juste avant le verbe : « Я не знаю » = « Je ne sais pas ».',
  },
  {
    id: 'nominatif',
    title: 'Le cas nominatif — le sujet',
    body: 'Le nominatif est la forme "de base" d\'un nom, utilisée pour le sujet de la phrase (celui qui fait l\'action). C\'est la forme qu\'on trouve dans le dictionnaire.',
    caseName: 'nominatif',
    colorHint: '#22c55e',
  },
  {
    id: 'accusatif',
    title: 'Le cas accusatif — le complément d\'objet direct',
    body: 'L\'accusatif marque le complément d\'objet direct (ce qui subit l\'action). Pour un nom féminin en -а, la terminaison devient -у : « книга » (le livre, sujet) → « книгу » (je lis LE livre). Pour un nom masculin inanimé, la forme ne change généralement pas.',
    caseName: 'accusatif',
    colorHint: '#f97316',
  },
  {
    id: 'avoir',
    title: '« Avoir » en russe',
    body: 'Le russe n\'a pas de verbe « avoir » direct pour la possession : on utilise « у меня есть » (littéralement « chez moi il y a »). « У меня есть брат » = « J\'ai un frère ».',
  },
  {
    id: 'besoin',
    title: '« Avoir besoin de »',
    body: '« Мне нужен / нужна / нужно » exprime le besoin, et s\'accorde en genre avec l\'objet du besoin : нужен (masculin), нужна (féminin), нужно (neutre).',
  },
  {
    id: 'direction',
    title: 'Direction avec « в + accusatif »',
    body: 'La préposition « в » suivie de l\'accusatif exprime un mouvement vers un lieu : « идти в ресторан » = « aller au restaurant ».',
    caseName: 'accusatif',
    colorHint: '#f97316',
  },
];
