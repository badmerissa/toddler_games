'use client';

import { useRouter } from 'next/navigation';
import { BigButton } from './BigButton';

export function BackButton() {
  const router = useRouter();
  return (
    <BigButton
      onClick={() => router.push('/')}
      aria-label="Back to gallery"
      className="bg-white/20 hover:bg-white/30 text-white px-4"
    >
      ←
    </BigButton>
  );
}
