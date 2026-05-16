'use client';

import { motion } from 'framer-motion';
import SectionTag from '../ui/SectionTag';

interface Project {
  title: string;
  description: string;
  tech: string[];
  live: string;
  github: string;
  gradient: string;
  emoji: string;
}

const featured: Project = {
  title: 'Search Job Links',
  description:
    'A live React + TypeScript web app that aggregates and surfaces job listings with a fast, searchable interface. Built with Vite for instant dev feedback and deployed on GitHub Pages — a practical tool born from real job-hunting needs.',
  tech: ['React', 'TypeScript', 'Vite', 'CSS'],
  live: 'https://nikulgoyani369.github.io/Search-Job-Links/',
  github: 'https://github.com/NikulGoyani369/Search-Job-Links',
  gradient: 'from-[#1a1a2e] to-[#16213e]',
  emoji: '🔍',
};

const projects: Project[] = [
  {
    title: 'Car Management API',
    description:
      'Full-stack REST API + CLI client for managing car manufacturers and models. Features offline-first sync — the CLI works locally when the server is down and auto-syncs on reconnection.',
    tech: ['TypeScript', 'Node.js', 'MongoDB', 'REST API'],
    live: '#',
    github: 'https://github.com/NikulGoyani369/car-management',
    gradient: 'from-[#1a1a2e] to-[#2d1b4e]',
    emoji: '🚗',
  },
  {
    title: 'Playwright Test Automation',
    description:
      'Hands-on test automation suite using Playwright and TypeScript, covering browser automation, assertions, and end-to-end testing patterns — directly applied in professional V&V work.',
    tech: ['Playwright', 'TypeScript', 'E2E Testing', 'Node.js'],
    live: '#',
    github: 'https://github.com/NikulGoyani369/introduction-to-playwright',
    gradient: 'from-[#0f1f2e] to-[#1a3a4e]',
    emoji: '🎭',
  },
  {
    title: 'Master Thesis (Python)',
    description:
      'Academic research project from the MSc in Computer Engineering at University of Duisburg-Essen. A Python-based system with 288 commits, combining data processing, analysis, and a web-based output layer.',
    tech: ['Python', 'HTML', 'Shell', 'Data Analysis'],
    live: '#',
    github: 'https://github.com/NikulGoyani369/Master_Thesis',
    gradient: 'from-[#1a2e1a] to-[#1a4e2d]',
    emoji: '🎓',
  },
];

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const Projects = () => (
  <section
    id="projects"
    className="px-6 lg:px-24 py-24"
    style={{ background: 'var(--bg-primary)' }}
  >
    <div className="max-w-5xl mx-auto">
      <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
        <div>
          <SectionTag>Projects</SectionTag>
          <h2 className="text-slate-900 dark:text-white">
            Things I&apos;ve <span className="text-violet-400">worked on</span>
          </h2>
        </div>
        <a
          href="https://github.com/NikulGoyani369"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-violet-400 border border-violet-400/30 px-4 py-2 rounded-md hover:bg-violet-400/10 transition-colors uppercase tracking-widest"
        >
          View All on GitHub ↗
        </a>
      </div>

      {/* Featured project */}
      <motion.div
        className="grid lg:grid-cols-[1.2fr_1fr] border border-violet-400/15 rounded-2xl overflow-hidden mb-5"
        style={{ background: 'rgba(167,139,250,0.04)' }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div
          className={`bg-gradient-to-br ${featured.gradient} min-h-[200px] flex items-center justify-center text-6xl relative overflow-hidden`}
        >
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg,transparent,transparent 30px,rgba(167,139,250,1) 30px,rgba(167,139,250,1) 31px),repeating-linear-gradient(90deg,transparent,transparent 30px,rgba(167,139,250,1) 30px,rgba(167,139,250,1) 31px)',
            }}
          />
          <span className="relative z-10">{featured.emoji}</span>
        </div>

        <div className="p-8 flex flex-col justify-center">
          <span className="inline-block text-[9px] uppercase tracking-widest text-violet-400 bg-violet-400/10 border border-violet-400/20 px-3 py-1 rounded-full mb-4 w-fit">
            ⭐ Featured Project
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{featured.title}</h3>
          <p className="text-xs text-slate-500 leading-relaxed mb-4">
            {featured.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {featured.tech.map((t) => (
              <span
                key={t}
                className="text-[10px] text-slate-500 border border-slate-200 dark:border-[#1e293b] px-2 py-0.5 rounded"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            <a
              href={featured.live}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-violet-400 text-[#0f0f1a] text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-md hover:bg-violet-300 transition-colors"
            >
              Live Demo ↗
            </a>
            <a
              href={featured.github}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-slate-200 dark:border-[#1e293b] text-slate-500 dark:text-slate-400 text-xs uppercase tracking-widest px-5 py-2.5 rounded-md hover:border-violet-400/40 hover:text-violet-400 transition-colors"
            >
              GitHub →
            </a>
          </div>
        </div>
      </motion.div>

      {/* Project grid */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {projects.map((p) => (
          <motion.div
            key={p.title}
            variants={cardVariants}
            className="border border-slate-200 dark:border-[#1e293b] bg-black/[0.02] dark:bg-white/[0.02] rounded-xl overflow-hidden hover:-translate-y-1 hover:border-violet-400/30 transition-all duration-300"
          >
            <div
              className={`bg-gradient-to-br ${p.gradient} h-28 flex items-center justify-center text-4xl`}
            >
              {p.emoji}
            </div>
            <div className="p-5">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">{p.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[9px] text-slate-500 border border-slate-200 dark:border-[#1e293b] px-2 py-0.5 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-violet-400 hover:underline"
                >
                  Live ↗
                </a>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-slate-500 hover:text-violet-400"
                >
                  GitHub →
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Projects;
