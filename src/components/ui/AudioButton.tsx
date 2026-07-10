import { speakRussian } from '../../lib/tts';

export function AudioButton({ text, size = 'md' }: { text: string; size?: 'sm' | 'md' | 'lg' }) {
  const dims = size === 'sm' ? 'w-8 h-8 text-sm' : size === 'lg' ? 'w-14 h-14 text-2xl' : 'w-10 h-10 text-lg';
  return (
    <button
      type="button"
      aria-label={`Écouter : ${text}`}
      onClick={(e) => {
        e.stopPropagation();
        speakRussian(text);
      }}
      className={`${dims} shrink-0 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 active:scale-95 transition dark:bg-blue-950 dark:text-blue-300`}
    >
      🔊
    </button>
  );
}
