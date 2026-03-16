'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function RedirectToNewUrl({ slug }: { slug: string }) {
  const router = useRouter();
  useEffect(() => {
    router.replace(`/coloring-book/${slug}/`);
  }, [slug, router]);
  return null;
}
