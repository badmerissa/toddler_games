import { notFound } from 'next/navigation';
import { coloringImages, getImage } from '@/lib/images';
import { ColoringCanvas } from '@/components/coloring/ColoringCanvas';

export function generateStaticParams() {
  return coloringImages.map((img) => ({ slug: img.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function ColorPage({ params }: Props) {
  const { slug } = await params;
  const image = getImage(slug);
  if (!image) notFound();
  return <ColoringCanvas image={image} />;
}
