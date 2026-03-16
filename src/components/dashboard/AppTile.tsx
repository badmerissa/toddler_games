import Link from 'next/link';
import type { AppEntry } from '@/lib/apps';

type Props = {
  app: AppEntry;
  progressSummary?: string;
};

export function AppTile({ app, progressSummary }: Props) {
  const isActive = app.status === 'active';

  const inner = (
    <div
      className={`
        relative bg-white rounded-2xl shadow-md p-6
        flex flex-col items-center gap-3 text-center
        transition-all duration-150
        ${isActive ? 'hover:shadow-xl hover:-translate-y-0.5 active:scale-95 cursor-pointer' : 'opacity-60 cursor-default select-none'}
      `}
    >
      {/* Top accent stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
        style={{ backgroundColor: app.accentColor }}
      />

      {/* Icon */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl"
        style={{ backgroundColor: app.accentColor + '22' }}
      >
        {app.icon}
      </div>

      {/* Text */}
      <div>
        <h3 className="font-black text-slate-800 text-lg leading-tight">{app.title}</h3>
        <p className="text-slate-500 text-sm mt-0.5 leading-snug">{app.description}</p>
      </div>

      {/* Badge */}
      {isActive && progressSummary && (
        <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
          {progressSummary}
        </span>
      )}
      {!isActive && (
        <span className="text-xs text-slate-400 font-semibold bg-slate-100 px-3 py-1 rounded-full">
          Coming soon
        </span>
      )}
    </div>
  );

  if (isActive) {
    return (
      <Link href={app.href} aria-label={app.title}>
        {inner}
      </Link>
    );
  }

  return <div aria-label={`${app.title} — coming soon`}>{inner}</div>;
}
