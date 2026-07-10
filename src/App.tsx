import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/ui/Layout';
import { Home } from './pages/Home';
import { Level } from './pages/Level';
import { AlphabetModule } from './pages/AlphabetModule';
import { AlphabetLetter } from './pages/AlphabetLetter';
import { VocabularyModule } from './pages/VocabularyModule';
import { PhrasesModule } from './pages/PhrasesModule';
import { PuzzleModule } from './pages/PuzzleModule';
import { DialoguesModule } from './pages/DialoguesModule';
import { DialogueDetail } from './pages/DialogueDetail';
import { GrammarModule } from './pages/GrammarModule';
import { Lesson } from './pages/Lesson';
import { Review } from './pages/Review';
import { Mastered } from './pages/Mastered';
import { Settings } from './pages/Settings';
import { Placement } from './pages/Placement';
import { useProgressStore } from './lib/store';

// Seuils XP pour le déblocage progressif des niveaux de contenu
const LEVEL_2_XP = 150;
const LEVEL_3_XP = 400;

function App() {
  const xp = useProgressStore((s) => s.xp);
  const unlockLevel = useProgressStore((s) => s.unlockLevel);

  useEffect(() => {
    if (xp >= LEVEL_2_XP) unlockLevel(2);
    if (xp >= LEVEL_3_XP) unlockLevel(3);
  }, [xp, unlockLevel]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/placement" element={<Placement />} />
        <Route path="/level/:level" element={<Level />} />
        <Route path="/level/:level/alphabet" element={<AlphabetModule />} />
        <Route path="/level/:level/alphabet/:letterId" element={<AlphabetLetter />} />
        <Route path="/level/:level/vocabulary" element={<VocabularyModule />} />
        <Route path="/level/:level/phrases" element={<PhrasesModule />} />
        <Route path="/level/:level/puzzle" element={<PuzzleModule />} />
        <Route path="/level/:level/dialogues" element={<DialoguesModule />} />
        <Route path="/level/:level/dialogues/:dialogueId" element={<DialogueDetail />} />
        <Route path="/level/:level/grammar" element={<GrammarModule />} />
        <Route path="/lesson" element={<Lesson />} />
        <Route path="/review" element={<Review />} />
        <Route path="/mastered" element={<Mastered />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
