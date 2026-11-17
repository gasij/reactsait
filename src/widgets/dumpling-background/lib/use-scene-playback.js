'use client';
import { useEffect, useState } from 'react';
export function useScenePlayback(root, motionPaused) {
  const [reduced, setReduced] = useState(true);
  const [visible, setVisible] = useState(true);
  const [inView, setInView] = useState(true);
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const size = window.matchMedia('(max-width: 640px)');
    const sync = () => { setReduced(preference.matches); setCompact(size.matches); };
    sync();
    preference.addEventListener('change', sync); size.addEventListener('change', sync);
    const visibility = () => setVisible(!document.hidden);
    visibility(); document.addEventListener('visibilitychange', visibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.05 });
    if (root.current) observer.observe(root.current);
    return () => { preference.removeEventListener('change', sync); size.removeEventListener('change', sync); document.removeEventListener('visibilitychange', visibility); observer.disconnect(); };
  }, [root]);
  return { playing: !motionPaused && !reduced && visible && inView, reduced, compact };
}
