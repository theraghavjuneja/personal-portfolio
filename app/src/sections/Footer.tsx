import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import MorphingShape from '@/components/MorphingShape';

gsap.registerPlugin(ScrollTrigger);

/* ─── Live clock ──────────────────────────────────────────── */
function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const h = time.getHours().toString().padStart(2, '0');
  const m = time.getMinutes().toString().padStart(2, '0');
  const s = time.getSeconds().toString().padStart(2, '0');
  const ampm = time.getHours() >= 12 ? 'P.M.' : 'A.M.';
  return (
    <>
      <p className="ft-label">LOCAL TIME, IN</p>
      <p className="ft-clock">{h}:{m}:{s} <span className="ft-clock-ampm">{ampm}</span></p>
      <p className="ft-sub">IST · UTC+5:30</p>
    </>
  );
}

/* ─── Scattered card data ─────────────────────────────────── */
const cards: {
  id: string;
  content: React.ReactNode;
  pos: React.CSSProperties;
  w?: number;
  dark?: boolean;
  accent?: string;
}[] = [
  /* ── Top-left: Profile ── */
  {
    id: 'profile',
    w: 160,
    pos: { top: '6%', left: '4%', transform: 'rotate(-4deg)' },
    content: (
      <>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #C8563B, #E2A74F)', margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
          R
        </div>
        <p className="ft-card-name">Raghav Juneja</p>
        <p className="ft-sub" style={{ textAlign: 'center' }}>India</p>
      </>
    ),
  },
  /* ── Top-center-left: Clock ── */
  {
    id: 'clock',
    w: 190,
    pos: { top: '3%', left: '28%', transform: 'rotate(2deg)' },
    content: <LiveClock />,
  },
  /* ── Top-right: Book a call ── */
  {
    id: 'cta',
    w: 170,
    dark: true,
    pos: { top: '8%', right: '22%', transform: 'rotate(3deg)' },
    content: (
      <a href="mailto:raghav@example.com" className="ft-cta-link">
        <p className="ft-label" style={{ color: 'rgba(255,255,255,0.4)' }}>OPEN TO WORK</p>
        <p className="ft-cta-icon">📬</p>
        <p className="ft-cta-title">Book a call</p>
        <p className="ft-sub" style={{ color: 'rgba(255,255,255,0.45)' }}>Schedule 30 min</p>
      </a>
    ),
  },
  /* ── Far top-right: Role card ── */
  {
    id: 'role',
    w: 180,
    pos: { top: '2%', right: '2%', transform: 'rotate(-2deg)' },
    accent: 'rgba(58,112,86,0.08)',
    content: (
      <>
        <div className="ft-avail-row"><div className="ft-avail-dot" /><span style={{ fontFamily: "'DM Sans'", fontSize: 10, fontWeight: 700, color: '#3A7056', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Available Now</span></div>
        <p style={{ fontFamily: "'DM Sans'", fontSize: 16, fontWeight: 800, color: '#1a1a1a', marginTop: 10, lineHeight: 1.2 }}>Backend<br />Engineer</p>
        <p className="ft-sub" style={{ marginTop: 6 }}>→ India, Remote<br />→ Freelance &amp; Full-time</p>
      </>
    ),
  },
  /* ── Left middle: Fun fact ── */
  {
    id: 'fun',
    w: 170,
    pos: { top: '48%', left: '2%', transform: 'rotate(-3deg)' },
    accent: 'rgba(226,167,79,0.1)',
    content: (
      <>
        <p className="ft-label" style={{ color: '#E2A74F' }}>FUN FACT</p>
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', fontSize: 14, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.5, marginTop: 4 }}>
          Currently learning<br />French for fun 🇫🇷
        </p>
      </>
    ),
  },
  /* ── Bottom-left: Interests ── */
  {
    id: 'interests',
    w: 195,
    pos: { bottom: '10%', left: '3%', transform: 'rotate(2deg)' },
    content: (
      <>
        <p className="ft-label">INTERESTS</p>
        <div className="ft-tags">
          {['Systems', 'Cloud', 'Music', 'Reading', 'Nature', 'AI/ML'].map(t => (
            <span key={t} className="ft-tag">{t}</span>
          ))}
        </div>
      </>
    ),
  },
  /* ── Right middle: Resume ── */
  {
    id: 'resume',
    w: 140,
    pos: { top: '50%', right: '3%', transform: 'rotate(4deg)' },
    accent: 'rgba(226,167,79,0.12)',
    content: (
      <div style={{ textAlign: 'center' }}>
        <p className="ft-label">CV</p>
        <p style={{ fontFamily: "'DM Sans'", fontSize: 18, fontWeight: 800, color: '#1a1a1a' }}>Resume</p>
        <p className="ft-sub">PDF · 1 page</p>
      </div>
    ),
  },
  /* ── Bottom-center-left: Connect ── */
  {
    id: 'connect',
    w: 150,
    pos: { bottom: '6%', left: '30%', transform: 'rotate(-2deg)' },
    content: (
      <>
        <p className="ft-label">FIND ME ONLINE</p>
        <div className="ft-link-col">
          {[
            { l: 'LinkedIn', h: 'https://linkedin.com', i: 'in' },
            { l: 'GitHub', h: 'https://github.com', i: '⌘' },
          ].map(link => (
            <a key={link.l} href={link.h} target="_blank" rel="noopener noreferrer" className="ft-link">
              <span className="ft-link-icon">{link.i}</span>{link.l}
            </a>
          ))}
        </div>
      </>
    ),
  },
  /* ── Bottom-right: Currently ── */
  {
    id: 'currently',
    w: 180,
    dark: true,
    pos: { bottom: '8%', right: '6%', transform: 'rotate(-3deg)' },
    content: (
      <>
        <p className="ft-label" style={{ color: 'rgba(255,255,255,0.35)' }}>CURRENTLY</p>
        <p style={{ fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.4 }}>
          backend engineer<br />@ Lexipitch
        </p>
        <p className="ft-sub" style={{ color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>3+ yrs · 12+ projects</p>
      </>
    ),
  },
];

/* ═══════════════════════════════════════════════════════════════
   Footer component
   ═══════════════════════════════════════════════════════════════ */
export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { reducedMotion } = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Heading entrance
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          opacity: 0, scale: 0.92, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 75%', toggleActions: 'play none none none' },
        });
      }

      // Cards scatter in
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const angle = (i / cards.length) * Math.PI * 2;
        const fromX = Math.cos(angle) * 120;
        const fromY = Math.sin(angle) * 80;
        gsap.from(card, {
          opacity: 0, x: fromX, y: fromY, scale: 0.8,
          rotation: (Math.random() - 0.5) * 20,
          duration: 0.9, delay: i * 0.07,
          ease: 'back.out(1.4)',
          scrollTrigger: { trigger: footerRef.current, start: 'top 75%', toggleActions: 'play none none none' },
        });
      });
    }, footerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <footer ref={footerRef} id="contact">
      <style>{`
        /* ── Wrapper ─────────────────────────────────── */
        .ft-canvas {
          position: relative;
          min-height: 100vh;
          background: linear-gradient(160deg, #FAF0D6 0%, #F7DDD8 40%, #F4C2C2 100%);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── Center heading ──────────────────────────── */
        .ft-heading {
          position: relative;
          z-index: 5;
          text-align: center;
          padding: 0 24px;
          pointer-events: none;
        }
        .ft-heading h2 {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: clamp(44px, 8vw, 96px);
          font-weight: 800;
          letter-spacing: -3px;
          line-height: 1.02;
          color: #1a1a1a;
          margin: 0;
        }
        .ft-heading .accent {
          font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
          font-style: italic;
          font-weight: 600;
          color: #C8563B;
          letter-spacing: 0;
          font-size: 1.12em;
        }

        /* ── Scattered card ──────────────────────────── */
        .ft-card {
          position: absolute;
          z-index: 10;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.75);
          border-radius: 16px;
          padding: 18px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04);
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.35s ease;
          cursor: default;
        }
        .ft-card:hover {
          transform: translateY(-4px) scale(1.03) !important;
          box-shadow: 0 12px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06);
          z-index: 20;
        }
        .ft-card--dark {
          background: rgba(30, 30, 30, 0.92);
          border-color: rgba(255,255,255,0.08);
        }
        .ft-card--dark:hover {
          background: rgba(30, 30, 30, 1);
        }

        /* ── Typography helpers ──────────────────────── */
        .ft-label {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(30,30,30,0.38);
          margin-bottom: 6px;
        }
        .ft-sub {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 10px;
          color: rgba(30,30,30,0.4);
          line-height: 1.55;
          margin-top: 3px;
        }
        .ft-card-name {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #1a1a1a;
          text-align: center;
          margin-top: 4px;
        }

        /* ── Clock ───────────────────────────────────── */
        .ft-clock {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 26px;
          font-weight: 800;
          letter-spacing: -1px;
          color: #1a1a1a;
          line-height: 1.15;
        }
        .ft-clock-ampm {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
          opacity: 0.45;
        }

        /* ── Availability ────────────────────────────── */
        .ft-avail-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .ft-avail-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #3A7056;
          animation: ftPulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes ftPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(58,112,86,0.35); }
          50%       { box-shadow: 0 0 0 6px rgba(58,112,86,0); }
        }

        /* ── Tags ────────────────────────────────────── */
        .ft-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: 6px;
        }
        .ft-tag {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 9px;
          font-weight: 600;
          color: #555;
          background: rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 20px;
          padding: 3px 9px;
        }

        /* ── Links ───────────────────────────────────── */
        .ft-link-col {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 4px;
        }
        .ft-link {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: #1a1a1a;
          text-decoration: none;
          transition: color 0.2s;
        }
        .ft-link:hover { color: #C8563B; }
        .ft-link-icon {
          width: 24px; height: 24px;
          border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700;
          background: rgba(30,30,30,0.06);
          flex-shrink: 0;
          transition: background 0.2s, color 0.2s;
        }
        .ft-link:hover .ft-link-icon {
          background: #C8563B;
          color: white;
        }

        /* ── CTA link ────────────────────────────────── */
        .ft-cta-link {
          text-decoration: none;
          display: block;
          text-align: center;
        }
        .ft-cta-icon { font-size: 20px; margin: 4px 0; }
        .ft-cta-title {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: white;
        }

        /* ── Copyright ───────────────────────────────── */
        .ft-copyright {
          position: absolute;
          bottom: 20px;
          left: 0;
          right: 0;
          text-align: center;
          z-index: 5;
        }
        .ft-copyright-accent {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-style: italic;
          font-size: 13px;
          color: rgba(30,30,30,0.45);
          margin-bottom: 4px;
        }
        .ft-copyright-text {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 10px;
          color: rgba(30,30,30,0.3);
          letter-spacing: 0.02em;
        }

        /* ── Responsive: stack cards below heading on mobile ── */
        @media (max-width: 900px) {
          .ft-canvas {
            min-height: auto;
            padding: 60px 16px 80px;
            flex-direction: column;
          }
          .ft-heading { margin-bottom: 40px; }
          .ft-card {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            right: auto !important;
            bottom: auto !important;
            transform: none !important;
            width: 100% !important;
            max-width: 320px;
            margin: 6px auto;
          }
          .ft-mobile-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            width: 100%;
            max-width: 400px;
            margin: 0 auto;
          }
          .ft-mobile-grid .ft-card {
            max-width: none;
          }
          .ft-copyright {
            position: relative;
            margin-top: 32px;
          }
        }

        @media (max-width: 480px) {
          .ft-mobile-grid {
            grid-template-columns: 1fr;
            max-width: 300px;
          }
        }
      `}</style>

      <div className="ft-canvas">
        {/* Decorative shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <MorphingShape type="spiral" color="rgba(200,86,59,0.12)" size={110} className="absolute top-[12%] left-[18%]" />
          <MorphingShape type="blob" color="rgba(226,167,79,0.15)" size={85} className="absolute top-[20%] right-[32%]" />
          <MorphingShape type="starburst" color="rgba(58,112,86,0.1)" size={55} className="absolute bottom-[25%] left-[40%]" />
          <MorphingShape type="swirl" color="rgba(244,168,176,0.18)" size={65} className="absolute bottom-[15%] right-[30%]" />
        </div>

        {/* Center heading */}
        <div ref={headingRef} className="ft-heading">
          <h2>
            I build <span className="accent">and</span> ship.<br />Fast.
          </h2>
        </div>

        {/* Scattered cards — desktop: absolute, mobile: grid */}
        {/* On desktop these are absolutely positioned */}
        {/* On mobile they collapse into a grid via CSS */}
        <div className="hidden md:contents">
          {cards.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              className={`ft-card ${card.dark ? 'ft-card--dark' : ''}`}
              style={{
                width: card.w,
                ...card.pos,
                ...(card.accent ? { background: card.accent, borderColor: 'transparent' } : {}),
              }}
            >
              {card.content}
            </div>
          ))}
        </div>

        {/* Mobile fallback grid */}
        <div className="md:hidden ft-mobile-grid">
          {cards.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              className={`ft-card ${card.dark ? 'ft-card--dark' : ''}`}
              style={{
                ...(card.accent ? { background: card.accent, borderColor: 'transparent' } : {}),
              }}
            >
              {card.content}
            </div>
          ))}
        </div>

        {/* Bottom copyright */}
        <div className="ft-copyright">
          <p className="ft-copyright-accent">designed with care &amp; curiosity</p>
          <p className="ft-copyright-text">Raghav Juneja · All Rights Reserved © {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
