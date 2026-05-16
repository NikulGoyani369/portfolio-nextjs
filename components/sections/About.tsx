'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import SectionTag from '../ui/SectionTag';

const stats = [
  { value: '6+', label: 'Years exp.' },
  { value: '9+', label: 'Companies' },
  { value: 'ISTQB', label: 'Certified' },
];

const fadeLeft = {
  hidden: { x: -40, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.6 } },
};

const fadeRight = {
  hidden: { x: 40, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.6 } },
};

const About = () => (
  <section
    id="about"
    className="px-6 lg:px-24 py-24"
    style={{ background: 'var(--bg-primary)' }}
  >
    <div className="grid lg:grid-cols-[1fr_1.3fr] gap-16 items-center max-w-5xl mx-auto">
      {/* Left: photo */}
      <motion.div
        className="flex justify-center lg:justify-start"
        variants={fadeLeft}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="relative">
          <div className="w-[220px] h-[280px] rounded-2xl border-2 border-violet-400/25 overflow-hidden bg-[#1e1e3f]">
            <Image
              src="/assets/NG.jpg"
              alt="Nikul Goyani"
              width={220}
              height={280}
              className="object-cover w-full h-full"
            />
          </div>
          <div
            className="absolute -bottom-4 -right-4 flex items-center gap-2 border border-violet-400/25 rounded-xl px-3 py-2 text-xs text-violet-400 tracking-wide whitespace-nowrap"
            style={{ background: 'var(--bg-primary)' }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_#4ade80]" />
            Available for work
          </div>
        </div>
      </motion.div>

      {/* Right: content */}
      <motion.div
        variants={fadeRight}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <SectionTag>About me</SectionTag>
        <h2 className="text-slate-900 dark:text-white mb-4">
          Passionate about{' '}
          <span className="text-violet-400">software quality</span>
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed mb-3">
          I&apos;m Nikulkumar Goyani, a Senior Software Test Engineer and
          Verification &amp; Validation Expert based in Chemnitz, Germany.
          With 6+ years of experience across regulated industries, I specialise
          in quality engineering, test automation, and ensuring software meets
          the highest standards.
        </p>
        <p className="text-sm text-slate-500 leading-relaxed mb-6">
          Currently at Straumann Group, I drive V&amp;V activities for medical
          software systems. ISTQB CTFL 4.0 certified with a background spanning
          frontend development, backend testing, and full-cycle SDLC quality
          assurance. Fluent in English and German.
        </p>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="border border-slate-200 dark:border-[#1e293b] rounded-xl p-4 text-center"
              style={{ background: 'rgba(167,139,250,0.04)' }}
            >
              <span className="block text-2xl font-black text-violet-400">{value}</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">
                {label}
              </span>
            </div>
          ))}
        </div>

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs text-violet-400 border border-violet-400/30 px-5 py-3 rounded-md hover:bg-violet-400/10 transition-colors uppercase tracking-widest"
        >
          Download Resume ↗
        </a>
      </motion.div>
    </div>
  </section>
);

export default About;
