'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionTag from '../ui/SectionTag';
import { featuredProject, projects } from '../../src/data/projects';

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

        <div className={`bg-gradient-to-br ${featuredProject.gradient} min-h-[200px] flex items-center justify-center text-6xl relative overflow-hidden`}>
          <div className="absolute inset-0" style={gridLinePattern} />
          <span className="relative z-10">{featuredProject.emoji}</span>
        </div>

        <div className="p-8 flex flex-col justify-center">
          <span className="inline-block text-[9px] uppercase tracking-widest text-violet-400 px-3 py-1 rounded-full mb-4 w-fit"
            style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)' }}>
            ⭐ Featured Project
          </span>
          <h3 className="text-lg font-bold text-white mb-3">{featuredProject.title}</h3>
          <p className="text-xs leading-relaxed mb-4 text-white/40">{featuredProject.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {featuredProject.tech.map((t) => (
              <span key={t} className="text-[10px] px-2.5 py-1 rounded-md text-white/35"
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                {t}
              </span>
            ))}
          </div>
          <div className="flex gap-3 flex-wrap">
            {featuredProject.live !== '#' && (
              <a href={featuredProject.live} target="_blank" rel="noopener noreferrer"
                aria-label={`View ${featuredProject.title} live demo`}
                className="text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-lg text-white transition-all hover:brightness-110"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', border: '1px solid rgba(167,139,250,0.3)', boxShadow: '0 0 18px rgba(124,58,237,0.25)' }}>
                Live Demo ↗
              </a>
            )}
            <a href={featuredProject.github} target="_blank" rel="noopener noreferrer"
              aria-label={`View ${featuredProject.title} source code on GitHub`}
              className="text-xs uppercase tracking-widest px-5 py-2.5 rounded-lg transition-colors text-white/45 hover:text-violet-400"
              style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
              GitHub →
            </a>
            <Link href={`/projects/${featuredProject.slug}`}
              className="text-xs uppercase tracking-widest px-5 py-2.5 rounded-lg transition-colors text-violet-400 hover:bg-violet-400/10"
              style={{ border: '1px solid rgba(167,139,250,0.25)', background: 'rgba(167,139,250,0.06)' }}>
              Case Study →
            </Link>
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
              <div className="flex gap-4 items-center">
                {p.live !== '#' && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer"
                    aria-label={`View ${p.title} live demo`}
                    className="text-[10px] text-violet-400 hover:underline">Live ↗</a>
                )}
                <a href={p.github} target="_blank" rel="noopener noreferrer"
                  aria-label={`View ${p.title} source code on GitHub`}
                  className="text-[10px] transition-colors text-white/30 hover:text-violet-400">
                  GitHub →
                </a>
                <Link href={`/projects/${p.slug}`}
                  aria-label={`Read ${p.title} case study`}
                  className="text-[10px] text-violet-400/70 hover:text-violet-400 transition-colors ml-auto">
                  Case Study →
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Projects;