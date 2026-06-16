'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isGreeting?: boolean;
}

const GREETING: Message = {
  role: 'assistant',
  isGreeting: true,
  content: "Hi! I'm Nikul's AI assistant. Ask me anything about his experience, projects, certifications, or how to reach him.",
};

const INITIAL_SUGGESTIONS = [
  'What does Nikul specialise in?',
  'What projects has he built?',
  'Is he open to new opportunities?',
  'How can I contact him?',
];

const QUICK_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/NikulGoyani369',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nikulkumar-goyani/',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:gnikul39@gmail.com',
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

const FOLLOW_UP_MAP: { keywords: string[]; questions: string[] }[] = [
  {
    keywords: ['test', 'automation', 'selenium', 'playwright', 'pytest', 'qa', 'quality', 'v&v', 'verification'],
    questions: ['What test frameworks does he use?', 'Has he worked in CI/CD pipelines?', 'What industries has he tested in?'],
  },
  {
    keywords: ['project', 'built', 'developed', 'github', 'app', 'api', 'react', 'next'],
    questions: ['Does he have live project demos?', "What's his favourite project?", 'What tech stack does he prefer?'],
  },
  {
    keywords: ['experience', 'work', 'straumann', 'year', 'engineer', 'senior', 'professional', 'role'],
    questions: ['What industry does he work in?', 'Is he open to new opportunities?', "What's his educational background?"],
  },
  {
    keywords: ['contact', 'email', 'linkedin', 'reach', 'hire', 'available', 'open'],
    questions: ["What's his LinkedIn profile?", "What's the best way to reach him?", 'Is he open to freelance projects?'],
  },
  {
    keywords: ['skill', 'language', 'python', 'java', 'typescript', 'tech', 'stack', 'know'],
    questions: ['What certifications does he have?', 'Does he do frontend development?', "What's his strongest technical skill?"],
  },
  {
    keywords: ['certif', 'istqb', 'qualification', 'credential'],
    questions: ['What does ISTQB mean?', 'Does he plan to get more certifications?', 'How does this help in his work?'],
  },
  {
    keywords: ['education', 'university', 'degree', 'master', 'msc', 'thesis'],
    questions: ['What was his thesis about?', 'Where did he study?', 'How does his education relate to his work?'],
  },
];

function getFollowUps(text: string, asked: Set<string>): string[] {
  const lower = text.toLowerCase();
  const candidates: string[] = [];
  for (const { keywords, questions } of FOLLOW_UP_MAP) {
    if (keywords.some((k) => lower.includes(k))) candidates.push(...questions);
  }
  const filtered = [...new Set(candidates)].filter((q) => !asked.has(q));
  if (filtered.length >= 2) return filtered.slice(0, 3);
  const fallback = [
    'What projects has he built?',
    'Is he open to new opportunities?',
    'What certifications does he hold?',
    'How can I contact him?',
    'What tools does he use for test automation?',
  ].filter((q) => !asked.has(q));
  return [...new Set([...filtered, ...fallback])].slice(0, 3);
}

const TypingDots = () => (
  <span className="inline-flex gap-1 items-center h-4">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-violet-400/60 animate-bounce"
        style={{ animationDelay: `${i * 0.15}s` }}
      />
    ))}
  </span>
);

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);
  const askedRef = useRef<Set<string>>(new Set());
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, suggestions, streaming]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  const resetChat = () => {
    setMessages([GREETING]);
    setSuggestions([]);
    setInput('');
    askedRef.current = new Set();
  };

  const copyText = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 1500);
  };

  const send = async (text: string) => {
    if (!text.trim() || streaming) return;

    askedRef.current.add(text.trim());
    setSuggestions([]);

    const userMsg: Message = { role: 'user', content: text.trim() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');
    setStreaming(true);

    const assistantMsg: Message = { role: 'assistant', content: '' };
    setMessages([...next, assistantMsg]);

    const apiMessages = next
      .filter((m) => !m.isGreeting)
      .map(({ role, content }) => ({ role, content }));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        fullText += chunk;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: fullText };
          return updated;
        });
      }

      setSuggestions(getFollowUps(fullText, askedRef.current));
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          content: 'Something went wrong. Please try again.',
        };
        return updated;
      });
    } finally {
      setStreaming(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const showSuggestions = messages.length === 1 && messages[0].isGreeting;

  return (
    <>
      {/* Floating button with pulse ring */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-50">
        {!open && (
          <span className="absolute inset-0 rounded-full animate-ping opacity-30"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }} />
        )}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close AI chat' : 'Chat with AI about Nikul'}
          className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
            border: '1px solid rgba(167,139,250,0.4)',
            boxShadow: '0 0 28px rgba(124,58,237,0.5)',
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.svg key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}
                width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </motion.svg>
            ) : (
              <motion.svg key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}
                width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </motion.svg>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-4 sm:right-6 z-50 flex flex-col rounded-[22px] overflow-hidden"
            style={{
              bottom: '5.5rem',
              width: 'min(380px, calc(100vw - 2rem))',
              height: 'min(500px, calc(100dvh - 11rem))',
              background: 'rgba(9,9,18,0.96)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              border: '1px solid rgba(139,92,246,0.28)',
              boxShadow: '0 0 0 1px rgba(139,92,246,0.08), 0 0 60px rgba(109,40,217,0.18), 0 32px 64px rgba(0,0,0,0.6)',
            }}
          >
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(to right, transparent, rgba(139,92,246,0.6), transparent)' }} />

            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="relative flex-shrink-0">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: 'linear-gradient(135deg,#7c3aed,#6d28d9)', border: '1px solid rgba(167,139,250,0.3)' }}>
                  N
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2"
                  style={{ borderColor: 'rgba(9,9,18,1)' }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-white">Ask about Nikul</div>
                <div className="text-[10px] text-white/30 mt-0.5 truncate">Powered by Llama 3.3 · usually replies instantly</div>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button onClick={resetChat} aria-label="New chat"
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white/25 hover:text-white/60 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3.85" />
                  </svg>
                </button>
                <button onClick={() => setOpen(false)} aria-label="Close chat"
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white/25 hover:text-white/60 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
              {messages.map((m, i) => {
                const isLastAssistant = m.role === 'assistant' && i === messages.length - 1;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} gap-1.5`}
                  >
                    {/* Avatar for assistant */}
                    {m.role === 'assistant' && (
                      <div className="flex items-center gap-2 mb-0.5">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0"
                          style={{ background: 'linear-gradient(135deg,#7c3aed,#6d28d9)' }}>
                          N
                        </div>
                        <span className="text-[9px] text-white/20 uppercase tracking-widest">Nikul&apos;s AI</span>
                      </div>
                    )}

                    <div className="group relative">
                      <div
                        className={`max-w-[85%] rounded-[14px] px-3.5 py-2.5 text-xs leading-relaxed ${
                          m.role === 'user' ? 'text-white' : 'text-white/80'
                        }`}
                        style={
                          m.role === 'user'
                            ? { background: 'linear-gradient(135deg,#7c3aed,#6d28d9)', border: '1px solid rgba(167,139,250,0.25)' }
                            : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }
                        }
                      >
                        {m.content === '' && streaming && isLastAssistant ? (
                          <TypingDots />
                        ) : (
                          <>
                            {m.content}
                            {isLastAssistant && streaming && m.content !== '' && (
                              <span className="inline-block w-0.5 h-3 bg-violet-400 ml-0.5 animate-pulse align-middle" />
                            )}
                          </>
                        )}
                      </div>

                      {m.role === 'assistant' && !m.isGreeting && m.content && !streaming && (
                        <button
                          onClick={() => copyText(m.content, i)}
                          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white/40 hover:text-violet-400"
                          style={{ background: 'rgba(9,9,18,0.9)', border: '1px solid rgba(255,255,255,0.08)' }}
                          aria-label="Copy response"
                        >
                          {copied === i ? (
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          ) : (
                            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Initial suggestion chips */}
                    {m.isGreeting && showSuggestions && (
                      <div className="flex flex-col gap-1.5 w-full mt-1">
                        <p className="text-[9px] uppercase tracking-widest text-white/20 pl-1 mb-0.5">Quick questions</p>
                        {INITIAL_SUGGESTIONS.map((s, si) => (
                          <motion.button
                            key={s}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: 0.05 * si }}
                            onClick={() => send(s)}
                            className="text-left text-[11px] px-3.5 py-2.5 rounded-xl text-violet-300 hover:text-white transition-all"
                            style={{ background: 'rgba(139,92,246,0.07)', border: '1px solid rgba(139,92,246,0.16)' }}
                          >
                            {s}
                          </motion.button>
                        ))}
                      </div>
                    )}

                    {/* Follow-up suggestion chips */}
                    {isLastAssistant && !streaming && !m.isGreeting && suggestions.length > 0 && (
                      <div className="flex flex-col gap-1.5 w-full max-w-[85%] mt-1">
                        <p className="text-[9px] uppercase tracking-widest text-white/20 pl-1">You might ask</p>
                        {suggestions.map((s, si) => (
                          <motion.button
                            key={s}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.18, delay: si * 0.06 }}
                            onClick={() => send(s)}
                            className="text-left text-[10px] px-3 py-2 rounded-[10px] text-violet-300/80 hover:text-violet-200 transition-all"
                            style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.14)' }}
                          >
                            {s} →
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            {/* Quick action links */}
            <div className="flex gap-2 px-4 py-2.5 flex-shrink-0"
              style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              {QUICK_LINKS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[10px] text-white/35 hover:text-violet-400 transition-all hover:border-violet-400/30"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  {icon}
                  {label}
                </a>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-3 py-3 flex-shrink-0"
              style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything…"
                className="flex-1 bg-transparent text-xs text-white/70 outline-none placeholder-white/20 min-w-0"
                disabled={streaming}
              />
              <button
                type="submit"
                disabled={!input.trim() || streaming}
                aria-label="Send message"
                className="w-8 h-8 rounded-xl flex items-center justify-center transition-all disabled:opacity-25 hover:brightness-110 flex-shrink-0"
                style={{ background: 'linear-gradient(135deg,#7c3aed,#6d28d9)', border: '1px solid rgba(167,139,250,0.3)' }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}