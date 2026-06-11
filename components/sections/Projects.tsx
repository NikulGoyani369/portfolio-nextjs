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
    description: 'Full-stack REST API + CLI client for managing car manufacturers and models. Features offline-first sync — the CLI works locally when the server is down and auto-syncs on reconnection.',
    tech: ['TypeScript', 'Node.js', 'MongoDB', 'REST API'],
    live: '#',
    github: 'https://github.com/NikulGoyani369/car-management',
    gradient: 'from-[#1a1a2e] to-[#2d1b4e]',
    emoji: '🚗',
  },
  {
    title: 'Playwright Test Automation',
    description: 'Hands-on test automation suite using Playwright and TypeScript, covering browser automation, assertions, and end-to-end testing patterns — directly applied in professional V&V work.',
    tech: ['Playwright', 'TypeScript', 'E2E Testing', 'Node.js'],
    live: '#',
    github: 'https://github.com/NikulGoyani369/introduction-to-playwright',
    gradient: 'from-[#0f1f2e] to-[#1a3a4e]',
    emoji: '🎭',
  },
  {
    title: 'Master Thesis (Python)',
    description: 'Academic research project from the MSc in Computer Engineering at University of Duisburg-Essen. A Python-based system with 288 commits, combining data processing, analysis, and a web-based output layer.',
    tech: ['Python', 'HTML', 'Shell', 'Data Analysis'],
    live: '#',
    github: 'https://github.com/NikulGoyani369/Master_Thesis',
    gradient: 'from-[#1a2e1a] to-[#1a4e2d]',
    emoji: '🎓',
  },
  {
    title: 'Portfolio Website',
    description: 'Personal developer portfolio built with Next.js 13 App Router, TypeScript, and Framer Motion. Features dark-mode design, animated sections, EmailJS contact form, and OG image generation.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    live: '#',
    github: 'https://github.com/NikulGoyani369/portfolio-nextjs',
    gradient: 'from-[#1a1a2e] to-[#2a1040]',
    emoji: '🌐',
  },
  {
    title: 'Selenium Test Suite',
    description: 'Reusable test automation framework using Selenium WebDriver and Python. Covers login flows, form validation, and regression scenarios with structured reporting and CI-ready configuration.',
    tech: ['Python', 'Selenium', 'pytest', 'CI/CD'],
    live: '#',
    github: 'https://github.com/NikulGoyani369',
    gradient: 'from-[#0f1a2e] to-[#1a2e3a]',
    emoji: '🤖',
  },
  {
    title: 'REST API Testing Framework',
    description: 'API testing suite covering CRUD operations, authentication flows, and error handling for a Node.js backend. Validates response schemas, status codes, and edge cases with automated assertions.',
    tech: ['TypeScript', 'Node.js', 'REST API', 'Jest'],
    live: '#',
    github: 'https://github.com/NikulGoyani369',
    gradient: 'from-[#1e1a0f] to-[#2e2a1a]',
    emoji: '⚙️',
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

const gridLinePattern = {
  backgroundImage:
    'repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(139,92,246,0.04) 28px,rgba(139,92,246,0.04) 29px),repeating-linear-gradient(90deg,transparent,transparent 28px,rgba(139,92,246,0.04) 28px,rgba(139,92,246,0.04) 29px)',
};

const Projects = () => (
  <section id="projects" className="dots px-6 lg:px-24 py-16 lg:py-24" style={{ backgroundColor: 'var(--bg-secondary)' }}>
    <div className="max-w-5xl mx-auto">
      <div className="flex items-end justify-between mb-8 lg:mb-12 flex-wrap gap-4">
        <div>
          <SectionTag>Projects</SectionTag>
          <h2 className="text-white">
            Things I&apos;ve <span className="text-violet-400">worked on</span>
          </h2>
        </div>
        <a href="https://github.com/NikulGoyani369" target="_blank" rel="noopener noreferrer"
          className="text-xs text-violet-400 uppercase tracking-widest px-4 py-2.5 rounded-xl transition-colors hover:bg-violet-400/10"
          style={{ background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.25)' }}>
          View All on GitHub ↗
        </a>
      </div>

      {/* Featured */}
      <motion.div
        className="grid lg:grid-cols-[1.2fr_1fr] rounded-[22px] overflow-hidden mb-5 relative"
        style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(139,92,246,0.2)', boxShadow: '0 0 40px rgba(109,40,217,0.08)' }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute top-0 left-0 right-0 h-px z-10"
          style={{ background: 'linear-gradient(to right, rgba(139,92,246,0.6), rgba(167,139,250,0.2), transparent)' }} />

        <div className={`bg-gradient-to-br ${featured.gradient} min-h-[200px] flex items-center justify-center text-6xl relative overflow-hidden`}>
          <div className="absolute inset-0" style={gridLinePattern} />
          <span className="relative z-10">{featured.emoji}</span>
        </div>

        <div className="p-8 flex flex-col justify-center">
          <span className="inline-block text-[9px] uppercase tracking-widest text-violet-400 px-3 py-1 rounded-full mb-4 w-fit"
            style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)' }}>
            ⭐ Featured Project
          </span>
          <h3 className="text-lg font-bold text-white mb-3">{featured.title}</h3>
          <p className="text-xs leading-relaxed mb-4 text-white/40">
            {featured.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {featured.tech.map((t) => (
              <span key={t} className="text-[10px] px-2.5 py-1 rounded-md text-white/35"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                {t}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            <a href={featured.live} target="_blank" rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-lg text-white transition-all hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', border: '1px solid rgba(167,139,250,0.3)', boxShadow: '0 0 18px rgba(124,58,237,0.25)' }}>
              Live Demo ↗
            </a>
            <a href={featured.github} target="_blank" rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest px-5 py-2.5 rounded-lg transition-colors text-white/45 hover:border-violet-400/40 hover:text-violet-400"
              style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
              GitHub →
            </a>
          </div>
        </div>
      </motion.div>

      {/* Grid */}
      <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
        {projects.map((p) => (
          <motion.div key={p.title} variants={cardVariants}
            className="card-glow rounded-[18px] overflow-hidden hover:-translate-y-1 border border-white/[0.07]"
            style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
            <div className={`bg-gradient-to-br ${p.gradient} h-28 flex items-center justify-center text-4xl relative overflow-hidden`}>
              <div className="absolute inset-0"
                style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 18px,rgba(139,92,246,0.04) 18px,rgba(139,92,246,0.04) 19px),repeating-linear-gradient(90deg,transparent,transparent 18px,rgba(139,92,246,0.04) 18px,rgba(139,92,246,0.04) 19px)' }} />
              <span className="relative z-10">{p.emoji}</span>
            </div>
            <div className="p-5">
              <h3 className="text-sm font-bold text-white mb-2">{p.title}</h3>
              <p className="text-xs leading-relaxed mb-3 text-white/35">{p.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.tech.map((t) => (
                  <span key={t} className="text-[9px] px-2 py-0.5 rounded-md text-white/30"
                    style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-[10px] text-violet-400 hover:underline">Live ↗</a>
                <a href={p.github} target="_blank" rel="noopener noreferrer"
                  className="text-[10px] transition-colors text-white/30 hover:text-violet-400">
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
