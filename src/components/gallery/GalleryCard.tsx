'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { ColoringImage } from '@/types';
import { getCompletionPercent } from '@/lib/storage';

type Props = { image: ColoringImage };

export function GalleryCard({ image }: Props) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setPercent(getCompletionPercent(image.slug, image.regionCount));
  }, [image.slug, image.regionCount]);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = (percent / 100) * circumference;

  return (
    <Link
      href={`/color/${image.slug}/`}
      aria-label={image.label}
      className="
        relative flex flex-col items-center justify-center
        rounded-3xl p-4
        bg-white shadow-lg
        active:scale-95 transition-transform duration-100
        select-none cursor-pointer
        min-h-[touch-xl]
      "
      style={{ backgroundColor: image.thumbnailColor + '33' }}
    >
      {/* SVG thumbnail */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.svgPath}
        alt={image.label}
        width={120}
        height={120}
        className="object-contain"
        draggable={false}
      />

      {/* Progress ring overlay */}
      {percent > 0 && (
        <div className="absolute top-2 right-2">
          <svg width="48" height="48" className="-rotate-90">
            <circle
              cx="24"
              cy="24"
              r={radius * 0.55}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="4"
            />
            <circle
              cx="24"
              cy="24"
              r={radius * 0.55}
              fill="none"
              stroke="#34C759"
              strokeWidth="4"
              strokeDasharray={`${(percent / 100) * (2 * Math.PI * radius * 0.55)} ${2 * Math.PI * radius * 0.55}`}
              strokeLinecap="round"
            />
          </svg>
          {percent === 100 && (
            <span className="absolute inset-0 flex items-center justify-center text-base">
              ⭐
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
