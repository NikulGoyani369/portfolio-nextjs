'use client';

import { motion } from 'framer-motion';
import SectionTag from '../ui/SectionTag';

const categories = [
  {
    icon: '🧪',
    label: 'QA & Testing',
    skills: ['ISTQB CTFL 4.0', 'Test Automation', 'Manual Testing', 'Gherkin / BDD', 'V&V', 'Selenium'],
  },
  {
    icon: '💻',
    label: 'Development',
    skills: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'MySQL'],
  },
  {
    icon: '🛠️',
    label: 'Tools & Process',
    skills: ['Git / GitHub', 'JIRA', 'Agile / Scrum', 'REST APIs', 'CI/CD', 'VS Code'],
  },
];

const alsoFamiliar = ['Python', 'HTML5 / CSS3', 'Tailwind CSS', 'Figma', 'Cordova', 'Generative AI'];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const Skills = () => (
  <section id="skills" className="dots px-6 lg:px-24 py-16 lg:py-24" style={{ backgroundColor: 'var(--bg-primary)' }}>
    <div className="max-w-5xl mx-auto">
      <SectionTag>Skills</SectionTag>
      <h2 className="text-white mb-3">
        What I <span className="text-violet-400">work with</span>
      </h2>
      <p className="text-sm leading-relaxed max-w-md mb-12 text-white/35">
        Skills and tools I use to deliver quality engineering, test automation,
        and V&amp;V across regulated software environments.
      </p>

      <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
        {categories.map(({ icon, label, skills }) => (
          <motion.div key={label} variants={cardVariants}
            className="card-glow relative rounded-[18px] p-6 overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(to right, transparent, rgba(167,139,250,0.3), transparent)' }} />
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 flex items-center justify-center rounded-[10px] text-lg flex-shrink-0"
                style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)' }}>
                {icon}
              </div>
              <span className="text-xs font-semibold tracking-widest uppercase text-violet-400/80">
                {label}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors text-white/45 border border-white/[0.07] hover:border-violet-400/40"
                  style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400/60 flex-shrink-0" />
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-10 flex flex-wrap items-center gap-3 rounded-[14px] px-6 py-5"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <span className="text-[9px] uppercase tracking-widest whitespace-nowrap mr-2 text-white/20">
          Also familiar with
        </span>
        {alsoFamiliar.map((tech) => (
          <span key={tech} className="text-xs px-3 py-1 rounded-md text-white/30"
            style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
