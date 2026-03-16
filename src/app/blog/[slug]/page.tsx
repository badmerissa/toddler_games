import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { AppShell } from '@/components/shell/AppShell';
import { PostMeta } from '@/components/blog/PostMeta';
import { CuratedLinks } from '@/components/blog/CuratedLinks';
import { blogPosts, blogModules, getBlogPost } from '@/lib/blog';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const moduleImport = blogModules[slug];
  if (!moduleImport) notFound();

  const { default: Content } = await moduleImport();

  return (
    <AppShell>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50">
        <div className="max-w-2xl mx-auto px-4 py-8">
          {/* Back link */}
          <Link
            href="/blog/"
            className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors mb-6"
          >
            ← All articles
          </Link>

          {/* Post header */}
          <PostMeta post={post} />

          {/* Curated links or MDX content */}
          {post.type === 'curated' && post.externalLinks ? (
            <div>
              <div className="prose prose-slate max-w-none">
                <Content />
              </div>
              <CuratedLinks links={post.externalLinks} />
            </div>
          ) : (
            <div className="prose prose-slate max-w-none">
              <Content />
            </div>
          )}

          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-slate-200">
            <Link
              href="/blog/"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              ← Back to all articles
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
