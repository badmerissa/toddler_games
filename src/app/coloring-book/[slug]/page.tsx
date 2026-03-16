import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { coloringImages, getImage } from '@/lib/images';
import { ColoringCanvas } from '@/components/coloring/ColoringCanvas';

export function generateStaticParams() {
  return coloringImages.map((img) => ({ slug: img.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const image = getImage(slug);
  if (!image) return {};
  return {
    title: `Colour the ${image.label} — Toddler Colouring Book`,
    description: `Tap to colour the ${image.label.toLowerCase()} in our free toddler colouring book. Fun for children aged 1–5.`,
  };
}

export default async function ColouringBookSlugPage({ params }: Props) {
  const { slug } = await params;
  const image = getImage(slug);
  if (!image) notFound();
  return <ColoringCanvas image={image} />;
}
