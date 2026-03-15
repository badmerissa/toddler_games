'use client';

import { useColoringState, useColoringDispatch } from '@/context/ColoringContext';

export function SoundToggle() {
  const { soundEnabled } = useColoringState();
  const dispatch = useColoringDispatch();

  return (
    <button
      onClick={() => dispatch({ type: 'TOGGLE_SOUND' })}
      aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
      className="
        flex items-center justify-center
        w-12 h-12 rounded-full
        bg-white/20 hover:bg-white/30
        text-white text-2xl
        transition-transform active:scale-95
        select-none
      "
    >
      {soundEnabled ? '🔊' : '🔇'}
    </button>
  );
}
