'use client';

import { useEffect, useRef } from 'react';
import { useColoringState } from '@/context/ColoringContext';

type SoundName = 'color-pick' | 'fill-region' | 'undo' | 'page-complete';

let howlerInstance: typeof import('howler').Howl | null = null;
let soundSprite: InstanceType<typeof import('howler').Howl> | null = null;
let loaded = false;

function ensureLoaded() {
  if (loaded || typeof window === 'undefined') return;
  import('howler').then(({ Howl }) => {
    howlerInstance = Howl;
    soundSprite = new Howl({
      src: ['/audio/sounds.mp3'],
      sprite: {
        'color-pick': [0, 150],
        'fill-region': [300, 200],
        undo: [600, 150],
        'page-complete': [900, 2500],
      },
      onloaderror: () => {
        // audio unavailable — continue silently
      },
    });
    loaded = true;
  });
}

export function useSound() {
  const { soundEnabled } = useColoringState();
  const soundEnabledRef = useRef(soundEnabled);
  soundEnabledRef.current = soundEnabled;

  useEffect(() => {
    ensureLoaded();
  }, []);

  function play(name: SoundName) {
    if (!soundEnabledRef.current || !soundSprite) return;
    try {
      soundSprite.play(name);
    } catch {
      // ignore
    }
  }

  return { play };
}
