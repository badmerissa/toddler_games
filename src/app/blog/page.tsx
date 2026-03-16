import type { Metadata } from 'next';
import { AppShell } from '@/components/shell/AppShell';
import { PostCard } from '@/components/blog/PostCard';
import { blogPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'For Parents — Articles & Resources',
  description:
    'Articles for parents on screen time, digital art for young children, and choosing safe apps — written and curated by the Toddler Games team.',
};

export default function BlogIndexPage() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <AppShell>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50">
        <div className="max-w-2xl mx-auto px-4 py-10">
          {/* Header */}
          <div className="mb-10">
            <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-2">
              For Parents
            </p>
            <h1 className="text-3xl font-black text-slate-800 mb-3">Articles & Resources</h1>
            <p className="text-slate-500 leading-relaxed">
              Thoughtful articles on screen time, digital play, and raising healthy tech habits —
              for parents of children aged 1–5.
            </p>
          </div>

          {/* Post list */}
          <div className="space-y-4">
            {sorted.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-slate-400 mt-12 leading-relaxed">
            External links open in a new tab. We are not affiliated with any linked organisations.
            <br />
            Articles are for informational purposes only.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
