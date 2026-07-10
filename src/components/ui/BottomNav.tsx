import { NavLink } from 'react-router-dom';

const TABS = [
  { to: '/', label: 'Accueil', icon: '🏠', end: true },
  { to: '/review', label: 'À revoir', icon: '🔁' },
  { to: '/mastered', label: 'Mémorisé', icon: '✅' },
  { to: '/settings', label: 'Réglages', icon: '⚙️' },
];

export function BottomNav() {
  return (
    <nav className="sticky bottom-0 z-20 flex border-t border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center gap-0.5 py-2 text-xs font-medium transition ${
              isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'
            }`
          }
        >
          <span className="text-lg leading-none">{tab.icon}</span>
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}
