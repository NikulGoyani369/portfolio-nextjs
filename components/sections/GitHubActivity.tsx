'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionTag from '../ui/SectionTag';

interface GitHubData {
  publicRepos: number;
  followers: number;
  totalStars: number;
  langCounts: Record<string, number>;
  topRepos: {
    name: string;
    description: string | null;
    stars: number;
    forks: number;
    language: string | null;
    url: string;
  }[];
}

const LANG_COLORS: Record<string, string> = {
  TypeScript:  '#3178c6',
  JavaScript:  '#f1e05a',
  Python:      '#3572A5',
  Java:        '#b07219',
  HTML:        '#e34c26',
  CSS:         '#563d7c',
  Shell:       '#89e051',
};

const fallbackColor = '#8b5cf6';

function getLangColor(lang: string) {
  return LANG_COLORS[lang] ?? fallbackColor;
}

const cardVariants = {
  hidden: { y: 24, opacity: 0 },
  show:   { y: 0,  opacity: 1, transition: { duration: 0.45 } },
};

const containerVariants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
};

function StatCard({ label, value, icon }: { label: string; value: number | string; icon: React.ReactNode }) {
  return (
    <motion.div
      variants={cardVariants}
      className="relative rounded-[18px] p-5 flex flex-col gap-2 overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(139,92,246,0.15)',
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(139,92,246,0.5), transparent)' }} />
      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-violet-400"
        style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}>
        {icon}
      </div>
      <div className="text-2xl font-black text-violet-400 tabular-nums">{value}</div>
      <div className="text-xs text-white/40">{label}</div>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-[18px] p-5 flex flex-col gap-3 animate-pulse"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="w-8 h-8 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)' }} />
      <div className="h-7 w-12 rounded-md" style={{ background: 'rgba(255,255,255,0.06)' }} />
      <div className="h-3 w-24 rounded-md" style={{ background: 'rgba(255,255,255,0.04)' }} />
    </div>
  );
}

export default function GitHubActivity() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/github')
      .then((r) => r.json())
      .then((d) => {
        if (d.error) console.error('[GitHub API]', d.detail);
        else setData(d);
      })
      .finally(() => setLoading(false));
  }, []);

  const topLangs = data
    ? Object.entries(data.langCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
    : [];
  const totalLangRepos = topLangs.reduce((s, [, n]) => s + n, 0);

  return (
    <section
      id="github"
      className="dots px-6 lg:px-24 py-16 lg:py-24"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="max-w-5xl mx-auto">
        <SectionTag>GitHub</SectionTag>
        <div className="flex items-end justify-between flex-wrap gap-4 mb-3">
          <h2 className="text-white">
            Code <span className="text-violet-400">activity</span>
          </h2>
          <a
            href="https://github.com/NikulGoyani369"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-violet-400 uppercase tracking-widest px-4 py-2.5 rounded-xl transition-colors hover:bg-violet-400/10"
            style={{ background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.25)' }}
          >
            View GitHub Profile ↗
          </a>
        </div>
        <p className="text-sm leading-relaxed max-w-md mb-10 text-white/35">
          Live stats pulled from GitHub — public repositories, stars, and language breakdown.
        </p>

        {/* Stat cards */}
        {loading ? (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[0, 1, 2].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-3 gap-4 mb-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <StatCard
              label="Public repositories"
              value={data?.publicRepos ?? '—'}
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3h18v18H3zM3 9h18M9 21V9" />
                </svg>
              }
            />
            <StatCard
              label="Total stars earned"
              value={data?.totalStars ?? '—'}
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              }
            />
            <StatCard
              label="GitHub followers"
              value={data?.followers ?? '—'}
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              }
            />
          </motion.div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Language breakdown */}
          <motion.div
            className="rounded-[20px] p-6 relative overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(to right, transparent, rgba(167,139,250,0.25), transparent)' }} />

            <h3 className="text-sm font-semibold text-white mb-5">Top languages</h3>

            {loading ? (
              <div className="flex flex-col gap-3">
                {[70, 50, 35, 25, 15].map((w, i) => (
                  <div key={i} className="flex items-center gap-3 animate-pulse">
                    <div className="h-2.5 rounded-full flex-1" style={{ background: 'rgba(255,255,255,0.06)', maxWidth: `${w}%` }} />
                  </div>
                ))}
              </div>
            ) : topLangs.length === 0 ? (
              <p className="text-xs text-white/30">No language data available.</p>
            ) : (
              <>
                {/* Stacked bar */}
                <div className="flex h-2 rounded-full overflow-hidden mb-5 gap-px">
                  {topLangs.map(([lang, count]) => (
                    <div
                      key={lang}
                      title={`${lang}: ${Math.round((count / totalLangRepos) * 100)}%`}
                      style={{
                        width: `${(count / totalLangRepos) * 100}%`,
                        background: getLangColor(lang),
                      }}
                    />
                  ))}
                </div>

                <div className="flex flex-col gap-2.5">
                  {topLangs.map(([lang, count]) => (
                    <div key={lang} className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ background: getLangColor(lang) }} />
                      <span className="text-xs text-white/70 flex-1">{lang}</span>
                      <span className="text-[10px] text-white/30 tabular-nums">
                        {Math.round((count / totalLangRepos) * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </motion.div>

          {/* Top repositories */}
          <motion.div
            className="rounded-[20px] p-6 relative overflow-hidden flex flex-col gap-3"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(to right, transparent, rgba(167,139,250,0.25), transparent)' }} />

            <h3 className="text-sm font-semibold text-white mb-2">Top repositories</h3>

            {loading ? (
              <div className="flex flex-col gap-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="animate-pulse rounded-[12px] p-3.5"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="h-3 w-32 rounded mb-2" style={{ background: 'rgba(255,255,255,0.07)' }} />
                    <div className="h-2.5 w-full rounded" style={{ background: 'rgba(255,255,255,0.04)' }} />
                  </div>
                ))}
              </div>
            ) : (data?.topRepos ?? []).length === 0 ? (
              <p className="text-xs text-white/30">No repository data available.</p>
            ) : (
              (data?.topRepos ?? []).map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-[12px] p-3.5 flex flex-col gap-1.5 transition-all hover:border-violet-400/30"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-white group-hover:text-violet-400 transition-colors truncate">
                      {repo.name}
                    </span>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {repo.stars > 0 && (
                        <span className="flex items-center gap-1 text-[10px] text-white/30">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                          {repo.stars}
                        </span>
                      )}
                      {repo.forks > 0 && (
                        <span className="flex items-center gap-1 text-[10px] text-white/30">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><circle cx="6" cy="6" r="3" />
                            <path d="M18 9a9 9 0 0 1-9 9" />
                          </svg>
                          {repo.forks}
                        </span>
                      )}
                    </div>
                  </div>
                  {repo.description && (
                    <p className="text-[10px] text-white/30 leading-relaxed line-clamp-1">{repo.description}</p>
                  )}
                  {repo.language && (
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ background: getLangColor(repo.language) }} />
                      <span className="text-[10px] text-white/25">{repo.language}</span>
                    </div>
                  )}
                </a>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}