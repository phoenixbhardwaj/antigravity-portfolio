import React from 'react';
import type { ReactNode } from 'react';
import { ReactLenis } from 'lenis/react';

interface SmoothScrollProps {
  children: ReactNode;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const lenisOptions = {
    duration: 1.8,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo.out curve
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  };

  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
};
