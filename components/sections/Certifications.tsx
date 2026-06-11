'use client';

import { motion } from 'framer-motion';
import SectionTag from '../ui/SectionTag';

interface Cert {
  title: string;
  issuer: string;
  year: string;
  credential?: string;
  tags: string[];
  icon: string;
  highlight?: boolean;
}

const certs: Cert[] = [
  {
    title: 'ISTQB Certified Tester Foundation Level 4.0',
    issuer: 'ISTQB – International Software Testing Qualifications Board',
    year: '2024',
    tags: ['Software Testing', 'Test Design', 'Quality Assurance', 'SDLC'],
    icon: '🏅',
    highlight: true,
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

const Certifications = () => (
  <section id="certifications" className="dots px-6 lg:px-24 py-16 lg:py-24" style={{ backgroundColor: 'var(--bg-primary)' }}>
    <div className="max-w-5xl mx-auto">
      <SectionTag>Certifications</SectionTag>
      <h2 className="text-white mb-3">
        Credentials &amp; <span className="text-violet-400">Qualifications</span>
      </h2>
      <p className="text-sm leading-relaxed max-w-md mb-12 text-white/35">
        Professional certifications validating expertise in software testing, quality engineering, and agile methodologies.
      </p>

      <motion.div
        className="grid gap-5 max-w-sm"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {certs.map((cert) => (
          <motion.div
            key={cert.title}
            variants={cardVariants}
            className="card-glow relative rounded-[18px] p-6 overflow-hidden flex flex-col gap-4"
            style={
              cert.highlight
                ? { background: 'rgba(139,92,246,0.06)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(139,92,246,0.25)' }
                : { background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.07)' }
            }
          >
            {/* Top highlight line */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: cert.highlight
                  ? 'linear-gradient(to right, rgba(139,92,246,0.6), rgba(167,139,250,0.3), transparent)'
                  : 'linear-gradient(to right, transparent, rgba(167,139,250,0.2), transparent)',
              }}
            />

            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)' }}
              >
                {cert.icon}
              </div>
              {cert.highlight && (
                <span
                  className="text-[9px] uppercase tracking-widest text-violet-400 px-2.5 py-1 rounded-full flex-shrink-0"
                  style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)' }}
                >
                  ✓ Certified
                </span>
              )}
            </div>

            {/* Content */}
            <div className="flex flex-col gap-1 flex-1">
              <h3 className="text-sm font-bold text-white leading-snug">{cert.title}</h3>
              <p className="text-xs text-violet-400/70">{cert.issuer}</p>
              <p className="text-[10px] text-white/25 mt-1">{cert.year}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {cert.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] px-2 py-0.5 rounded-md text-white/30"
                  style={{ border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Certifications;