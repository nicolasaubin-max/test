import { useState } from 'react';
import { useProgressStore } from '../lib/store';
import { CyrillicKeyboard } from '../components/ui/CyrillicKeyboard';

const GOAL_OPTIONS = [10, 20, 30, 50];

export function Settings() {
  const dailyGoalXp = useProgressStore((s) => s.dailyGoalXp);
  const setDailyGoal = useProgressStore((s) => s.setDailyGoal);
  const personalWords = useProgressStore((s) => s.personalWords);
  const addPersonalWord = useProgressStore((s) => s.addPersonalWord);
  const removePersonalWord = useProgressStore((s) => s.removePersonalWord);

  const [ru, setRu] = useState('');
  const [fr, setFr] = useState('');
  const [translit, setTranslit] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);

  const canAdd = ru.trim() && fr.trim();

  const submit = () => {
    if (!canAdd) return;
    addPersonalWord({ ru: ru.trim(), fr: fr.trim(), translit: translit.trim() || ru.trim() });
    setRu('');
    setFr('');
    setTranslit('');
  };

  return (
    <div className="flex flex-col gap-6 px-4 py-5">
      <div>
        <h1 className="text-xl font-extrabold">Réglages</h1>
      </div>

      <section className="flex flex-col gap-2">
        <h2 className="font-bold text-sm text-gray-500 dark:text-gray-400">Objectif quotidien</h2>
        <div className="flex gap-2">
          {GOAL_OPTIONS.map((xp) => (
            <button
              key={xp}
              type="button"
              onClick={() => setDailyGoal(xp)}
              className={`flex-1 py-2 rounded-xl font-bold text-sm transition ${
                dailyGoalXp === xp ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
              }`}
            >
              {xp} XP
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-bold text-sm text-gray-500 dark:text-gray-400">Mes mots personnels</h2>
        <p className="text-xs text-gray-400">
          Ajoute du vocabulaire lié à ta vie (travail, quotidien) : il rejoint la révision espacée.
        </p>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-3 flex flex-col gap-2">
          <input
            value={ru}
            onFocus={() => setShowKeyboard(true)}
            onChange={(e) => setRu(e.target.value)}
            placeholder="Mot en russe"
            className="rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 text-lg"
          />
          <input
            value={translit}
            onChange={(e) => setTranslit(e.target.value)}
            placeholder="Translittération (optionnel)"
            className="rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
          />
          <input
            value={fr}
            onChange={(e) => setFr(e.target.value)}
            placeholder="Traduction en français"
            className="rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
          />
          {showKeyboard && (
            <CyrillicKeyboard
              onKey={(c) => setRu((r) => r + c)}
              onBackspace={() => setRu((r) => r.slice(0, -1))}
              onSubmit={() => setShowKeyboard(false)}
            />
          )}
          <button
            type="button"
            disabled={!canAdd}
            onClick={submit}
            className="w-full py-2.5 rounded-xl bg-emerald-600 disabled:opacity-40 text-white font-bold active:scale-[0.99] transition"
          >
            + Ajouter
          </button>
        </div>

        <div className="flex flex-col gap-1">
          {personalWords.map((w) => (
            <div key={w.id} className="rounded-lg bg-gray-50 dark:bg-gray-800 px-3 py-2 flex items-center justify-between">
              <div>
                <span className="font-medium">{w.ru}</span>{' '}
                <span className="text-gray-400 text-sm">— {w.fr}</span>
              </div>
              <button type="button" onClick={() => removePersonalWord(w.id)} className="text-red-400 text-sm">
                Supprimer
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
