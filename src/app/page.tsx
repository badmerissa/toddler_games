import type { Metadata } from 'next';
import { AppShell } from '@/components/shell/AppShell';
import { AppGrid } from '@/components/dashboard/AppGrid';
import { TrustStrip } from '@/components/dashboard/TrustStrip';

export const metadata: Metadata = {
  title: 'Toddler Games — Free Safe Games for Little Ones',
  description:
    'Free, safe browser games for toddlers. Colouring book, puzzles, and more. No account needed. No data collected. Works offline on any device.',
};

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50">
        {/* Hero */}
        <div className="max-w-4xl mx-auto px-4 pt-10 pb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 mb-2 leading-tight">
            What would you like to do today?
          </h1>
          <p className="text-slate-500 text-lg font-medium">
            Pick an activity for your little one
          </p>
        </div>

        {/* App Grid */}
        <AppGrid />

        {/* Trust Strip */}
        <TrustStrip />
      </div>
    </AppShell>
  );
}
