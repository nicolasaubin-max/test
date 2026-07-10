import { Link, useParams } from 'react-router-dom';
import { GRAMMAR_NOTES } from '../data/grammar';

export function GrammarModule() {
  const { level } = useParams();

  return (
    <div className="flex flex-col gap-4 px-4 py-5">
      <div>
        <Link to={`/level/${level}`} className="text-sm text-gray-400">
          ← Retour
        </Link>
        <h1 className="text-xl font-extrabold mt-1">Les cas russes</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Une introduction douce, avec un code couleur sur les terminaisons.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex flex-col gap-3">
        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Exemple : nominatif → accusatif</p>
        <div className="flex items-center justify-around text-center">
          <div>
            <p className="text-2xl font-bold">
              книг<span style={{ color: '#22c55e' }}>а</span>
            </p>
            <p className="text-xs text-gray-400">nominatif (sujet)</p>
          </div>
          <span className="text-gray-300">→</span>
          <div>
            <p className="text-2xl font-bold">
              книг<span style={{ color: '#f97316' }}>у</span>
            </p>
            <p className="text-xs text-gray-400">accusatif (COD)</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          « Он читает книг<span style={{ color: '#f97316', fontWeight: 700 }}>у</span> » — il lit le livre.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {GRAMMAR_NOTES.map((note) => (
          <div key={note.id} className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex gap-3">
            {note.colorHint && (
              <span
                className="w-2 shrink-0 rounded-full"
                style={{ background: note.colorHint }}
                aria-hidden
              />
            )}
            <div>
              <p className="font-semibold">{note.title}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{note.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
