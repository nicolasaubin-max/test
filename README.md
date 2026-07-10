# Privet — Apprendre le russe

Application mobile-first pour apprendre le russe à partir de zéro (interface en français), construite avec React, TypeScript, Vite, Tailwind CSS et Zustand.

## Fonctionnalités

- **Alphabet cyrillique** : les 33 lettres avec ancrages mnémotechniques, faux amis visuels, mots-exemples et audio.
- **Vocabulaire** : 60+ mots classés par thème (salutations, chiffres, jours, famille, nourriture, voyage, urgences), flashcards et quiz.
- **Phrases & conjugaison** : pronoms, verbes essentiels au présent, 18 phrases avec micro-leçons de grammaire.
- **Puzzle de construction de phrases** : tuiles à replacer dans l'ordre, avec distracteurs et ordres alternatifs.
- **Mini-dialogues** : scénarios réels (café, taxi, hôtel, épicerie, chantier, urgence) à compléter.
- **Les cas russes** : introduction visuelle et progressive au nominatif/accusatif avec code couleur.
- **Répétition espacée (SM-2 allégé)** : chaque item revient au bon moment ; à partir de 10 bonnes réponses il passe en « Mémorisé ».
- **XP, cœurs, streak, objectif quotidien** : moteur de motivation façon Duolingo.
- **Clavier cyrillique intégré** pour les exercices de production (traduction inverse, dictée).
- **Audio** (text-to-speech) et reconnaissance vocale (répétition orale) via les API du navigateur.
- **Mots personnels** : ajoute ton propre vocabulaire à la révision espacée.
- **Test de placement** optionnel pour débloquer directement le bon niveau.

## Développement

```bash
npm install
npm run dev      # serveur de développement
npm run build    # build de production (tsc + vite build)
```

La progression est sauvegardée en local (localStorage) : XP, cœurs, streak, dates de révision, statut « Mémorisé », objectif quotidien, mots personnels.
