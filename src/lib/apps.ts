export type AppEntry = {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  accentColor: string;
  status: 'active' | 'coming-soon';
};

export const apps: AppEntry[] = [
  {
    id: 'coloring-book',
    title: 'Colouring Book',
    description: 'Tap to colour animals, vehicles, and more',
    icon: '🎨',
    href: '/coloring-book/',
    accentColor: '#f59e0b',
    status: 'active',
  },
  {
    id: 'puzzles',
    title: 'Shape Puzzles',
    description: 'Match and sort colourful shapes',
    icon: '🧩',
    href: '#',
    accentColor: '#8b5cf6',
    status: 'coming-soon',
  },
  {
    id: 'alphabet',
    title: 'ABC Letters',
    description: 'Learn the alphabet with fun animations',
    icon: '🔤',
    href: '#',
    accentColor: '#10b981',
    status: 'coming-soon',
  },
];
