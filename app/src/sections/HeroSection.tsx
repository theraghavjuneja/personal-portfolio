import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import MorphingShape from '@/components/MorphingShape';
import { Send, ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─── Chat bot logic ───────────────────────────────────────────── */
interface ChatMessage {
  id: number;
  from: 'bot' | 'user';
  text: string;
  isLink?: { label: string; href: string };
}

const PILL_ACTIONS = [
  { label: 'see my work ↓', id: 'work' },
  { label: "what's your stack?", id: 'stack' },
  { label: 'how do you build?', id: 'build' },
  { label: 'open to work? 🟢', id: 'hire' },
  { label: 'GitHub ↗', id: 'github' },
  { label: 'LinkedIn ↗', id: 'linkedin' },
];

const BOT_RESPONSES: Record<string, string | { text: string; link?: { label: string; href: string }; scroll?: string }> = {
  work: { text: "Scrolling you there now ↓", scroll: '#work' },
  stack: "Node.js · Go · PostgreSQL · Redis · Kafka · Docker · AWS — the usual suspects for building things that don't fall over.",
  build: "I start from the data model, reason about failure modes, then build outward. Clean contracts, observable systems, ruthless simplicity.",
  hire: { text: "Yes! Open to senior backend / infra roles. Drop me a line — raghav@lexipitch.com", link: { label: 'raghav@lexipitch.com', href: 'mailto:raghav@lexipitch.com' } },
  github: { text: "Opening GitHub ↗", link: { label: 'github.com/raghavjuneja', href: 'https://github.com' } },
  linkedin: { text: "Opening LinkedIn ↗", link: { label: 'linkedin.com/in/raghavjuneja', href: 'https://linkedin.com' } },
};

function getBotReply(input: string): ChatMessage['text'] | { text: string; link?: { label: string; href: string }; scroll?: string } {
  const lower = input.toLowerCase();
  if (lower.includes('stack') || lower.includes('tech') || lower.includes('language') || lower.includes('tool'))
    return BOT_RESPONSES.stack;
  if (lower.includes('build') || lower.includes('architect') || lower.includes('approach') || lower.includes('process'))
    return BOT_RESPONSES.build;
  if (lower.includes('hire') || lower.includes('open') || lower.includes('available') || lower.includes('work') || lower.includes('job') || lower.includes('role'))
    return BOT_RESPONSES.hire;
  if (lower.includes('github') || lower.includes('code') || lower.includes('repo'))
    return BOT_RESPONSES.github;
  if (lower.includes('linkedin') || lower.includes('connect') || lower.includes('contact'))
    return BOT_RESPONSES.linkedin;
  return "Honest answer — I'm better at writing systems than answering chatbots. Ping me directly at raghav@lexipitch.com and I'll actually reply.";
}

let msgId = 10;

/* ─── Chat panel component ─────────────────────────────────────── */
function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      from: 'bot',
      text: "Hey! I'm Raghav — backend engineer, systems thinker. Ask me anything or pick a quick one below 👇",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  const addBotReply = useCallback((raw: ReturnType<typeof getBotReply>, scrollTarget?: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      if (typeof raw === 'string') {
        setMessages(prev => [...prev, { id: ++msgId, from: 'bot', text: raw }]);
      } else {
        setMessages(prev => [...prev, { id: ++msgId, from: 'bot', text: raw.text, isLink: raw.link }]);
        if (raw.scroll || scrollTarget) {
          setTimeout(() => {
            document.querySelector(raw.scroll || scrollTarget || '#work')?.scrollIntoView({ behavior: 'smooth' });
          }, 600);
        }
        if (raw.link && (raw.link.href.startsWith('http'))) {
          setTimeout(() => window.open(raw.link!.href, '_blank', 'noopener'), 700);
        }
      }
    }, 850);
  }, []);

  const handlePill = useCallback((pillId: string) => {
    const pill = PILL_ACTIONS.find(p => p.id === pillId)!;
    setMessages(prev => [...prev, { id: ++msgId, from: 'user', text: pill.label }]);
    const resp = BOT_RESPONSES[pillId];
    addBotReply(resp as ReturnType<typeof getBotReply>);
  }, [addBotReply]);

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages(prev => [...prev, { id: ++msgId, from: 'user', text: trimmed }]);
    setInput('');
    addBotReply(getBotReply(trimmed));
  }, [input, addBotReply]);

  return (
    <div className="studio-chat">
      {/* Header */}
      <div className="studio-chat__header">
        <div className="studio-chat__avatar">R</div>
        <div>
          <p className="studio-chat__name">Raghav Juneja</p>
          <span className="studio-chat__status">
            <span className="studio-chat__dot" />
            online
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="studio-chat__messages">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`studio-chat__bubble studio-chat__bubble--${msg.from}`}
          >
            {msg.text}
            {msg.isLink && (
              <a
                href={msg.isLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="studio-chat__link"
              >
                {msg.isLink.label}
              </a>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="studio-chat__bubble studio-chat__bubble--bot studio-chat__typing">
            <span /><span /><span />
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick pills */}
      <div className="studio-chat__pills">
        {PILL_ACTIONS.map(pill => (
          <button
            key={pill.id}
            className="studio-pill"
            onClick={() => handlePill(pill.id)}
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="studio-chat__input-row">
        <input
          className="studio-chat__input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="ask Raghav anything..."
          aria-label="Chat with Raghav"
        />
        <button
          className="studio-chat__send"
          onClick={handleSend}
          aria-label="Send"
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
}

/* ─── Main section ─────────────────────────────────────────────── */
export default function HeroSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const imgRef      = useRef<HTMLDivElement>(null);
  const chatRef     = useRef<HTMLDivElement>(null);
  const shapesRef   = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const ease = 'power3.out';

      /* Left side: headline words clip up */
      const words = headlineRef.current?.querySelectorAll('.studio-word');
      if (words) {
        gsap.from(words, {
          y: '110%', opacity: 0, duration: 0.7, stagger: 0.07, ease,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });
      }

      /* Image slides up */
      gsap.from(imgRef.current, {
        y: 50, opacity: 0, duration: 1, ease,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      /* Chat panel fades in from right */
      gsap.from(chatRef.current, {
        x: 50, opacity: 0, duration: 0.85, ease, delay: 0.25,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          toggleActions: 'play none none none',
        },
      });

      /* Shapes */
      const shapeEls = shapesRef.current?.children;
      if (shapeEls) {
        gsap.from(shapeEls, {
          opacity: 0, scale: 0.6, duration: 0.8, stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 68%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="studio"
      className="relative overflow-hidden"
      style={{ background: '#111111' }}
    >
      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          opacity: 0.55,
        }}
      />

      {/* Decorative shapes */}
      <div ref={shapesRef} className="absolute inset-0 pointer-events-none z-10">
        <MorphingShape type="spiral"    color="#C8563B" size={80}  className="absolute top-12  left-[48%]" />
        <MorphingShape type="starburst" color="#3A7056" size={56}  className="absolute bottom-16 left-[52%]" />
        <MorphingShape type="waves"     color="#E2A74F" size={60}  className="absolute top-[40%] right-6" />
      </div>

      {/* ── Two-column layout ───────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row min-h-screen">

        {/* LEFT: Studio visual */}
        <div className="relative lg:w-[55%] w-full flex flex-col justify-end overflow-hidden">

          {/* Hero illustration fills the whole panel */}
          <div
            ref={imgRef}
            className="absolute inset-0"
          >
            <img
              src="/images/hero-illustration.png"
              alt="Raghav at work — developer setup"
              className="w-full h-full object-cover object-center"
              style={{ opacity: 0.55 }}
            />
            {/* Dark overlay so text is legible */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, #111 10%, rgba(17,17,17,0.45) 55%, rgba(17,17,17,0.15) 100%)',
              }}
            />
            {/* Right edge fade into chat panel */}
            <div
              className="absolute inset-y-0 right-0 w-24 hidden lg:block"
              style={{ background: 'linear-gradient(to right, transparent, #111111)' }}
            />
          </div>

          {/* Headline overlaid at bottom-left */}
          <div className="relative z-20 px-8 sm:px-12 lg:px-16 pb-16 pt-48 lg:pt-0">

            {/* Eyebrow */}
            <p className="studio-eyebrow">A glimpse of the studio.</p>

            {/* Headline */}
            <div ref={headlineRef} className="studio-headline-wrap">
              {[
                'Where systems',
                'get built.',
              ].map((line, li) => (
                <div key={li} className="overflow-hidden leading-[1.0]">
                  {line.split(' ').map((word, wi) => (
                    <span
                      key={wi}
                      className="studio-word"
                      style={{ marginRight: '0.28em' }}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              ))}
            </div>

            {/* Mini stats row */}
            <div className="flex items-center gap-6 mt-8">
              {[
                ['3+', 'years exp'],
                ['12+', 'projects'],
                ['4', 'open-source'],
              ].map(([val, lbl]) => (
                <div key={lbl}>
                  <p className="studio-stat-val">{val}</p>
                  <p className="studio-stat-lbl">{lbl}</p>
                </div>
              ))}
              <a
                href="#work"
                onClick={e => {
                  e.preventDefault();
                  document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="studio-scroll-hint ml-auto"
                aria-label="Scroll to work"
              >
                <ArrowDown size={16} />
                <span>scroll</span>
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT: Chat panel */}
        <div
          ref={chatRef}
          className="lg:w-[45%] w-full flex items-center justify-center
                     px-6 sm:px-10 lg:px-12 py-16 lg:py-20"
          style={{ background: '#111111' }}
        >
          <ChatPanel />
        </div>
      </div>

      {/* ── Inline styles ────────────────────────────────────────── */}
      <style>{`
        /* ── Eyebrow ── */
        .studio-eyebrow {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.20em;
          text-transform: uppercase;
          color: #C8563B;
          margin: 0 0 18px;
        }

        /* ── Headline words ── */
        .studio-headline-wrap {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .studio-word {
          display: inline-block;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: clamp(42px, 6vw, 80px);
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.03em;
          line-height: 1.0;
          will-change: transform;
        }

        /* ── Stats ── */
        .studio-stat-val {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.03em;
          line-height: 1.0;
          margin: 0;
        }
        .studio-stat-lbl {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.38);
          margin: 3px 0 0;
        }

        /* ── Scroll hint ── */
        .studio-scroll-hint {
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          text-decoration: none;
          transition: color 0.2s;
        }
        .studio-scroll-hint:hover { color: rgba(255,255,255,0.65); }

        /* ══════════════════════════════════════════
           CHAT PANEL
           ══════════════════════════════════════════ */
        .studio-chat {
          width: 100%;
          max-width: 420px;
          display: flex;
          flex-direction: column;
          gap: 0;
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 20px;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          overflow: hidden;
        }

        /* Header */
        .studio-chat__header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.03);
        }
        .studio-chat__avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, #C8563B, #E2A74F);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 16px;
          font-weight: 800;
          color: #fff;
          flex-shrink: 0;
        }
        .studio-chat__name {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          margin: 0;
          line-height: 1.2;
        }
        .studio-chat__status {
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.4);
        }
        .studio-chat__dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #3A7056;
          animation: ab-dot-pulse 2.2s ease-in-out infinite;
        }

        /* Messages */
        .studio-chat__messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px 16px 8px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          max-height: 240px;
          min-height: 140px;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.1) transparent;
        }
        .studio-chat__bubble {
          max-width: 82%;
          padding: 10px 14px;
          border-radius: 16px;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 13px;
          line-height: 1.55;
          animation: bubbleIn 0.3s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        @keyframes bubbleIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .studio-chat__bubble--bot {
          align-self: flex-start;
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.82);
          border-bottom-left-radius: 4px;
        }
        .studio-chat__bubble--user {
          align-self: flex-end;
          background: #C8563B;
          color: #fff;
          border-bottom-right-radius: 4px;
        }
        .studio-chat__link {
          display: block;
          margin-top: 6px;
          color: #E2A74F;
          font-size: 12px;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        /* Typing indicator */
        .studio-chat__typing {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 12px 16px;
        }
        .studio-chat__typing span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.5);
          animation: typingDot 1.2s ease-in-out infinite;
        }
        .studio-chat__typing span:nth-child(2) { animation-delay: 0.2s; }
        .studio-chat__typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }

        /* Quick pills */
        .studio-chat__pills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          padding: 10px 16px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .studio-pill {
          padding: 6px 14px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.14);
          background: transparent;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 11.5px;
          font-weight: 500;
          color: rgba(255,255,255,0.62);
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
          white-space: nowrap;
        }
        .studio-pill:hover {
          border-color: #C8563B;
          color: #fff;
          background: rgba(200,86,59,0.12);
        }

        /* Input row */
        .studio-chat__input-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 14px 14px;
          border-top: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
        }
        .studio-chat__input {
          flex: 1;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 100px;
          padding: 9px 16px;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.80);
          outline: none;
          transition: border-color 0.2s;
        }
        .studio-chat__input::placeholder { color: rgba(255,255,255,0.28); }
        .studio-chat__input:focus { border-color: rgba(200,86,59,0.5); }
        .studio-chat__send {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #C8563B;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          cursor: pointer;
          flex-shrink: 0;
          transition: background 0.2s, transform 0.2s;
        }
        .studio-chat__send:hover {
          background: #b8452c;
          transform: scale(1.07);
        }
      `}</style>
    </section>
  );
}