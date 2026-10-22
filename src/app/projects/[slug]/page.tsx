import { notFound } from 'next/navigation';
import Link from 'next/link';
import { featuredProject, projects } from '../../../data/projects';

interface Props {
  params: Promise<{ slug: string }>;
}

const allProjects = [featuredProject, ...projects];

export async function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} | Nikulkumar Goyani`,
    description: project.description,
  };
}

function Panel({ label, children }: { label: string; children: string }) {
  return (
    <div
      className="rounded-[18px] p-6 flex flex-col gap-3 relative overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(167,139,250,0.2), transparent)',
        }}
      />
      <span
        className="text-[9px] uppercase tracking-[0.2em] text-violet-400 font-semibold"
        style={{ letterSpacing: '0.18em' }}
      >
        {label}
      </span>
      <p className="text-sm leading-relaxed text-white/55">{children}</p>
    </div>
  );
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main
      className="min-h-screen px-6 lg:px-24 py-20 lg:py-28"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-violet-400 transition-colors mb-10 uppercase tracking-widest"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          All projects
        </Link>

        {/* Hero */}
        <div className="flex items-center gap-5 mb-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {project.emoji}
          </div>
          <div>
            <h1
              className="text-white font-black leading-tight"
              style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', letterSpacing: '-0.5px' }}
            >
              {project.title}
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-white/30">{project.role}</span>
              <span className="text-white/15">·</span>
              <span className="text-xs text-white/30">{project.duration}</span>
            </div>
          </div>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[10px] px-2.5 py-1 rounded-md text-white/40 uppercase tracking-wider"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 mb-10 pb-10" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {project.live !== '#' && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-lg text-white transition-all hover:brightness-110"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                border: '1px solid rgba(167,139,250,0.3)',
                boxShadow: '0 0 18px rgba(124,58,237,0.25)',
              }}
            >
              Live Demo &#8599;
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-widest px-5 py-2.5 rounded-lg transition-colors text-white/45 hover:text-violet-400"
            style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}
          >
            GitHub &rarr;
          </a>
        </div>

        {/* Case study panels */}
        <div className="flex flex-col gap-4">
          <Panel label="Problem">{project.problem}</Panel>
          <Panel label="Approach">{project.approach}</Panel>
          <Panel label="Outcome">{project.outcome}</Panel>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-violet-400 transition-colors uppercase tracking-widest"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to all projects
          </Link>
        </div>
      </div>
    </main>
  );
}