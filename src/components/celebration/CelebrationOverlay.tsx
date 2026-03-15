'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useColoringDispatch } from '@/context/ColoringContext';
import { useSound } from '@/hooks/useSound';
import { ConfettiCanvas } from './ConfettiCanvas';
import { StarBurst } from './StarBurst';

export function CelebrationOverlay() {
  const dispatch = useColoringDispatch();
  const { play } = useSound();

  useEffect(() => {
    play('page-complete');
    const timer = setTimeout(() => dispatch({ type: 'DISMISS_CELEBRATION' }), 4000);
    return () => clearTimeout(timer);
  }, [dispatch, play]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => dispatch({ type: 'DISMISS_CELEBRATION' })}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 cursor-pointer"
    >
      <ConfettiCanvas />
      <StarBurst />
      <motion.p
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5, ease: 'backOut' }}
        className="relative z-10 mt-48 text-white font-bold drop-shadow-lg select-none"
        style={{ fontSize: '3rem', lineHeight: 1.2 }}
      >
        Hooray! 🎉
      </motion.p>
    </motion.div>
  );
}
