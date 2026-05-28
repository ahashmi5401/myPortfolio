import React, { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { initLenis, destroyLenis, getLenis } from '../lib/lenis';

const LenisContext = createContext<Lenis | null>(null);

export const LenisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion — skip smooth scroll if user prefers it
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      lenisRef.current = initLenis();
    }

    return () => {
      destroyLenis();
    };
  }, []);

  return (
    <LenisContext.Provider value={getLenis()}>
      {children}
    </LenisContext.Provider>
  );
};

export const useLenis = () => useContext(LenisContext);
