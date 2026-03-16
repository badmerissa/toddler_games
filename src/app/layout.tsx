import type { Metadata } from 'next';
import './globals.css';
import { ColoringProvider } from '@/context/ColoringContext';
import { HighContrastApplier } from '@/components/shell/HighContrastApplier';
import { Analytics } from "@vercel/analytics/next"

const SITE_URL = 'https://toddlergames.app';
const SITE_NAME = 'Toddler Games';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Free Safe Games for Little Ones`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    'Free, safe browser games for toddlers. Colouring book, puzzles, and more. No account needed. No data collected. Works offline on any device.',
  keywords: ['toddler games', 'free toddler activities', 'colouring book for kids', 'safe apps for toddlers', 'offline kids games'],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_GB',
    url: SITE_URL,
    title: `${SITE_NAME} — Free Safe Games for Little Ones`,
    description:
      'Free, safe browser games for toddlers. No account needed. No data collected. Works offline.',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Free Safe Games for Little Ones`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Free Safe Games for Little Ones`,
    description:
      'Free, safe browser games for toddlers. No account needed. No data collected. Works offline.',
    images: ['/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: SITE_NAME,
    url: SITE_URL,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    isAccessibleForFree: true,
    audience: {
      '@type': 'ChildAudience',
      suggestedMinAge: 1,
      suggestedMaxAge: 5,
    },
    description:
      'Free, safe browser games for toddlers. No account needed. No data collected. Works offline on any device.',
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <ColoringProvider>
          <HighContrastApplier />
          {children}
        </ColoringProvider>
        <Analytics/>
      </body>
    </html>
  );
}
