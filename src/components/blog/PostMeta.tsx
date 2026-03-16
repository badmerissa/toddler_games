import type { BlogPost } from '@/types';

type Props = { post: BlogPost };

export function PostMeta({ post }: Props) {
  const date = new Date(post.publishedAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 mb-3">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <h1 className="text-2xl sm:text-3xl font-black text-slate-800 leading-tight mb-3">
        {post.title}
      </h1>
      <div className="flex items-center gap-3 text-sm text-slate-400">
        <time dateTime={post.publishedAt}>{date}</time>
        <span>·</span>
        <span>{post.readingTime} min read</span>
        {post.type === 'curated' && (
          <>
            <span>·</span>
            <span className="text-amber-600 font-semibold">Curated links</span>
          </>
        )}
      </div>
    </div>
  );
}
