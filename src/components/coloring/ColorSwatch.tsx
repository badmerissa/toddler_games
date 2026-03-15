'use client';

import type { ColorEntry } from '@/types';
import { useColoringState, useColoringDispatch } from '@/context/ColoringContext';
import { useSound } from '@/hooks/useSound';

type Props = { color: ColorEntry };

export function ColorSwatch({ color }: Props) {
  const { activeColor } = useColoringState();
  const dispatch = useColoringDispatch();
  const { play } = useSound();
  const isActive = activeColor === color.hex;

  return (
    <button
      aria-label={color.label}
      onClick={() => {
        dispatch({ type: 'SET_ACTIVE_COLOR', color: color.hex });
        play('color-pick');
      }}
      className="
        rounded-2xl transition-transform duration-100
        active:scale-90 select-none cursor-pointer
        focus-visible:outline-none
      "
      style={{
        backgroundColor: color.hex,
        width: 64,
        height: 64,
        border: isActive ? '4px solid #fff' : '2px solid rgba(0,0,0,0.15)',
        boxShadow: isActive
          ? '0 0 0 3px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.3)'
          : '0 2px 6px rgba(0,0,0,0.15)',
        transform: isActive ? 'scale(1.15)' : 'scale(1)',
      }}
    />
  );
}
