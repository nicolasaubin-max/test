import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { TopStatus } from './TopStatus';
import { BottomNav } from './BottomNav';
import { useProgressStore } from '../../lib/store';

export function Layout() {
  const location = useLocation();
  const ensureDailyReset = useProgressStore((s) => s.ensureDailyReset);
  const regenerateHearts = useProgressStore((s) => s.regenerateHearts);

  useEffect(() => {
    ensureDailyReset();
    regenerateHearts();
  }, [ensureDailyReset, regenerateHearts]);

  const inLesson = location.pathname.startsWith('/lesson');

  return (
    <div className="flex flex-col min-h-full">
      {!inLesson && <TopStatus />}
      <main className="flex-1 flex flex-col overflow-y-auto no-scrollbar">
        <Outlet />
      </main>
      {!inLesson && <BottomNav />}
    </div>
  );
}
