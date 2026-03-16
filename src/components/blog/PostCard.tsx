import Link from 'next/link';
import type { BlogPost } from '@/types';

type Props = { post: BlogPost };

export function PostCard({ post }: Props) {
  const date = new Date(post.publishedAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Link
      href={`/blog/${post.slug}/`}
      className="block bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 group"
    >
      <div className="flex flex-wrap gap-1.5 mb-3">
        {post.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
        {post.type === 'curated' && (
          <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">
            curated links
          </span>
        )}
      </div>

      <h2 className="font-black text-slate-800 text-base leading-snug mb-2 group-hover:text-indigo-700 transition-colors">
        {post.title}
      </h2>

      <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-3">{post.excerpt}</p>

      <div className="flex items-center gap-2 text-xs text-slate-400">
        <time dateTime={post.publishedAt}>{date}</time>
        <span>·</span>
        <span>{post.readingTime} min read</span>
      </div>
    </Link>
  );
}
