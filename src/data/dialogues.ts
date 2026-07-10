import type { Dialogue } from '../types';

export const DIALOGUES: Dialogue[] = [
  {
    id: 'cafe', scenario: 'Café', title: 'Commander un café', level: 2,
    lines: [
      { speaker: 'Serveur', ru: 'Здравствуйте! Что вы хотите?', translit: 'Zdravstvuyte! Chto vy khotite?', fr: 'Bonjour ! Que voulez-vous ?' },
      { speaker: 'Vous', ru: 'Я хочу кофе, пожалуйста.', translit: 'Ya khochu kofe, pozhaluysta.', fr: 'Je veux un café, s\'il vous plaît.', blank: true },
      { speaker: 'Serveur', ru: 'С молоком?', translit: 'S molokom?', fr: 'Avec du lait ?' },
      { speaker: 'Vous', ru: 'Да, спасибо.', translit: 'Da, spasibo.', fr: 'Oui, merci.', blank: true },
    ],
  },
  {
    id: 'taxi', scenario: 'Taxi', title: 'Prendre un taxi', level: 2,
    lines: [
      { speaker: 'Vous', ru: 'Здравствуйте! Мне нужно на вокзал.', translit: 'Zdravstvuyte! Mne nuzhno na vokzal.', fr: 'Bonjour ! J\'ai besoin d\'aller à la gare.', blank: true },
      { speaker: 'Chauffeur', ru: 'Хорошо, садитесь.', translit: 'Khorosho, saditess\'.', fr: 'D\'accord, montez.' },
      { speaker: 'Vous', ru: 'Сколько это стоит?', translit: 'Skol\'ko eto stoit?', fr: 'Combien ça coûte ?', blank: true },
      { speaker: 'Chauffeur', ru: 'Триста рублей.', translit: 'Trista rubley.', fr: 'Trois cents roubles.' },
    ],
  },
  {
    id: 'hotel', scenario: 'Hôtel', title: 'Réserver une chambre', level: 2,
    lines: [
      { speaker: 'Réceptionniste', ru: 'Добрый день! Чем могу помочь?', translit: 'Dobryy den\'! Chem mogu pomoch\'?', fr: 'Bonjour ! Comment puis-je vous aider ?' },
      { speaker: 'Vous', ru: 'У вас есть свободная комната?', translit: 'U vas yest\' svobodnaya komnata?', fr: 'Avez-vous une chambre libre ?', blank: true },
      { speaker: 'Réceptionniste', ru: 'Да, на одну ночь?', translit: 'Da, na odnu noch\'?', fr: 'Oui, pour une nuit ?' },
      { speaker: 'Vous', ru: 'Да, спасибо.', translit: 'Da, spasibo.', fr: 'Oui, merci.', blank: true },
    ],
  },
  {
    id: 'epicerie', scenario: 'Épicerie', title: 'Faire les courses', level: 2,
    lines: [
      { speaker: 'Vendeur', ru: 'Здравствуйте! Что вам нужно?', translit: 'Zdravstvuyte! Chto vam nuzhno?', fr: 'Bonjour ! Que vous faut-il ?' },
      { speaker: 'Vous', ru: 'Мне нужен хлеб и молоко.', translit: 'Mne nuzhen khleb i moloko.', fr: 'Il me faut du pain et du lait.', blank: true },
      { speaker: 'Vendeur', ru: 'Что-нибудь ещё?', translit: 'Chto-nibud\' yeshcho?', fr: 'Autre chose ?' },
      { speaker: 'Vous', ru: 'Нет, спасибо. Сколько это стоит?', translit: 'Net, spasibo. Skol\'ko eto stoit?', fr: 'Non merci. Combien ça coûte ?', blank: true },
    ],
  },
  {
    id: 'chantier', scenario: 'Chantier', title: 'Sur le lieu de travail', level: 3,
    lines: [
      { speaker: 'Collègue', ru: 'Привет! Ты уже здесь работаешь?', translit: 'Privet! Ty uzhe zdes\' rabotayesh\'?', fr: 'Salut ! Tu travailles déjà ici ?' },
      { speaker: 'Vous', ru: 'Да, я работаю здесь неделю.', translit: 'Da, ya rabotayu zdes\' nedelyu.', fr: 'Oui, je travaille ici depuis une semaine.', blank: true },
      { speaker: 'Collègue', ru: 'Тебе нужна помощь?', translit: 'Tebe nuzhna pomoshch\'?', fr: 'Tu as besoin d\'aide ?' },
      { speaker: 'Vous', ru: 'Да, спасибо большое.', translit: 'Da, spasibo bol\'shoye.', fr: 'Oui, merci beaucoup.', blank: true },
    ],
  },
  {
    id: 'urgence', scenario: 'Urgence', title: 'Demander de l\'aide', level: 3,
    lines: [
      { speaker: 'Vous', ru: 'Помогите! Мне нужна помощь!', translit: 'Pomogite! Mne nuzhna pomoshch\'!', fr: 'Au secours ! J\'ai besoin d\'aide !', blank: true },
      { speaker: 'Passant', ru: 'Что случилось?', translit: 'Chto sluchilos\'?', fr: 'Qu\'est-ce qui s\'est passé ?' },
      { speaker: 'Vous', ru: 'Где ближайшая больница?', translit: 'Gde blizhayshaya bol\'nitsa?', fr: 'Où est l\'hôpital le plus proche ?', blank: true },
      { speaker: 'Passant', ru: 'Это рядом, я вам покажу.', translit: 'Eto ryadom, ya vam pokazhu.', fr: 'C\'est proche, je vais vous montrer.' },
    ],
  },
];

export function dialoguesByLevel(level: 1 | 2 | 3): Dialogue[] {
  return DIALOGUES.filter((d) => d.level === level);
}
