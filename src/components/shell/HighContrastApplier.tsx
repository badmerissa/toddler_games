'use client';

import { useEffect } from 'react';
import { useColoringState } from '@/context/ColoringContext';

export function HighContrastApplier() {
  const { highContrast } = useColoringState();
  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', highContrast);
  }, [highContrast]);
  return null;
}
