import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import MorphingShape from '@/components/MorphingShape';

gsap.registerPlugin(ScrollTrigger);

function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const h = time.getHours().toString().padStart(2, '0');
  const m = time.getMinutes().toString().padStart(2, '0');
  const s = time.getSeconds().toString().padStart(2, '0');
  const ampm = time.getHours() >= 12 ? 'PM' : 'AM';
  return (
    <>
      <p className="ft-label">LOCAL TIME</p>
      <p className="ft-clock">{h}:{m}:{s} <span className="ft-clock-ampm">{ampm}</span></p>
      <p className="ft-sub">IST · UTC+5:30</p>
    </>
  );
}

function StarRating() {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: 28 }}>🙏</p>
      <p className="ft-card-name" style={{ marginTop: 4 }}>Thanks!</p>
      <p className="ft-sub">{'★'.repeat(rating)} · noted.</p>
    </div>
  );
  return (
    <>
      <p className="ft-label">RATE MY PORTFOLIO</p>
      <div style={{ display: 'flex', gap: 4, margin: '8px 0' }}>
        {[1,2,3,4,5].map(n => (
          <button key={n} onClick={() => { setRating(n); setSubmitted(true); }}
            onMouseEnter={() => setHovered(n)} onMouseLeave={() => setHovered(0)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, lineHeight: 1,
              color: n <= (hovered || rating) ? '#E2A74F' : 'rgba(30,30,30,0.18)', transition: 'color 0.15s, transform 0.15s',
              transform: n <= hovered ? 'scale(1.25)' : 'scale(1)' }}>★</button>
        ))}
      </div>
      <p className="ft-sub">tap a star to rate</p>
    </>
  );
}

const STACK = ['Node.js', 'Go', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'AWS', 'TypeScript'];

const cards: {
  id: string;
  content: React.ReactNode;
  pos: React.CSSProperties;
  w?: number;
  dark?: boolean;
  accent?: string;
}[] = [
  {
    id: 'profile',
    w: 155,
    pos: { top: '5%', left: '5%', transform: 'rotate(-4deg)' },
    content: (
      <>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#C8563B,#E2A74F)', margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: '#fff' }}>R</div>
        <p className="ft-card-name">Raghav Juneja</p>
        <p className="ft-sub" style={{ textAlign: 'center' }}>India 🇮🇳</p>
      </>
    ),
  },
  {
    id: 'clock',
    w: 185,
    pos: { top: '4%', left: '25%', transform: 'rotate(2deg)' },
    content: <LiveClock />,
  },
  {
    id: 'rating',
    w: 168,
    pos: { top: '3%', left: '48%', transform: 'rotate(-2deg)' },
    accent: 'rgba(226,167,79,0.10)',
    content: <StarRating />,
  },
  {
    id: 'cta',
    w: 162,
    dark: true,
    pos: { top: '7%', right: '18%', transform: 'rotate(3deg)' },
    content: (
      <a href="mailto:raghav@lexipitch.com" className="ft-cta-link">
        <p className="ft-label" style={{ color: 'rgba(255,255,255,0.4)' }}>OPEN TO WORK</p>
        <p className="ft-cta-icon">📬</p>
        <p className="ft-cta-title">Book a call</p>
        <p className="ft-sub" style={{ color: 'rgba(255,255,255,0.42)' }}>Schedule 30 min</p>
      </a>
    ),
  },
  {
    id: 'role',
    w: 175,
    pos: { top: '4%', right: '2%', transform: 'rotate(-3deg)' },
    accent: 'rgba(58,112,86,0.08)',
    content: (
      <>
        <div className="ft-avail-row"><div className="ft-avail-dot" /><span style={{ fontFamily:"'DM Sans'", fontSize:10, fontWeight:700, color:'#3A7056', letterSpacing:'0.08em', textTransform:'uppercase' as const }}>Available Now</span></div>
        <p style={{ fontFamily:"'DM Sans'", fontSize:16, fontWeight:800, color:'#1a1a1a', marginTop:10, lineHeight:1.2 }}>Backend<br />Engineer</p>
        <p className="ft-sub" style={{ marginTop:6 }}>→ India, Remote<br />→ Freelance &amp; FT</p>
      </>
    ),
  },
  {
    id: 'glimpse',
    w: 175,
    dark: true,
    pos: { top: '42%', left: '2%', transform: 'rotate(-3deg)' },
    content: (
      <>
        <p className="ft-label" style={{ color: 'rgba(255,255,255,0.4)' }}>A GLIMPSE OF ME</p>
        <img src="/images/about-photo.png" alt="Raghav" style={{ width: '100%', borderRadius: 8, marginTop: 8, aspectRatio: '4/3', objectFit: 'cover' }} />
        <p className="ft-sub" style={{ color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>just vibing </p>
      </>
    ),
  },
  {
    id: 'stack',
    w: 190,
    pos: { top: '40%', left: '20%', transform: 'rotate(2deg)' },
    content: (
      <>
        <p className="ft-label">MY STACK</p>
        <div className="ft-tags" style={{ marginTop: 8 }}>
          {STACK.map(t => <span key={t} className="ft-tag">{t}</span>)}
        </div>
      </>
    ),
  },
  {
    id: 'fun',
    w: 162,
    pos: { top: '55%', left: '3%', transform: 'rotate(3deg)' },
    accent: 'rgba(244,168,176,0.18)',
    content: (
      <>
        <p className="ft-label" style={{ color: '#C8563B' }}>FUN FACT</p>
        <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontStyle:'italic', fontSize:14, fontWeight:600, color:'#1a1a1a', lineHeight:1.5, marginTop:4 }}>
          i love<br />animals
        </p>
      </>
    ),
  },
  {
    id: 'connect',
    w: 150,
    pos: { top: '44%', right: '20%', transform: 'rotate(-2deg)' },
    content: (
      <>
        <p className="ft-label">FIND ME ONLINE</p>
        <div className="ft-link-col">
          {[
            { l: 'LinkedIn', h: 'https://linkedin.com', i: 'in' },
            { l: 'GitHub',   h: 'https://github.com',  i: '⌘' },
            { l: 'Twitter',  h: 'https://twitter.com', i: '𝕏' },
          ].map(link => (
            <a key={link.l} href={link.h} target="_blank" rel="noopener noreferrer" className="ft-link">
              <span className="ft-link-icon">{link.i}</span>{link.l}
            </a>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'resume',
    w: 140,
    pos: { top: '40%', right: '3%', transform: 'rotate(4deg)' },
    accent: 'rgba(226,167,79,0.12)',
    content: (
      <div style={{ textAlign: 'center' }}>
        <p className="ft-label">CV</p>
        <p style={{ fontFamily:"'DM Sans'", fontSize:20, fontWeight:800, color:'#1a1a1a', marginBottom:2 }}>Resume</p>
        <p className="ft-sub">PDF · 1 page ↗</p>
      </div>
    ),
  },
  {
    id: 'interests',
    w: 190,
    pos: { bottom: '14%', left: '3%', transform: 'rotate(-2deg)' },
    content: (
      <>
        <p className="ft-label">INTERESTS</p>
        <div className="ft-tags">
          {['Systems', 'Cloud', 'Music', 'Reading', 'Nature', 'AI/ML', 'OSS'].map(t => (
            <span key={t} className="ft-tag">{t}</span>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'currently',
    w: 178,
    dark: true,
    pos: { bottom: '10%', right: '4%', transform: 'rotate(-3deg)' },
    content: (
      <>
        <p className="ft-label" style={{ color: 'rgba(255,255,255,0.35)' }}>CURRENTLY</p>
        <p style={{ fontFamily:"'DM Sans'", fontSize:13, fontWeight:700, color:'#fff', lineHeight:1.4 }}>
          backend engineer<br />@ Lexipitch
        </p>
        <p className="ft-sub" style={{ color:'rgba(255,255,255,0.4)', marginTop:6 }}>3+ yrs · 12+ projects</p>
      </>
    ),
  },
  {
    id: 'quote',
    w: 200,
    pos: { bottom: '12%', left: '24%', transform: 'rotate(2deg)' },
    accent: 'rgba(200,86,59,0.07)',
    content: (
      <>
        <p className="ft-label" style={{ color: '#C8563B' }}>MOTTO</p>
        <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontStyle:'italic', fontSize:15, fontWeight:600, color:'#1a1a1a', lineHeight:1.5, marginTop:6 }}>
          "Ship it, measure it,<br />then make it beautiful."
        </p>
      </>
    ),
  },
];

export default function Footer() {
  const footerRef  = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<(HTMLDivElement | null)[]>([]);
  const { reducedMotion } = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Heading scale-in
      gsap.from(headingRef.current, {
        opacity: 0, scale: 0.88, y: 24, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 78%', toggleActions: 'play none none none' },
      });

      // Cards fly in one-by-one from random directions
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const angle  = (i / cards.length) * Math.PI * 2;
        const radius = 220 + Math.random() * 80;
        gsap.fromTo(card,
          {
            opacity: 0,
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            scale: 0.7,
            rotation: (Math.random() - 0.5) * 30,
          },
          {
            opacity: 1, x: 0, y: 0, scale: 1, rotation: 0,
            duration: 0.9,
            delay: i * 0.08,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 78%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, footerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <footer ref={footerRef} id="contact">
      <style>{`
        .ft-canvas {
          position: relative;
          min-height: 100vh;
          background: linear-gradient(155deg, #FAF0D6 0%, #F7DDD8 38%, #F4C2C2 100%);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
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
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-style: italic;
          font-weight: 600;
          color: #C8563B;
          letter-spacing: 0;
          font-size: 1.12em;
        }
        .ft-card {
          position: absolute;
          z-index: 10;
          background: rgba(255,255,255,0.62);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255,255,255,0.78);
          border-radius: 16px;
          padding: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease;
          cursor: default;
          will-change: transform;
        }
        .ft-card:hover {
          transform: translateY(-5px) scale(1.04) !important;
          box-shadow: 0 16px 48px rgba(0,0,0,0.11), 0 2px 8px rgba(0,0,0,0.06);
          z-index: 25;
        }
        .ft-card--dark {
          background: rgba(24,24,24,0.92);
          border-color: rgba(255,255,255,0.08);
        }
        .ft-card--dark:hover { background: rgba(24,24,24,1); }
        .ft-label {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(30,30,30,0.38);
          margin-bottom: 4px;
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
        .ft-avail-row { display: flex; align-items: center; gap: 6px; }
        .ft-avail-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #3A7056;
          animation: ftPulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes ftPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(58,112,86,0.35); }
          50%      { box-shadow: 0 0 0 6px rgba(58,112,86,0); }
        }
        .ft-tags { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 6px; }
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
        .ft-link-col { display: flex; flex-direction: column; gap: 6px; margin-top: 6px; }
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
          width: 22px; height: 22px;
          border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700;
          background: rgba(30,30,30,0.06);
          flex-shrink: 0;
          transition: background 0.2s, color 0.2s;
        }
        .ft-link:hover .ft-link-icon { background: #C8563B; color: white; }
        .ft-cta-link { text-decoration: none; display: block; text-align: center; }
        .ft-cta-icon { font-size: 20px; margin: 6px 0 2px; }
        .ft-cta-title {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: white;
        }
        .ft-copyright {
          position: absolute;
          bottom: 20px;
          left: 0; right: 0;
          text-align: center;
          z-index: 5;
          pointer-events: none;
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
        @media (max-width: 900px) {
          .ft-canvas { min-height: auto; padding: 60px 16px 80px; flex-direction: column; }
          .ft-heading { margin-bottom: 40px; }
          .ft-card {
            position: relative !important;
            top: auto !important; left: auto !important;
            right: auto !important; bottom: auto !important;
            transform: none !important;
            width: 100% !important;
            max-width: 320px;
            margin: 6px auto;
          }
          .ft-mobile-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            width: 100%;
            max-width: 420px;
            margin: 0 auto;
          }
          .ft-mobile-grid .ft-card { max-width: none; }
          .ft-copyright { position: relative; margin-top: 32px; }
        }
        @media (max-width: 480px) {
          .ft-mobile-grid { grid-template-columns: 1fr; max-width: 300px; }
        }
      `}</style>

      <div className="ft-canvas">
        {/* Decorative shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <MorphingShape type="spiral"    color="rgba(200,86,59,0.12)"  size={110} className="absolute top-[10%] left-[16%]" />
          <MorphingShape type="blob"      color="rgba(226,167,79,0.14)" size={85}  className="absolute top-[18%] right-[30%]" />
          <MorphingShape type="starburst" color="rgba(58,112,86,0.10)"  size={55}  className="absolute bottom-[28%] left-[42%]" />
          <MorphingShape type="swirl"     color="rgba(244,168,176,0.18)" size={65} className="absolute bottom-[14%] right-[28%]" />
        </div>

        {/* Center heading */}
        <div ref={headingRef} className="ft-heading">
          <h2>
            I build <span className="accent">and</span> ship.<br />Fast.
          </h2>
        </div>

        {/* Desktop: absolutely scattered cards */}
        <div className="hidden md:contents">
          {cards.map((card, i) => (
            <div
              key={card.id}
              ref={el => { cardsRef.current[i] = el; }}
              className={`ft-card${card.dark ? ' ft-card--dark' : ''}`}
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
              ref={el => { cardsRef.current[i] = el; }}
              className={`ft-card${card.dark ? ' ft-card--dark' : ''}`}
              style={card.accent ? { background: card.accent, borderColor: 'transparent' } : {}}
            >
              {card.content}
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="ft-copyright">
          <p className="ft-copyright-accent">designed with care &amp; curiosity</p>
          <p className="ft-copyright-text">Raghav Juneja · All Rights Reserved © {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
