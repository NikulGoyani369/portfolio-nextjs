'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import SectionTag from '../ui/SectionTag';

const stats = [
  { value: '6+', label: 'Years exp.' },
  { value: '10+', label: 'Companies' },
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
  <section id="about" className="px-6 lg:px-24 py-16 lg:py-24" style={{ background: 'var(--bg-secondary)' }}>
    <div className="grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-16 items-center max-w-5xl mx-auto">
      <motion.div className="flex justify-center lg:justify-start"
        variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <div className="relative">
          <div className="w-[200px] h-[260px] overflow-hidden relative"
            style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)' }}>
            <Image src="/assets/Nirmalbhai.jpg" alt="Nikul Goyani" width={200} height={260} className="object-cover w-full h-full" />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, transparent 55%, rgba(109,40,217,0.35) 100%)' }} />
          </div>
          <div className="absolute -bottom-3 -right-3 flex items-center gap-2 whitespace-nowrap"
            style={{ background: 'rgba(10,10,26,0.92)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '100px', padding: '5px 12px', boxShadow: '0 4px 16px rgba(0,0,0,0.4)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" style={{ boxShadow: '0 0 6px #4ade80' }} />
            <span className="text-violet-400 text-[9px] tracking-widest uppercase">Open to Connect</span>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <SectionTag>About me</SectionTag>
        <h2 className="text-white mb-4">
          Passionate about <span className="text-violet-400">software quality</span>
        </h2>
        <p className="text-sm leading-relaxed mb-3 text-white/45">
          I&apos;m Nikulkumar Goyani, a{' '}
          <span className="text-white/75 font-medium">Senior Software Test Engineer and
          Verification &amp; Validation Expert</span>{' '}based in Chemnitz, Germany. With 6+ years of experience across
          regulated industries, I specialise in quality engineering, test automation, and ensuring software meets the
          highest standards.
        </p>
        <p className="text-sm leading-relaxed mb-6 text-white/45">
          Currently at{' '}
          <span className="text-white/75 font-medium">Straumann Group</span>, I drive V&amp;V
          activities for medical software systems. ISTQB CTFL 4.0 certified with a background spanning frontend
          development, backend testing, and full-cycle SDLC quality assurance. Fluent in English and German.
        </p>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {stats.map(({ value, label }) => (
            <div key={label} className="relative rounded-2xl p-4 text-center overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(to right, transparent, rgba(167,139,250,0.4), transparent)' }} />
              <span className="block text-2xl font-black text-violet-400">{value}</span>
              <span className="block text-[9px] uppercase tracking-widest mt-1 text-white/30">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Languages */}
        <div className="mb-6">
          <p className="text-[10px] uppercase tracking-widest mb-3 text-white/25">Languages</p>
          <div className="flex flex-col gap-3">
            {[
              { flag: '🇬🇧', language: 'English', level: 'Fluent', pct: 95 },
              { flag: '🇩🇪', language: 'German', level: 'B2 – Upper Intermediate', pct: 70 },
            ].map(({ flag, language, level, pct }) => (
              <div key={language} className="flex items-center gap-3">
                <span className="text-xl flex-shrink-0">{flag}</span>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-white/70">{language}</span>
                    <span className="text-[10px] text-violet-400/70">{level}</span>
                  </div>
                  <div className="h-1 rounded-full w-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
                    <div
                      className="h-1 rounded-full"
                      style={{ width: `${pct}%`, background: 'linear-gradient(to right, #7c3aed, #a78bfa)' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <a href="https://www.linkedin.com/in/nikulkumar-goyani/" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs text-violet-400 uppercase tracking-widest px-5 py-3 rounded-xl transition-colors hover:bg-violet-400/10"
          style={{ background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.25)' }}>
          View LinkedIn ↗
        </a>
      </motion.div>
    </div>
  </section>
);

export default About;
