import { TopBar } from './TopBar';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col">
      <TopBar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
