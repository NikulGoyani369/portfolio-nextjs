'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SectionTag from '../ui/SectionTag';
import { blogPosts } from '../../src/data/blog';

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function Blog() {
  return (
    <section
      id="blog"
      className="dots px-6 lg:px-24 py-16 lg:py-24"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-5xl mx-auto">
        <SectionTag>Blog</SectionTag>
        <div className="flex items-end justify-between flex-wrap gap-4 mb-3">
          <h2 className="text-white">
            Thoughts on <span className="text-violet-400">testing</span>
          </h2>
        </div>
        <p className="text-sm leading-relaxed max-w-md mb-10 text-white/35">
          Articles on AI-driven QA, test automation, and quality engineering — written from the field.
        </p>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.slug}
              variants={cardVariants}
              className="relative rounded-[20px] p-6 flex flex-col gap-4 overflow-hidden group"
              style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {/* top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    'linear-gradient(to right, transparent, rgba(167,139,250,0.25), transparent)',
                }}
              />

              {/* tags */}
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] px-2 py-0.5 rounded-md text-violet-400/70 uppercase tracking-wider"
                    style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.15)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-sm font-bold text-white leading-snug group-hover:text-violet-400 transition-colors">
                {post.title}
              </h3>

              <p className="text-xs leading-relaxed text-white/40 flex-1">{post.summary}</p>

              <div
                className="flex items-center justify-between pt-3"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-white/25">{formatDate(post.date)}</span>
                  <span className="text-[10px] text-white/20">·</span>
                  <span className="text-[10px] text-white/25">{post.readTime}</span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-[10px] text-violet-400 hover:underline uppercase tracking-widest"
                >
                  Read →
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}