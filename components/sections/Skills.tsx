'use client';

import { motion } from 'framer-motion';
import SectionTag from '../ui/SectionTag';

const categories = [
  {
    icon: '⚛️',
    label: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3'],
  },
  {
    icon: '🎨',
    label: 'Styling',
    skills: ['Tailwind CSS', 'Framer Motion', 'Styled Components', 'SASS', 'Figma'],
  },
  {
    icon: '🛠️',
    label: 'Tools & Other',
    skills: ['Git / GitHub', 'REST APIs', 'Node.js', 'Vercel', 'VS Code'],
  },
];

const alsoFamiliar = ['Redux', 'React Query', 'Firebase', 'MongoDB', 'PostgreSQL'];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const Skills = () => (
  <section
    id="skills"
    className="px-6 lg:px-24 py-24"
    style={{ background: '#080810' }}
  >
    <div className="max-w-5xl mx-auto">
      <SectionTag>Skills</SectionTag>
      <h2 className="text-white mb-3">
        What I <span className="text-violet-400">work with</span>
      </h2>
      <p className="text-sm text-slate-500 mb-12 max-w-md leading-relaxed">
        Technologies and tools I use to build production-ready web applications.
      </p>

      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {categories.map(({ icon, label, skills }) => (
          <motion.div
            key={label}
            variants={cardVariants}
            className="border rounded-2xl p-6"
            style={{
              background: 'rgba(167,139,250,0.04)',
              borderColor: 'rgba(167,139,250,0.1)',
            }}
          >
            <div className="flex items-center gap-2 text-violet-400 text-xs tracking-widest uppercase mb-5">
              <span>{icon}</span>
              {label}
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center gap-1.5 text-xs text-slate-400 border border-[#1e293b] bg-white/[0.03] px-3 py-1.5 rounded-md hover:border-violet-400/40 hover:text-slate-200 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400/60" />
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-10 pt-8 border-t border-[#1e293b] flex flex-wrap items-center gap-3">
        <span className="text-[10px] text-slate-600 uppercase tracking-widest whitespace-nowrap">
          Also familiar with
        </span>
        {alsoFamiliar.map((tech) => (
          <span
            key={tech}
            className="text-xs text-slate-500 border border-[#1e293b] bg-white/[0.03] px-3 py-1 rounded"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
