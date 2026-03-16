type Link = { title: string; url: string; source: string };

type Props = { links: Link[] };

export function CuratedLinks({ links }: Props) {
  return (
    <div className="mt-6 space-y-3">
      {links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white border border-slate-200 rounded-2xl px-5 py-4 hover:border-indigo-300 hover:shadow-sm transition-all group"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-800 text-sm group-hover:text-indigo-700 transition-colors leading-snug">
                {link.title}
              </p>
              <p className="text-xs text-slate-400 mt-1 font-medium">{link.source}</p>
            </div>
            <span className="shrink-0 text-slate-300 group-hover:text-indigo-400 transition-colors text-lg leading-none mt-0.5">
              →
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
