import { coloringImages } from '@/lib/images';
import { RedirectToNewUrl } from './RedirectToNewUrl';

export function generateStaticParams() {
  return coloringImages.map((img) => ({ slug: img.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function OldColorPageRedirect({ params }: Props) {
  const { slug } = await params;
  return <RedirectToNewUrl slug={slug} />;
}
