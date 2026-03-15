'use client';

import { useColoringState, useColoringDispatch } from '@/context/ColoringContext';
import { useSound } from '@/hooks/useSound';
import { BigButton } from '@/components/ui/BigButton';

export function UndoButton() {
  const { history } = useColoringState();
  const dispatch = useColoringDispatch();
  const { play } = useSound();
  const disabled = history.length === 0;

  return (
    <BigButton
      onClick={() => {
        if (disabled) return;
        dispatch({ type: 'UNDO' });
        play('undo');
      }}
      disabled={disabled}
      aria-label="Undo last colour"
      className="bg-white/20 hover:bg-white/30 text-white px-4"
    >
      ↩
    </BigButton>
  );
}
