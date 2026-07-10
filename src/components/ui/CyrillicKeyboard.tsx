import { KEYBOARD_ROWS, EXTRA_KEYS } from '../../lib/cyrillicKeyboard';

interface Props {
  onKey: (char: string) => void;
  onBackspace: () => void;
  onSubmit?: () => void;
}

export function CyrillicKeyboard({ onKey, onBackspace, onSubmit }: Props) {
  return (
    <div className="w-full select-none bg-gray-100 dark:bg-gray-900 rounded-xl p-2 flex flex-col gap-1">
      {KEYBOARD_ROWS.map((row, i) => (
        <div key={i} className="flex justify-center gap-1">
          {i === 1 && EXTRA_KEYS.map((k) => (
            <Key key={k} char={k} onClick={() => onKey(k)} />
          ))}
          {row.map((char) => (
            <Key key={char} char={char} onClick={() => onKey(char)} />
          ))}
        </div>
      ))}
      <div className="flex justify-center gap-1 mt-1">
        <button
          type="button"
          onClick={() => onKey(' ')}
          className="flex-1 max-w-[200px] h-10 rounded-lg bg-white dark:bg-gray-800 text-sm font-medium shadow-sm active:scale-95 transition"
        >
          espace
        </button>
        <button
          type="button"
          onClick={onBackspace}
          className="w-14 h-10 rounded-lg bg-white dark:bg-gray-800 text-sm font-medium shadow-sm active:scale-95 transition"
          aria-label="Effacer"
        >
          ⌫
        </button>
        {onSubmit && (
          <button
            type="button"
            onClick={onSubmit}
            className="w-16 h-10 rounded-lg bg-emerald-500 text-white text-sm font-bold shadow-sm active:scale-95 transition"
          >
            OK
          </button>
        )}
      </div>
    </div>
  );
}

function Key({ char, onClick }: { char: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-7 h-10 sm:w-8 shrink-0 rounded-lg bg-white dark:bg-gray-800 text-[15px] font-medium shadow-sm active:scale-95 active:bg-gray-200 dark:active:bg-gray-700 transition"
    >
      {char}
    </button>
  );
}
