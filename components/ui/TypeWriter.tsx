'use client';

import { useState, useEffect } from 'react';

const phrases = [
  'Software Test Engineer',
  'V&V Expert',
  'Test Automation Engineer',
  'Quality Engineer',
];

const TYPING_SPEED   = 80;
const DELETING_SPEED = 45;
const PAUSE_TYPED    = 2000;
const PAUSE_DELETED  = 400;

const TypeWriter = () => {
  const [text, setText]           = useState('');
  const [index, setIndex]         = useState(0);
  const [deleting, setDeleting]   = useState(false);
  const [pausing, setPausing]     = useState(false);

  useEffect(() => {
    if (pausing) return;

    const current = phrases[index];

    if (!deleting && text === current) {
      setPausing(true);
      const t = setTimeout(() => { setDeleting(true); setPausing(false); }, PAUSE_TYPED);
      return () => clearTimeout(t);
    }

    if (deleting && text === '') {
      setPausing(true);
      const t = setTimeout(() => {
        setIndex((i) => (i + 1) % phrases.length);
        setDeleting(false);
        setPausing(false);
      }, PAUSE_DELETED);
      return () => clearTimeout(t);
    }

    const speed = deleting ? DELETING_SPEED : TYPING_SPEED;
    const t = setTimeout(() => {
      setText(deleting
        ? current.slice(0, text.length - 1)
        : current.slice(0, text.length + 1)
      );
    }, speed);

    return () => clearTimeout(t);
  }, [text, index, deleting, pausing]);

  return (
    <span>
      <span className="text-violet-400">{text}</span>
      <span
        className="inline-block w-[2px] h-[1em] bg-violet-400 ml-[2px] align-middle"
        style={{ animation: 'blink 1s step-end infinite' }}
      />
    </span>
  );
};

export default TypeWriter;