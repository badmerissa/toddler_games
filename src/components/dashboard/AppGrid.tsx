'use client';

import { useEffect, useState } from 'react';
import { apps } from '@/lib/apps';
import { coloringImages } from '@/lib/images';
import { getCompletionPercent } from '@/lib/storage';
import { AppTile } from './AppTile';

function useColouringBookProgress() {
  const [completed, setCompleted] = useState<number | null>(null);

  useEffect(() => {
    const count = coloringImages.filter(
      (img) => getCompletionPercent(img.slug, img.regionCount) === 100
    ).length;
    setCompleted(count);
  }, []);

  return { completed, total: coloringImages.length };
}

export function AppGrid() {
  const { completed, total } = useColouringBookProgress();

  const progressSummary =
    completed === null
      ? undefined
      : completed === 0
        ? undefined
        : completed === total
          ? `All ${total} pages completed ⭐`
          : `${completed} of ${total} pages completed`;

  return (
    <div className="max-w-4xl mx-auto px-4 pb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {apps.map((app) => (
          <AppTile
            key={app.id}
            app={app}
            progressSummary={app.id === 'coloring-book' ? progressSummary : undefined}
          />
        ))}
      </div>
    </div>
  );
}
