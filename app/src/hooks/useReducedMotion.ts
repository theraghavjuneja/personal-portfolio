import { useState, useEffect, createContext, useContext } from 'react';

interface ReducedMotionContextType {
  reducedMotion: boolean;
  setReducedMotion: (v: boolean) => void;
}

export const ReducedMotionContext = createContext<ReducedMotionContextType>({
  reducedMotion: false,
  setReducedMotion: () => {},
});

export function useReducedMotion() {
  return useContext(ReducedMotionContext);
}

export function useReducedMotionInit() {
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem('reduced-motion');
    if (stored !== null) return stored === 'true';
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    localStorage.setItem('reduced-motion', String(reducedMotion));
  }, [reducedMotion]);

  return { reducedMotion, setReducedMotion };
}
