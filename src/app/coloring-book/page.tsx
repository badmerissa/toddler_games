import type { Metadata } from 'next';
import { AppShell } from '@/components/shell/AppShell';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';

export const metadata: Metadata = {
  title: 'Toddler Colouring Book — Colour Animals & Shapes Online',
  description:
    'Free interactive colouring book for toddlers. Tap to colour animals, vehicles, and fruit. No account needed, works on any device.',
};

export default function ColouringBookPage() {
  return (
    <AppShell>
      <main className="min-h-screen bg-gradient-to-b from-yellow-300 to-orange-400 flex flex-col items-center py-8">
        <h1 className="text-4xl font-black text-white drop-shadow-md mb-6 select-none">
          🎨 Let&apos;s Colour!
        </h1>
        <GalleryGrid />
      </main>
    </AppShell>
  );
}
