'use client';

import { motion } from 'framer-motion';
import SectionTag from '../ui/SectionTag';

interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  tags: string[];
  current?: boolean;
}

const entries: ExperienceEntry[] = [
  {
    role: 'Sr. Software Test Engineer',
    company: 'Straumann Group',
    location: 'Chemnitz, Germany',
    period: '2023 – Present',
    description:
      'Leading V&V activities for medical software systems in a regulated environment. Driving test strategy, automation frameworks, and cross-team quality processes.',
    tags: ['V&V', 'Test Automation', 'Medical Software', 'ISTQB CTFL 4.0'],
    current: true,
  },
  {
    role: 'Software Test Engineer',
    company: 'Previous Company',
    location: 'Germany',
    period: '2021 – 2023',
    description:
      'End-to-end quality assurance across full SDLC. Manual and automated testing, BDD with Gherkin, REST API testing and CI/CD integration.',
    tags: ['Selenium', 'BDD / Gherkin', 'REST API', 'CI/CD'],
  },
  {
    role: 'QA Engineer',
    company: 'Multiple Companies',
    location: 'India & Europe',
    period: '2018 – 2021',
    description:
      'Functional, regression and integration testing across web and mobile platforms. Agile/Scrum teams, JIRA tracking, and stakeholder reporting.',
    tags: ['Manual Testing', 'Agile / Scrum', 'JIRA'],
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const Experience = () => (
  <section id="experience" className="px-6 lg:px-24 py-16 lg:py-24" style={{ background: 'var(--bg-secondary)' }}>
    <div className="max-w-5xl mx-auto">
      <SectionTag>Experience</SectionTag>
      <h2 className="text-white mb-3">
        Where I&apos;ve <span className="text-violet-400">worked</span>
      </h2>
      <p className="text-sm leading-relaxed max-w-md mb-12 text-white/35">
        6+ years of quality engineering across regulated industries and international teams.
      </p>

      <motion.div className="relative" variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
        {/* Vertical line */}
        <div className="absolute left-5 top-2 bottom-2 w-px"
          style={{ background: 'linear-gradient(to bottom, rgba(139,92,246,0.5), rgba(139,92,246,0.1), transparent)' }} />

        <div className="flex flex-col gap-6">
          {entries.map((entry) => (
            <motion.div key={entry.role + entry.company} variants={cardVariants} className="flex gap-4 sm:gap-8">
              {/* Dot */}
              <div className="flex flex-col items-center flex-shrink-0 pt-5 w-10">
                <div className="w-3 h-3 rounded-full relative z-10 flex-shrink-0"
                  style={entry.current
                    ? { background: 'linear-gradient(135deg, #7c3aed, #a78bfa)', boxShadow: '0 0 12px rgba(139,92,246,0.6)', border: '2px solid rgba(167,139,250,0.4)' }
                    : { background: 'rgba(139,92,246,0.25)', border: '2px solid rgba(139,92,246,0.2)' }} />
              </div>

              {/* Card */}
              <div className="flex-1 relative rounded-2xl px-4 sm:px-6 py-4 sm:py-5 overflow-hidden"
                style={entry.current
                  ? { background: 'rgba(139,92,246,0.05)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(139,92,246,0.2)' }
                  : { background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {/* Top highlight */}
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: entry.current
                    ? 'linear-gradient(to right, rgba(139,92,246,0.5), rgba(167,139,250,0.2), transparent)'
                    : 'linear-gradient(to right, transparent, rgba(167,139,250,0.2), transparent)' }} />

                <div className="flex items-start justify-between gap-3 mb-1 flex-wrap">
                  <h3 className="text-base font-bold text-white">{entry.role}</h3>
                  <span className="text-[9px] tracking-widest uppercase text-violet-400 flex-shrink-0 px-3 py-1 rounded-full"
                    style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)' }}>
                    {entry.period}
                  </span>
                </div>

                <p className="text-xs mb-3 text-violet-400/70">
                  {entry.company}
                  <span className="mx-2 opacity-30">·</span>
                  {entry.location}
                </p>

                <p className="text-xs leading-relaxed mb-4 text-white/35">
                  {entry.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <span key={tag} className="flex items-center gap-1.5 text-[10px] px-3 py-1 rounded-md text-white/35"
                      style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400/50 flex-shrink-0" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default Experience;
