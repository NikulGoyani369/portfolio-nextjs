import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogPosts } from '../../../data/blog';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | Nikulkumar Goyani`,
    description: post.summary,
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <main
      className="min-h-screen px-6 lg:px-24 py-20 lg:py-28"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Back link */}
        <Link
          href="/#blog"
          className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-violet-400 transition-colors mb-10 uppercase tracking-widest"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          All articles
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] px-2.5 py-1 rounded-full text-violet-400 uppercase tracking-widest"
              style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1
          className="text-white font-black leading-tight mb-4"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', letterSpacing: '-0.5px' }}
        >
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-10 pb-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <span className="text-xs text-white/30">{formattedDate}</span>
          <span className="text-xs text-white/20">·</span>
          <span className="text-xs text-white/30">{post.readTime}</span>
        </div>

        {/* Article body */}
        <div
          className="prose-blog"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer link */}
        <div className="mt-16 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-violet-400 transition-colors uppercase tracking-widest"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to all articles
          </Link>
        </div>
      </div>
    </main>
  );
}