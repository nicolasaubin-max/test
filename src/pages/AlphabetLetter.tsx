import { Link, useParams } from 'react-router-dom';
import { ALPHABET } from '../data/alphabet';
import { AudioButton } from '../components/ui/AudioButton';

export function AlphabetLetter() {
  const { level, letterId } = useParams();
  const letter = ALPHABET.find((l) => l.id === letterId);
  const index = ALPHABET.findIndex((l) => l.id === letterId);

  if (!letter) return null;

  const prev = ALPHABET[index - 1];
  const next = ALPHABET[index + 1];

  return (
    <div className="flex flex-col gap-5 px-4 py-5">
      <Link to={`/level/${level}/alphabet`} className="text-sm text-gray-400">
        ← Retour à l'alphabet
      </Link>

      <div className="flex flex-col items-center gap-2 py-4">
        <div className="text-7xl font-extrabold">
          {letter.upper}
          <span className="text-4xl align-middle ml-2">{letter.lower}</span>
        </div>
        <div className="text-lg text-gray-500 dark:text-gray-400">{letter.name} — {letter.sound}</div>
        <AudioButton text={letter.exampleWord.ru} size="lg" />
      </div>

      {letter.falseFriend && (
        <div className="rounded-xl bg-amber-50 dark:bg-amber-950 border border-amber-300 dark:border-amber-800 p-3 text-sm text-amber-800 dark:text-amber-200">
          ⚠️ Faux ami visuel : {letter.falseFriend}
        </div>
      )}

      <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">
        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Ancrage mémoire</p>
        <p>{letter.anchor}</p>
        {!letter.hasFrenchEquivalent && (
          <p className="text-xs text-gray-400 mt-1 italic">Ce son n'existe pas en français, entraîne ton oreille avec l'audio.</p>
        )}
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-3">
        <div className="flex-1">
          <p className="text-2xl font-bold">{letter.exampleWord.ru}</p>
          <p className="text-gray-400 italic">{letter.exampleWord.translit}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{letter.exampleWord.fr}</p>
        </div>
        <AudioButton text={letter.exampleWord.ru} />
      </div>

      <div className="flex justify-between pt-2">
        {prev ? (
          <Link to={`/level/${level}/alphabet/${prev.id}`} className="text-sm font-semibold text-blue-600">
            ← {prev.upper}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/level/${level}/alphabet/${next.id}`} className="text-sm font-semibold text-blue-600">
            {next.upper} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
