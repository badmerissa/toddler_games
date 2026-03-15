'use client';

import { motion } from 'framer-motion';

const STARS = ['⭐','🌟','✨','💫','🎉','🌈'];

export function StarBurst() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {STARS.map((star, i) => {
        const angle = (i / STARS.length) * 360;
        const rad = (angle * Math.PI) / 180;
        const distance = 120;
        const tx = Math.cos(rad) * distance;
        const ty = Math.sin(rad) * distance;
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 1, 0], x: tx, y: ty, scale: [0, 1.5, 1.2, 0] }}
            transition={{ duration: 1.5, delay: i * 0.08, ease: 'easeOut' }}
            className="absolute text-4xl"
          >
            {star}
          </motion.span>
        );
      })}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.3, 1], opacity: 1 }}
        transition={{ duration: 0.5, ease: 'backOut' }}
        className="text-8xl"
      >
        🎉
      </motion.div>
    </div>
  );
}
