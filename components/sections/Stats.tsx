'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
}

const STATS: Stat[] = [
  { value: 6,  suffix: '+', label: 'Years Experience',     sublabel: 'in quality engineering & V&V' },
  { value: 7,  suffix: '',  label: 'Projects Built',       sublabel: 'automation, APIs & web apps' },
  { value: 4,  suffix: '+', label: 'Test Frameworks',      sublabel: 'Selenium · Playwright · pytest · Jest' },
  { value: 1,  suffix: '',  label: 'ISTQB Certification',  sublabel: 'CTFL 4.0 — internationally recognised' },
];

function Counter({ value, suffix, active }: { value: number; suffix: string; active: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const total = 50;
    const tick = () => {
      frame++;
      setDisplay(Math.round((frame / total) * value));
      if (frame < total) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, value]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="px-6 lg:px-24 py-12"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="relative rounded-[18px] p-5 lg:p-6 overflow-hidden flex flex-col gap-1"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(139,92,246,0.15)',
                transitionDelay: `${i * 80}ms`,
              }}
            >
              {/* top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(to right, transparent, rgba(139,92,246,0.5), transparent)' }}
              />

              <div
                className="text-3xl lg:text-4xl font-black text-violet-400 leading-none mb-1 tabular-nums"
                style={{ fontVariantNumeric: 'tabular-nums' }}
              >
                <Counter value={stat.value} suffix={stat.suffix} active={inView} />
              </div>

              <div className="text-sm font-semibold text-white leading-snug">{stat.label}</div>
              <div className="text-[10px] text-white/30 leading-relaxed">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}