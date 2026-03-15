'use client';

import { useEffect } from 'react';
import { useColoringState, useColoringDispatch } from '@/context/ColoringContext';
import { getImage } from '@/lib/images';

export function usePageCompletion() {
  const { activeSlug, fills, isComplete } = useColoringState();
  const dispatch = useColoringDispatch();

  useEffect(() => {
    if (!activeSlug || isComplete) return;
    const image = getImage(activeSlug);
    if (!image) return;
    const filledCount = Object.keys(fills).length;
    if (filledCount >= image.regionCount) {
      dispatch({ type: 'SET_COMPLETE' });
    }
  }, [fills, activeSlug, isComplete, dispatch]);
}
