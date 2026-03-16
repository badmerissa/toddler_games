import type { Metadata } from 'next';
import { AppShell } from '@/components/shell/AppShell';
import { SettingsContent } from './SettingsContent';

export const metadata: Metadata = {
  title: 'Settings — Toddler Games',
  robots: { index: false, follow: false },
};

export default function SettingsPage() {
  return (
    <AppShell>
      <SettingsContent />
    </AppShell>
  );
}
