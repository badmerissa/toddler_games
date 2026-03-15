import { coloringImages } from '@/lib/images';
import { GalleryCard } from './GalleryCard';

export function GalleryGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 w-full max-w-2xl mx-auto">
      {coloringImages.map((image) => (
        <GalleryCard key={image.slug} image={image} />
      ))}
    </div>
  );
}
