'use client';

import { useEffect } from 'react';
import type { ColoringImage } from '@/types';
import { useColoringDispatch } from '@/context/ColoringContext';
import { getAllFills } from '@/lib/storage';
import { BackButton } from '@/components/ui/BackButton';
import { SoundToggle } from '@/components/ui/SoundToggle';
import { UndoButton } from './UndoButton';
import { SvgColoringPage } from './SvgColoringPage';
import { ColorPalette } from './ColorPalette';
import { CelebrationOverlay } from '@/components/celebration/CelebrationOverlay';
import { usePageCompletion } from '@/hooks/usePageCompletion';
import { useColoringState } from '@/context/ColoringContext';

type Props = { image: ColoringImage };

export function ColoringCanvas({ image }: Props) {
  const dispatch = useColoringDispatch();
  const { isCelebrating } = useColoringState();
  usePageCompletion();

  // Load image fills from storage on mount
  useEffect(() => {
    const savedFills = getAllFills(image.slug);
    dispatch({ type: 'LOAD_IMAGE', slug: image.slug, savedFills });
  }, [image.slug, dispatch]);

  return (
    <div className="flex flex-col h-dvh w-full bg-gradient-to-b from-sky-400 to-indigo-500 overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 gap-2 shrink-0">
        <BackButton />
        <SoundToggle />
        <UndoButton />
      </div>

      {/* SVG coloring area */}
      <SvgColoringPage svgPath={image.svgPath} />

      {/* Colour palette */}
      <div className="shrink-0 overflow-x-auto">
        <ColorPalette />
      </div>

      {/* Celebration */}
      {isCelebrating && <CelebrationOverlay />}
    </div>
  );
}
