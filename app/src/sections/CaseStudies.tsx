import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { PROJECTS } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

const CORE_TECH = ['Node.js', 'Go', 'Python', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'Kubernetes', 'AWS', 'GCP'];

function ArrowRight() {
  return (
    <svg width="13" height="11" viewBox="0 0 13 11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 5.5h10" /><path d="M7 1l4.5 4.5L7 10" />
    </svg>
  );
}
function GithubIcon() {
  return <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" /></svg>;
}
function ExternalIcon() {
  return <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 2H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7" /><path d="M8 1h3v3M11 1 6 6" /></svg>;
}

export default function CaseStudies() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { reducedMotion } = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      cardRefs.current.forEach(card => {
        if (!card) return;
        gsap.from(card, {
          opacity: 0, y: 72, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 86%', toggleActions: 'play none none none' },
        });
        const img = card.querySelector<HTMLImageElement>('.ws-img');
        if (img) {
          gsap.to(img, {
            yPercent: -8, ease: 'none',
            scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
          });
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <>
      <style>{`
        .ws-root {
          background: #EEF0EA;
          background-image: radial-gradient(rgba(16,20,26,.09) 1px, transparent 1px);
          background-size: 22px 22px;
          font-family: 'IBM Plex Sans', system-ui, sans-serif;
        }
        .ws-layout {
          display: flex;
          align-items: flex-start;
          width: 100%;
          min-height: 100vh;
        }

        /* ── Sticky sidebar ── */
        .ws-aside {
          position: sticky;
          top: 0;
          width: 420px;
          height: 100vh;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 48px 28px 0 32px;
          background: #EEF0EA;
          border-right: 3px solid #10141A;
          box-shadow: 6px 0 0px #10141A;
          z-index: 10;
        }
        .ws-aside__top { display: flex; flex-direction: column; gap: 0; }
        .ws-aside__name-row {
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 22px;
        }
        .ws-aside__name {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 14px; font-weight: 700;
          color: #10141A; letter-spacing: -0.01em;
        }
        .ws-aside__dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #0E7C79; flex-shrink: 0;
          animation: ws-pulse 2.2s ease-in-out infinite;
        }
        .ws-aside__headline {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: clamp(34px, 3.2vw, 52px);
          font-weight: 800;
          color: #10141A;
          letter-spacing: -0.045em;
          line-height: 1.1;
          margin: 0 0 20px;
        }
        .ws-aside__hl {
          background: #CFE7E3; color: #10141A;
          border: 3px solid #10141A;
          border-radius: 5px; padding: 0 6px;
          box-shadow: 3px 3px 0px #10141A;
          display: inline-block;
          transform: rotate(-2deg);
        }
        .ws-aside__bio {
          font-size: 13.5px;
          color: rgba(16,20,26,.56);
          line-height: 1.75;
          margin: 0 0 24px;
        }
        .ws-aside__cta {
          display: inline-flex; align-items: center; gap: 7px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px; font-weight: 700;
          letter-spacing: .07em; text-transform: uppercase;
          color: #0E7C79; text-decoration: none;
          margin-bottom: 28px;
          transition: gap .2s ease;
        }
        .ws-aside__cta:hover { gap: 12px; }
        .ws-aside__hr { width: 100%; height: 3px; background: #10141A; margin-bottom: 22px; border: none; }
        .ws-aside__tech-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 9px; font-weight: 700;
          letter-spacing: .18em; text-transform: uppercase;
          color: rgba(16,20,26,.32); margin-bottom: 14px;
        }
        .ws-aside__tech-grid {
          display: flex; flex-wrap: wrap; gap: 7px;
        }
        .ws-tech-chip {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11.5px; font-weight: 600;
          color: #10141A;
          background: #FAFAF7;
          border: 2px solid #10141A;
          border-radius: 6px;
          padding: 5px 11px;
          cursor: default;
          transition: transform .2s, box-shadow .2s, background .2s;
          box-shadow: 2px 2px 0px #10141A;
        }
        .ws-tech-chip:hover {
          background: #CFE7E3;
          transform: translate(-2px, -2px) scale(1.03);
          box-shadow: 4px 4px 0px #10141A;
        }

        /* Character image */
        .ws-aside__char {
          width: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-top: 12px;
          overflow: hidden;
        }
        .ws-aside__char img {
          width: 160px;
          filter: drop-shadow(0 -4px 16px rgba(16,20,26,.08));
          user-select: none;
          pointer-events: none;
        }

        /* ── Right scroll column ── */
        .ws-cards {
          flex: 1; min-width: 0;
          padding: 48px 40px 80px 40px;
          display: flex; flex-direction: column; gap: 24px;
        }

        /* ── Project card ── */
        .ws-card {
          background: #FAFAF7;
          border: 3px solid #10141A;
          border-radius: 16px;
          overflow: hidden;
          min-height: 88vh;
          display: flex; flex-direction: column;
          box-shadow: 6px 6px 0px #10141A;
          transition: transform .2s, box-shadow .2s;
        }
        .ws-card:hover {
          transform: translate(-4px, -4px);
          box-shadow: 10px 10px 0px #10141A;
        }
        .ws-card__img-wrap {
          position: relative; overflow: hidden;
          height: 54%; min-height: 300px;
          flex-shrink: 0; background: #0C1116;
        }
        .ws-img {
          width: 100%; height: 108%;
          object-fit: cover; display: block;
          transform: translateY(0);
        }
        .ws-card__num {
          position: absolute; top: 18px; left: 18px;
          background: #FAFAF7;
          border: 3px solid #10141A;
          box-shadow: 4px 4px 0px #10141A;
          border-radius: 6px; padding: 5px 12px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px; font-weight: 700;
          letter-spacing: .12em; color: #10141A;
        }
        /* Viewfinder corners */
        .ws-vf { position: absolute; inset: 0; pointer-events: none; }
        .ws-vf span {
          position: absolute; width: 24px; height: 24px;
          border-color: #10141A; border-style: solid;
        }
        .ws-vf span:nth-child(1) { top:14px; left:14px;  border-width:4px 0 0 4px; border-radius:6px 0 0 0; }
        .ws-vf span:nth-child(2) { top:14px; right:14px; border-width:4px 4px 0 0; border-radius:0 6px 0 0; }
        .ws-vf span:nth-child(3) { bottom:14px; left:14px;  border-width:0 0 4px 4px; border-radius:0 0 0 6px; }
        .ws-vf span:nth-child(4) { bottom:14px; right:14px; border-width:0 4px 4px 0; border-radius:0 0 6px 0; }

        /* Info */
        .ws-card__info { flex:1; padding:30px 34px 26px; display:flex; flex-direction:column; }
        .ws-card__tags { display:flex; flex-wrap:wrap; gap:7px; margin-bottom:18px; }
        .ws-tag {
          font-family:'IBM Plex Mono',monospace; font-size:10px; font-weight:700;
          letter-spacing:.07em; text-transform:uppercase;
          color:#10141A; background:#CFE7E3;
          border:2px solid #10141A; box-shadow: 2px 2px 0px #10141A;
          border-radius:100px; padding:4px 12px;
        }
        .ws-card__title {
          font-family:'Space Grotesk',system-ui,sans-serif;
          font-size:clamp(22px,2.6vw,32px); font-weight:800;
          color:#10141A; letter-spacing:-.035em; line-height:1.12;
          margin:0 0 8px;
        }
        .ws-card__sub {
          font-family:'IBM Plex Mono',monospace;
          font-size:12px; font-weight:600; letter-spacing:.04em;
          color:#0E7C79; margin:0 0 16px;
        }
        .ws-card__desc {
          font-size:15px; color:rgba(16,20,26,.6); line-height:1.75;
          margin:0 0 24px; flex:1;
        }
        .ws-card__actions {
          display:flex; flex-wrap:wrap; gap:14px;
          padding-top:20px; border-top:3px solid #10141A;
        }
        .ws-btn {
          display:inline-flex; align-items:center; gap:8px;
          font-family:'IBM Plex Mono',monospace;
          font-size:11px; font-weight:700;
          letter-spacing:.06em; text-transform:uppercase;
          text-decoration:none; border-radius:8px; padding:10px 18px;
          cursor:pointer; transition:transform .2s,box-shadow .2s,background .2s;
          border:3px solid #10141A; white-space:nowrap;
          box-shadow: 4px 4px 0px #10141A;
        }
        .ws-btn:hover { transform:translate(-2px, -2px); box-shadow: 6px 6px 0px #10141A; }
        .ws-btn--dark { background:#10141A; color:#EEF0EA; }
        .ws-btn--dark:hover { background:#0E7C79; color:#FAFAF7; }
        .ws-btn--ghost { background:#FAFAF7; color:#10141A; }
        .ws-btn--ghost:hover { background:#CFE7E3; color:#10141A; }

        @keyframes ws-pulse {
          0%,100% { box-shadow:0 0 0 0 rgba(14,124,121,.55); }
          50%      { box-shadow:0 0 0 6px rgba(14,124,121,0); }
        }

        @media (max-width:900px) {
          .ws-layout { flex-direction:column; padding:0 20px; }
          .ws-aside { position:static; width:100%; height:auto; border-right:none; border-bottom:1px solid rgba(16,20,26,.1); padding:56px 0 28px; }
          .ws-aside__char { display:none; }
          .ws-cards { padding:32px 0 60px; }
        }
      `}</style>

      <div ref={sectionRef} id="work" className="ws-root">
        <div className="ws-layout">

          {/* ── Sticky left sidebar ── */}
          <aside className="ws-aside">

            {/* Top content block */}
            <div className="ws-aside__top">
              <div className="ws-aside__name-row">
                <span className="ws-aside__name">Raghav Juneja</span>
                <span className="ws-aside__dot" />
              </div>

              <h2 className="ws-aside__headline">
                Building backend<br />
                systems that{' '}
                <span className="ws-aside__hl">ship.</span>
              </h2>

              <p className="ws-aside__bio">
                Backend engineer building low-latency, high-impact distributed systems.
                3+ years · 12+ projects shipped in production.
              </p>

              <a href="#contact" className="ws-aside__cta">
                Get in touch <ArrowRight />
              </a>

              <hr className="ws-aside__hr" />

              <p className="ws-aside__tech-label">Core Technologies</p>
              <div className="ws-aside__tech-grid">
                {CORE_TECH.map(t => (
                  <span key={t} className="ws-tech-chip">{t}</span>
                ))}
              </div>
            </div>

            {/* Bottom — character illustration */}
            <div className="ws-aside__char">
              <img
                src="https://www.manasdev.codes/images/openpeeps-character.png"
                alt="Character illustration"
                loading="lazy"
              />
            </div>
          </aside>

          {/* ── Right scrolling cards ── */}
          <div className="ws-cards">
            {PROJECTS.map((p, i) => (
              <div
                key={i}
                ref={el => { cardRefs.current[i] = el; }}
                className="ws-card"
              >
                {/* Image */}
                <div className="ws-card__img-wrap">
                  {p.image
                    ? <img src={p.image} alt={p.title} className="ws-img" />
                    : <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#0C1116,#1a2232)' }} />
                  }
                  <div className="ws-card__num">
                    {String(i + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
                  </div>
                  <div className="ws-vf">
                    <span /><span /><span /><span />
                  </div>
                </div>

                {/* Info */}
                <div className="ws-card__info">
                  <div className="ws-card__tags">
                    {p.tags.map(t => <span key={t} className="ws-tag">{t}</span>)}
                  </div>
                  <h3 className="ws-card__title">{p.title}</h3>
                  {p.subtitle && <p className="ws-card__sub">{p.subtitle}</p>}
                  <p className="ws-card__desc">{p.description}</p>

                  <div className="ws-card__actions">
                    {p.caseStudyUrl && (
                      <a href={p.caseStudyUrl} className="ws-btn ws-btn--dark">
                        View Case Study <ArrowRight />
                      </a>
                    )}
                    {p.sourceUrl && (
                      <a href={p.sourceUrl} className="ws-btn ws-btn--ghost" target="_blank" rel="noopener noreferrer">
                        <GithubIcon /> Source Code
                      </a>
                    )}
                    {p.liveUrl && (
                      <a href={p.liveUrl} className="ws-btn ws-btn--ghost" target="_blank" rel="noopener noreferrer">
                        <ExternalIcon /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}