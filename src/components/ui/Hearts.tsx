import { HEARTS_MAX } from '../../lib/store';

export function Hearts({ hearts }: { hearts: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${hearts} vies restantes`}>
      {Array.from({ length: HEARTS_MAX }).map((_, i) => (
        <span key={i} className={i < hearts ? 'text-red-500' : 'text-gray-300 dark:text-gray-700'}>
          ♥
        </span>
      ))}
    </div>
  );
}
