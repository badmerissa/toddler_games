import type { ColoringImage } from '@/types';

export const coloringImages: ColoringImage[] = [
  {
    slug: 'cat',
    label: 'Cat',
    svgPath: '/svgs/cat.svg',
    regionCount: 6,
    thumbnailColor: '#FFD580',
  },
  {
    slug: 'dog',
    label: 'Dog',
    svgPath: '/svgs/dog.svg',
    regionCount: 6,
    thumbnailColor: '#D4A574',
  },
  {
    slug: 'duck',
    label: 'Duck',
    svgPath: '/svgs/duck.svg',
    regionCount: 5,
    thumbnailColor: '#FFE066',
  },
  {
    slug: 'fish',
    label: 'Fish',
    svgPath: '/svgs/fish.svg',
    regionCount: 5,
    thumbnailColor: '#80CFFF',
  },
  {
    slug: 'apple',
    label: 'Apple',
    svgPath: '/svgs/apple.svg',
    regionCount: 4,
    thumbnailColor: '#FF6B6B',
  },
  {
    slug: 'banana',
    label: 'Banana',
    svgPath: '/svgs/banana.svg',
    regionCount: 3,
    thumbnailColor: '#FFE566',
  },
  {
    slug: 'car',
    label: 'Car',
    svgPath: '/svgs/car.svg',
    regionCount: 6,
    thumbnailColor: '#80BFFF',
  },
  {
    slug: 'house',
    label: 'House',
    svgPath: '/svgs/house.svg',
    regionCount: 6,
    thumbnailColor: '#FFB380',
  },
];

export function getImage(slug: string): ColoringImage | undefined {
  return coloringImages.find((img) => img.slug === slug);
}
