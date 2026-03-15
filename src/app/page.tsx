import { GalleryGrid } from '@/components/gallery/GalleryGrid';

export default function HomePage() {
  return (
    <main className="min-h-dvh bg-gradient-to-b from-yellow-300 to-orange-400 flex flex-col items-center py-8">
      <h1 className="text-5xl font-black text-white drop-shadow-md mb-6 select-none">
        🎨 Let&apos;s Colour!
      </h1>
      <GalleryGrid />
    </main>
  );
}
