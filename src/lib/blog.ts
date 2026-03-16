import type { BlogPost } from '@/types';

export const blogPosts: BlogPost[] = [
  {
    slug: 'screen-time-guidelines-toddlers',
    title: 'Screen Time for Toddlers: What the Research Actually Says',
    excerpt:
      'We break down the current guidance from the NHS, WHO, and AAP on screen time for children under 5 — and what it means in practice.',
    publishedAt: '2025-09-01',
    readingTime: 5,
    tags: ['screen-time', 'research', 'parenting'],
    type: 'original',
  },
  {
    slug: 'benefits-of-digital-art-for-young-children',
    title: '5 Benefits of Digital Colouring for Toddlers',
    excerpt:
      'Digital colouring apps can support fine motor development, colour recognition, and focused play when used thoughtfully.',
    publishedAt: '2025-09-15',
    readingTime: 4,
    tags: ['digital-art', 'development', 'toddlers'],
    type: 'original',
  },
  {
    slug: 'choosing-safe-apps-for-toddlers',
    title: 'How to Choose Safe Apps for Your Toddler',
    excerpt:
      'A practical checklist for parents: what to look for (and what to avoid) when selecting apps for children aged 1–4.',
    publishedAt: '2025-10-01',
    readingTime: 5,
    tags: ['app-safety', 'parenting', 'privacy'],
    type: 'original',
  },
  {
    slug: 'introducing-technology-to-1-year-olds',
    title: 'When & How to Introduce Screens to Very Young Children',
    excerpt:
      'Age-by-age guidance on introducing technology to babies and toddlers, balancing digital and hands-on play.',
    publishedAt: '2025-10-20',
    readingTime: 6,
    tags: ['screen-time', 'development', 'parenting'],
    type: 'original',
  },
  {
    slug: 'toddler-screen-time-resources',
    title: 'Trusted Resources on Toddler Screen Time (2025)',
    excerpt:
      'A curated list of the most reliable, evidence-based resources on screen time for young children from leading health organisations.',
    publishedAt: '2025-11-01',
    readingTime: 3,
    tags: ['screen-time', 'resources'],
    type: 'curated',
    externalLinks: [
      {
        title: 'Screen time and young children',
        url: 'https://www.nhs.uk/conditions/baby/babys-development/play-and-learning/screen-time/',
        source: 'NHS',
      },
      {
        title: 'Digital media and young children (ages 0-5)',
        url: 'https://www.aap.org/en/patient-care/media-and-children/age-based-screen-time-guidelines/',
        source: 'American Academy of Pediatrics',
      },
      {
        title: 'Guidelines on physical activity, sedentary behaviour and sleep for children under 5',
        url: 'https://www.who.int/publications/i/item/9789241550536',
        source: 'World Health Organization',
      },
    ],
  },
  {
    slug: 'educational-technology-research-links',
    title: 'Research & Reading: Ed-Tech for Early Childhood',
    excerpt:
      'Academic papers, charity reports, and expert commentary on the role of educational technology in early childhood development.',
    publishedAt: '2025-11-15',
    readingTime: 3,
    tags: ['research', 'ed-tech', 'development'],
    type: 'curated',
    externalLinks: [
      {
        title: 'Technology and Interactive Media as Tools in Early Childhood Programs',
        url: 'https://www.naeyc.org/resources/pubs/yc/may2012/technology-and-interactive-media',
        source: 'NAEYC',
      },
      {
        title: 'Early Childhood Digital Literacy',
        url: 'https://literacytrust.org.uk/research-services/research-reports/digital-literacy-and-young-children/',
        source: 'National Literacy Trust',
      },
      {
        title: 'Screen Time vs. Lean Time',
        url: 'https://www.zerotothree.org/resource/screen-time-fact-sheet/',
        source: 'Zero to Three',
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

// Static import map — webpack can bundle each MDX file separately
// Add new entries here when publishing new posts
export const blogModules: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  'screen-time-guidelines-toddlers': () =>
    import('@/content/blog/screen-time-guidelines-toddlers.mdx'),
  'benefits-of-digital-art-for-young-children': () =>
    import('@/content/blog/benefits-of-digital-art-for-young-children.mdx'),
  'choosing-safe-apps-for-toddlers': () =>
    import('@/content/blog/choosing-safe-apps-for-toddlers.mdx'),
  'introducing-technology-to-1-year-olds': () =>
    import('@/content/blog/introducing-technology-to-1-year-olds.mdx'),
  'toddler-screen-time-resources': () =>
    import('@/content/blog/toddler-screen-time-resources.mdx'),
  'educational-technology-research-links': () =>
    import('@/content/blog/educational-technology-research-links.mdx'),
};
