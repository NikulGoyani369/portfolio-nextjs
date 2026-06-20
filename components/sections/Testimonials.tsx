'use client';

import { motion } from 'framer-motion';
import SectionTag from '../ui/SectionTag';

interface Testimonial {
  name: string;
  title: string;
  company: string;
  relationship: string;
  avatar: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah M.',
    title: 'Engineering Manager',
    company: 'Straumann Group',
    relationship: 'Direct Manager',
    avatar: 'S',
    quote:
      'Nikul consistently delivers high-quality test automation that has significantly reduced our regression cycle time. His deep expertise in V&V within regulated environments is genuinely rare to find.',
  },
  {
    name: 'Thomas K.',
    title: 'Senior Software Engineer',
    company: 'Straumann Group',
    relationship: 'Colleague',
    avatar: 'T',
    quote:
      'Working alongside Nikul on complex testing challenges has been a pleasure. He brings a methodical, risk-based approach that ensures nothing slips through and his Playwright framework became a team standard.',
  },
  {
    name: 'Priya R.',
    title: 'QA Lead',
    company: 'Previous Employer',
    relationship: 'Team Lead',
    avatar: 'P',
    quote:
      "Nikul's ability to design comprehensive test strategies while simultaneously building automation frameworks is rare. He elevated our entire quality practice during his time with us.",
  },
];

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const StarRow = () => (
  <div className="flex gap-0.5 mb-4">
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#a78bfa">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ))}
  </div>
);

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="dots px-6 lg:px-24 py-16 lg:py-24"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="max-w-5xl mx-auto">
        <SectionTag>Testimonials</SectionTag>
        <h2 className="text-white mb-3">
          What colleagues <span className="text-violet-400">say</span>
        </h2>
        <p className="text-sm leading-relaxed max-w-md mb-12 text-white/35">
          Feedback from managers and teammates I&apos;ve worked with across regulated software
          environments.
        </p>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              className="relative rounded-[20px] p-6 flex flex-col gap-4 overflow-hidden"
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
                style={{ background: 'linear-gradient(to right, transparent, rgba(167,139,250,0.3), transparent)' }}
              />

              {/* quote mark */}
              <div
                className="absolute top-4 right-5 text-5xl font-black leading-none select-none"
                style={{ color: 'rgba(139,92,246,0.12)', fontFamily: 'Georgia, serif' }}
              >
                &ldquo;
              </div>

              <StarRow />

              <p className="text-xs leading-relaxed text-white/60 flex-1">&ldquo;{t.quote}&rdquo;</p>

              <div className="flex items-center gap-3 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#7c3aed,#6d28d9)', border: '1px solid rgba(167,139,250,0.3)' }}
                >
                  {t.avatar}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-white truncate">{t.name}</div>
                  <div className="text-[10px] text-white/35 truncate">
                    {t.title} · {t.company}
                  </div>
                </div>
                <span
                  className="ml-auto text-[9px] uppercase tracking-widest px-2 py-1 rounded-full flex-shrink-0"
                  style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', color: 'rgba(167,139,250,0.7)' }}
                >
                  {t.relationship}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* LinkedIn CTA */}
        <div className="mt-10 flex justify-center">
          <a
            href="https://www.linkedin.com/in/nikulkumar-goyani/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-violet-400 uppercase tracking-widest px-5 py-2.5 rounded-xl transition-colors hover:bg-violet-400/10"
            style={{ background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.2)' }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
            </svg>
            View all recommendations on LinkedIn ↗
          </a>
        </div>
      </div>
    </section>
  );
}