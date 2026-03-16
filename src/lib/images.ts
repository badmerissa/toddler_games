import type { ColoringImage } from '@/types';

export const coloringImages: ColoringImage[] = [
  // ── Original 8 ────────────────────────────────────────
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

  // ── New 10 (more complex) ────────────────────────────
  {
    slug: 'princess',
    label: 'Princess',
    svgPath: '/svgs/princess.svg',
    regionCount: 12,
    thumbnailColor: '#FFB3D9',
  },
  {
    slug: 'lion',
    label: 'Lion',
    svgPath: '/svgs/lion.svg',
    regionCount: 12,
    thumbnailColor: '#F5A623',
  },
  {
    slug: 'fairy-garden',
    label: 'Fairy Garden',
    svgPath: '/svgs/fairy-garden.svg',
    regionCount: 12,
    thumbnailColor: '#7ED321',
  },
  {
    slug: 'train',
    label: 'Train',
    svgPath: '/svgs/train.svg',
    regionCount: 11,
    thumbnailColor: '#4A90D9',
  },
  {
    slug: 'frog',
    label: 'Frog',
    svgPath: '/svgs/frog.svg',
    regionCount: 12,
    thumbnailColor: '#5CB85C',
  },
  {
    slug: 'ladybug',
    label: 'Ladybug',
    svgPath: '/svgs/ladybug.svg',
    regionCount: 11,
    thumbnailColor: '#D0021B',
  },
  {
    slug: 'doctor',
    label: 'Doctor',
    svgPath: '/svgs/doctor.svg',
    regionCount: 11,
    thumbnailColor: '#A8D8EA',
  },
  {
    slug: 'toys',
    label: 'Toys',
    svgPath: '/svgs/toys.svg',
    regionCount: 11,
    thumbnailColor: '#F8E71C',
  },
  {
    slug: 'beach',
    label: 'Beach',
    svgPath: '/svgs/beach.svg',
    regionCount: 12,
    thumbnailColor: '#87CEEB',
  },
  {
    slug: 'dolphin',
    label: 'Dolphin',
    svgPath: '/svgs/dolphin.svg',
    regionCount: 11,
    thumbnailColor: '#5AC8FA',
  },
];

export function getImage(slug: string): ColoringImage | undefined {
  return coloringImages.find((img) => img.slug === slug);
}
