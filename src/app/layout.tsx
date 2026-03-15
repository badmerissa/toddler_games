import type { Metadata } from 'next';
import './globals.css';
import { ColoringProvider } from '@/context/ColoringContext';

export const metadata: Metadata = {
  title: 'Toddler Colouring Book',
  description: 'A fun colouring book for little ones',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ColoringProvider>{children}</ColoringProvider>
      </body>
    </html>
  );
}
