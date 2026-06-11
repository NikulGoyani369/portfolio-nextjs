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
    role: 'Verification and Validation Expert',
    company: 'Straumann Group',
    location: 'Chemnitz, Germany',
    period: 'Oct 2024 – Present',
    description:
      'Drive and execute V&V activities for software systems in regulated environments. Define, design, and perform manual and automated test cases to ensure software meets specified requirements. Act as technical point of contact for software quality, supporting continuous improvement across cross-functional teams.',
    tags: ['V&V', 'Test Automation', 'Regulated Environments', 'ISTQB CTFL 4.0', 'SDLC'],
    current: true,
  },
  {
    role: 'Software Developer',
    company: 'DEBAG Deutsche Backofenbau GmbH',
    location: 'Bautzen, Germany',
    period: 'Jul 2023 – Sep 2024',
    description:
      'Supported backend development, participated in code reviews, and performed bug fixing and backend optimisation. Programmed server logic, database queries, and REST API testing. Collaborated with frontend developers, designers, and project managers in an agile team.',
    tags: ['Backend Development', 'REST APIs', 'Agile / Scrum', 'Unit Testing', 'Code Review'],
  },
  {
    role: 'Frontend Web Developer',
    company: 'pure::variants',
    location: 'Magdeburg, Germany',
    period: 'Dec 2022 – May 2023',
    description:
      'Performed requirements analysis for web applications. Designed and implemented unit tests and E2E tests for components. Improved web-based components to enhance usability and overall user experience.',
    tags: ['React', 'TypeScript', 'Unit Testing', 'E2E Testing', 'Component Design'],
  },
  {
    role: 'Web Developer',
    company: 'INTERGATOR SMART SEARCH by interface projects GmbH',
    location: 'Dresden, Germany',
    period: 'Feb 2022 – Nov 2022',
    description:
      'Developed business logic and master components for scaling an enterprise search engine. Designed and implemented a comprehensive search application for efficient document search across large-scale enterprise environments.',
    tags: ['JavaScript', 'Frontend', 'Search Engine', 'Enterprise Apps', 'Web Components'],
  },
  {
    role: 'Software Developer & Web Developer',
    company: 'Impact Technology GmbH',
    location: 'Essen, Germany',
    period: 'Sep 2020 – Nov 2021',
    description:
      'Developed complex and distributed web applications including shopping cart components and UI wireframes. Worked across frontend and backend layers to deliver scalable product features.',
    tags: ['JavaScript', 'Frontend', 'Backend', 'UI/UX', 'Distributed Systems'],
  },
  {
    role: 'Software Engineer Intern',
    company: 'Intel Corporation',
    location: 'Munich, Germany',
    period: 'Oct 2018 – May 2019',
    description:
      'Frontend development for automatic data updates in connected components. Managed MySQL database, updated international datasets, and integrated data with frontend interfaces.',
    tags: ['Frontend', 'MySQL', 'Data Integration', 'JavaScript'],
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const Experience = () => (
  <section id="experience" className="dots px-6 lg:px-24 py-16 lg:py-24" style={{ backgroundColor: 'var(--bg-secondary)' }}>
    <div className="max-w-5xl mx-auto">
      <SectionTag>Experience</SectionTag>
      <h2 className="text-white mb-3">
        Where I&apos;ve <span className="text-violet-400">worked</span>
      </h2>
      <p className="text-sm leading-relaxed max-w-md mb-12 text-white/35">
        6+ years across quality engineering, software development, and V&amp;V in regulated environments across Germany.
      </p>

      <motion.div className="relative" variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
        {/* Vertical line */}
        <div className="absolute left-5 top-2 bottom-2 w-px"
          style={{ background: 'linear-gradient(to bottom, rgba(139,92,246,0.5), rgba(139,92,246,0.1), transparent)' }} />

        <div className="flex flex-col gap-5">
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
              <div className="card-glow flex-1 relative rounded-2xl px-4 sm:px-6 py-4 sm:py-5 overflow-hidden"
                style={entry.current
                  ? { background: 'rgba(139,92,246,0.05)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(139,92,246,0.2)' }
                  : { background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {/* Top highlight */}
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: entry.current
                    ? 'linear-gradient(to right, rgba(139,92,246,0.5), rgba(167,139,250,0.2), transparent)'
                    : 'linear-gradient(to right, transparent, rgba(167,139,250,0.2), transparent)' }} />

                <div className="flex items-start justify-between gap-3 mb-1 flex-wrap">
                  <h3 className="text-sm sm:text-base font-bold text-white">{entry.role}</h3>
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
