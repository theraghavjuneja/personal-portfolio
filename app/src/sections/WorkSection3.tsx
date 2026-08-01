import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { PROJECTS } from '@/data/projects';
gsap.registerPlugin(ScrollTrigger);

// Card dimensions — image area stays fixed height; grid gives the card its final size
const CARD_IMG_H = 200; // fixed height of the image area within every card
const CARD_FULL_H = 340; // height of a card's measurement slot (image + text area)

export default function NewSection() {
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const flyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const infoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { reducedMotion } = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      if (heroRef.current) gsap.set(heroRef.current, { opacity: 0 });

      // Measure the real grid slots and drop every card straight into place, fully visible
      if (measureRef.current && stickyRef.current) {
        gsap.set(measureRef.current, { visibility: 'visible', opacity: 0 });
        const cRect = stickyRef.current.getBoundingClientRect();
        const gridTargets = (Array.from(measureRef.current.children) as HTMLElement[]).map(el => {
          const r = el.getBoundingClientRect();
          return { x: r.left - cRect.left, y: r.top - cRect.top, w: r.width, h: r.height };
        });
        gsap.set(measureRef.current, { visibility: 'hidden' });

        flyRefs.current.forEach((el, i) => {
          if (!el) return;
          const g = gridTargets[i];
          gsap.set(el, { x: g.x, y: g.y, width: g.w, height: g.h, opacity: 1, scale: 1, filter: 'blur(0px)' });
        });

        const firstCard = gridTargets[0];
        if (titleRef.current) {
          gsap.set(titleRef.current, { x: firstCard.x, y: firstCard.y - 68, opacity: 1 });
        }
      }

      infoRefs.current.forEach(el => el && gsap.set(el, { opacity: 1, y: 0 }));
      frameRefs.current.forEach(el => el && gsap.set(el, { opacity: 1 }));
      return;
    }

    const ctx = gsap.context(() => {
      const sticky = stickyRef.current!;

      /* ── Measure final grid positions ────────────────────────────────── */
      gsap.set(measureRef.current, { visibility: 'visible', opacity: 0 });
      const cRect = sticky.getBoundingClientRect();

      const gridTargets = (Array.from(measureRef.current!.children) as HTMLElement[]).map(el => {
        const r = el.getBoundingClientRect();
        return {
          x: r.left - cRect.left,
          y: r.top - cRect.top,
          w: r.width,
          h: r.height,
        };
      });
      gsap.set(measureRef.current, { visibility: 'hidden' });

      /* ── Title target: directly above first project ──────────────────── */
      const firstCard = gridTargets[0];
      const titleTargetY = firstCard.y - 68;

      /* ── Initial state ──────────────────────────────────────────────────
         Cards sit at their real, final grid slot from the start — nothing
         travels across the screen. Only opacity / scale / blur animate, so
         each card simply materializes in place. */
      gsap.set(heroRef.current, { opacity: 0, y: 40 });
      gsap.set(titleRef.current, { opacity: 0, x: firstCard.x, y: titleTargetY + 16 });

      flyRefs.current.forEach((el, i) => {
        if (!el) return;
        const g = gridTargets[i];
        gsap.set(el, {
          x: g.x,
          y: g.y,
          width: g.w,
          height: g.h,
          opacity: 0,
          scale: 0.9,
          filter: 'blur(8px)',
        });
      });
      infoRefs.current.forEach(el => el && gsap.set(el, { opacity: 0, y: 10 }));
      frameRefs.current.forEach(el => el && gsap.set(el, { opacity: 0 }));

      /* ── Build scroll-driven timeline ───────────────────────────────── */
      const tl = gsap.timeline({ paused: true });

      // Phase 1 (0–14%): hero text in
      tl.to(heroRef.current, { opacity: 1, y: 0, duration: 0.14, ease: 'power2.out' }, 0);

      // Phase 2 (16–60%): cards materialize in place, staggered left→right, top→bottom
      flyRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.to(el, {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.16,
          ease: 'power2.out',
        }, 0.16 + i * 0.055);
      });

      // Phase 3 (40–50%): hero text fades as the grid takes over
      tl.to(heroRef.current, { opacity: 0, y: -20, duration: 0.1, ease: 'power2.in' }, 0.40);

      // Phase 4 (62–74%): viewfinder frames fade in once cards have settled
      frameRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.to(el, { opacity: 1, duration: 0.12, ease: 'power2.out' }, 0.62 + i * 0.02);
      });

      // Phase 5 (66–78%): card info fades in
      infoRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.to(el, { opacity: 1, y: 0, duration: 0.1, ease: 'power2.out' }, 0.66 + i * 0.02);
      });

      // Section title appears above first project
      tl.to(titleRef.current, { opacity: 1, y: titleTargetY, duration: 0.12, ease: 'power2.out' }, 0.72);

      /* ── Wire timeline to scroll ─────────────────────────────────────── */
      ScrollTrigger.create({
        trigger: outerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.6,
        onUpdate: self => tl.progress(self.progress),
      });

    }, outerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={outerRef} className="wk-root" style={{ height: '380vh' }}>
      <div
        ref={stickyRef}
        className="wk-sticky"
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <span className="wk-crop wk-crop--tl" />
        <span className="wk-crop wk-crop--br" />

        {/* ── Hero copy (Phase 1) ───────────────────────────────────────── */}
        <div ref={heroRef} className="wk-hero">
          <span className="wk-hero__eyebrow">
            <span className="wk-hero__dot" />
            Case Studies &amp; Work
          </span>
          <h2 className="wk-hero__heading">
            I build <span className="hl">products</span><br />
            not just <span className="hl">backends</span>
          </h2>
          <p className="wk-hero__sub">Engineered for reliability, shipped for outcomes.</p>
        </div>

        {/* ── Flying cards (Phases 2–5) ────────────────────────────────── */}
        {PROJECTS.map((p, i) => (
          <div
            key={i}
            ref={el => { flyRefs.current[i] = el; }}
            className="wk-card"
            data-theme={p.image ? 'light' : 'dark'}
            style={{ zIndex: 20 + i }}
          >
            <div className="wk-card__inner">
              {/* Image area */}
              <div className="wk-card__img-wrap">
                {p.image
                  ? <img src={p.image} alt={p.title} className="wk-card__img" />
                  : <div className="wk-card__dark-bg" />
                }
              </div>

              {/* Info area — fades in at grid phase */}
              <div
                ref={el => { infoRefs.current[i] = el; }}
                className={`wk-card__info${p.image ? '' : ' wk-card__info--dark'}`}
              >
                <h3 className="wk-card__title">{p.title}</h3>
                <p className="wk-card__desc">{p.description}</p>
                <div className="wk-card__tags">
                  {p.tags.map(t => (
                    <span key={t} className="wk-tag">{t}</span>
                  ))}
                </div>
              </div>

              {/* Optional brand badge (hover) */}
              {p.brand && (
                <div className="wk-card__brand">{p.brand}</div>
              )}

              {/* Viewfinder / HUD frame */}
              <div
                ref={el => { frameRefs.current[i] = el; }}
                className="wk-viewfinder"
                style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0 }}
              >
                {/* Corners */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: 12, height: 12, borderTop: '2px solid currentColor', borderLeft: '2px solid currentColor', borderRadius: '12px 0 0 0' }} />
                <div style={{ position: 'absolute', top: 0, right: 0, width: 12, height: 12, borderTop: '2px solid currentColor', borderRight: '2px solid currentColor', borderRadius: '0 12px 0 0' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: 12, height: 12, borderBottom: '2px solid currentColor', borderLeft: '2px solid currentColor', borderRadius: '0 0 0 12px' }} />
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, borderBottom: '2px solid currentColor', borderRight: '2px solid currentColor', borderRadius: '0 0 12px 0' }} />

                {/* Top edges (broken center) */}
                <div style={{ position: 'absolute', top: 0, left: 12, width: 'calc(45% - 12px)', height: 2, background: 'currentColor' }} />
                <div style={{ position: 'absolute', top: 0, right: 12, width: 'calc(45% - 12px)', height: 2, background: 'currentColor' }} />

                {/* Bottom edges (broken center) */}
                <div style={{ position: 'absolute', bottom: 0, left: 12, width: 'calc(45% - 12px)', height: 2, background: 'currentColor' }} />
                <div style={{ position: 'absolute', bottom: 0, right: 12, width: 'calc(45% - 12px)', height: 2, background: 'currentColor' }} />

                {/* Continuous vertical edges */}
                <div style={{ position: 'absolute', left: 0, top: 12, bottom: 12, width: 2, background: 'currentColor' }} />
                <div style={{ position: 'absolute', right: 0, top: 12, bottom: 12, width: 2, background: 'currentColor' }} />
              </div>
            </div>
          </div>
        ))}

        {/* ── Invisible measurement grid ────────────────────────────────── */}
        <div ref={measureRef} className="wk-measure-grid" style={{ visibility: 'hidden' }}>
          {PROJECTS.map((_, i) => (
            <div key={i} className="wk-measure-item" />
          ))}
        </div>

        {/* ── Section title (appears above first project) ──────────────── */}
        <div
          ref={titleRef}
          className="wk-section-title"
          style={{ position: 'absolute', left: 0, top: 0, zIndex: 40 }}
        >
          <span className="wk-section-title__dot" />
          <span className="wk-section-title__text">Case Studies &amp; Work</span>
          <div className="wk-section-title__line" />
        </div>

      </div>

      {/* ── Design-system-matched styles ─────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600;700&display=swap');

        .wk-root {
          --bg: #EEF0EA;
          --ink: #10141A;
          --ink-60: rgba(16,20,26,.6);
          --ink-40: rgba(16,20,26,.4);
          --line: rgba(16,20,26,.14);
          --accent: #0E7C79;
          --accent-ink: #063C3B;
          --accent-soft: #CFE7E3;
          --accent-soft-ink: #63B6AE;
          --term-ok: #7FE3D6;

          font-family:'IBM Plex Sans', system-ui, sans-serif;
          position: relative;
        }

        .wk-sticky {
          background: var(--bg);
        }

        /* Corner crop marks — echoes hero page framing */
        .wk-crop { position:absolute; width:18px; height:18px; z-index:45; pointer-events:none; opacity:.35; }
        .wk-crop::before, .wk-crop::after { content:''; position:absolute; background:var(--ink); }
        .wk-crop::before { width:100%; height:1px; top:0; left:0; }
        .wk-crop::after { width:1px; height:100%; top:0; left:0; }
        .wk-crop--tl { top:24px; left:24px; }
        .wk-crop--br { bottom:24px; right:24px; transform:rotate(180deg); }

        .hl {
          background:var(--accent-soft);
          color:var(--accent-ink);
          border-radius:5px;
          padding:0 8px;
          box-decoration-break:clone;
          -webkit-box-decoration-break:clone;
        }

        /* ── Hero copy overlay ────────────────────────────────────────── */
        .wk-hero {
          position:absolute; inset:0; z-index:30;
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          text-align:center; padding:0 24px; pointer-events:none;
        }
        .wk-hero__eyebrow {
          display:inline-flex; align-items:center; gap:8px;
          font-family:'IBM Plex Mono', monospace; font-size:11px; font-weight:700;
          letter-spacing:.16em; text-transform:uppercase; color:var(--ink-60);
          margin-bottom:18px;
        }
        .wk-hero__dot { width:6px; height:6px; border-radius:50%; background:var(--accent); animation:wk-blip 2.2s ease-in-out infinite; }
        .wk-hero__heading {
          font-family:'Space Grotesk', system-ui, sans-serif;
          font-weight:700;
          font-size:clamp(40px,5.6vw,64px);
          line-height:1.12;
          letter-spacing:-.025em;
          color:var(--ink);
          margin:0 0 16px;
        }
        .wk-hero__sub {
          font-family:'IBM Plex Sans', sans-serif;
          font-weight:500;
          font-size:16px; line-height:1.55; color:var(--ink-60);
          max-width:460px; margin:0 auto;
        }

        @keyframes wk-blip {
          0%,100% { box-shadow:0 0 0 0 rgba(14,124,121,.55); }
          50% { box-shadow:0 0 0 5px rgba(14,124,121,0); }
        }

        /* ── Flying / grid cards ──────────────────────────────────────── */
        .wk-card {
          position:absolute; top:0; left:0;
          cursor:pointer;
        }
        .wk-card__inner {
          width:100%; height:100%;
          position:relative;
          display:flex; flex-direction:column;
          overflow:hidden;
          border-radius:12px;
          background:#FAFAF7;
          border:1px solid var(--line);
          box-shadow:0 16px 34px -20px rgba(16,20,26,.35);
          transition: transform .4s cubic-bezier(.23,1,.32,1), box-shadow .4s ease;
        }
        .wk-card[data-theme="dark"] .wk-card__inner {
          background:#0C1116;
          border:1px solid rgba(238,240,234,.08);
        }
        .wk-card:hover .wk-card__inner {
          transform:translateY(-6px);
          box-shadow:0 26px 48px -18px rgba(16,20,26,.4), 0 10px 26px -10px rgba(14,124,121,.28);
        }

        .wk-card__img-wrap {
          flex:0 0 ${CARD_IMG_H}px;
          overflow:hidden;
          position:relative;
        }
        .wk-card__img {
          width:100%; height:100%; object-fit:cover; display:block;
          transition: transform .6s cubic-bezier(.23,1,.32,1);
        }
        .wk-card:hover .wk-card__img { transform:scale(1.06); }
        .wk-card__dark-bg { width:100%; height:100%; background:#0C1116; }

        .wk-card__info {
          flex:1 1 auto;
          overflow:hidden;
          padding:18px 20px 20px;
          display:flex; flex-direction:column; gap:6px;
        }
        .wk-card__title {
          font-family:'Space Grotesk', system-ui, sans-serif;
          font-weight:700; font-size:20px; line-height:1.25;
          letter-spacing:-.01em; color:var(--ink);
        }
        .wk-card__desc {
          font-family:'IBM Plex Sans', sans-serif;
          font-weight:500;
          font-size:13px; line-height:1.55; color:var(--ink-60);
          display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;
        }
        .wk-card__info--dark .wk-card__title { color:rgba(238,240,234,.92); }
        .wk-card__info--dark .wk-card__desc { color:rgba(238,240,234,.55); }

        .wk-card__tags { display:flex; flex-wrap:wrap; gap:6px; margin-top:2px; }
        .wk-tag {
          font-family:'IBM Plex Mono', monospace; font-size:9.5px; font-weight:700;
          letter-spacing:.08em; text-transform:uppercase; color:var(--ink-60);
          background:rgba(255,255,255,.6); border:1px solid rgba(16,20,26,.1);
          border-radius:20px; padding:4px 10px;
        }
        .wk-card__info--dark .wk-tag {
          color:rgba(238,240,234,.7);
          background:rgba(238,240,234,.08); border:1px solid rgba(238,240,234,.14);
        }

        .wk-viewfinder { color:var(--ink); transition:color .35s ease, opacity .3s ease; }
        .wk-card[data-theme="dark"] .wk-viewfinder { color:rgba(238,240,234,.55); }
        .wk-card:hover .wk-viewfinder { color:var(--accent); }

        .wk-card__brand {
          position:absolute; top:14px; left:14px;
          background:var(--accent); color:var(--bg);
          font-family:'IBM Plex Mono', monospace; font-size:10px; font-weight:700;
          text-transform:uppercase; letter-spacing:.1em;
          padding:5px 11px; border-radius:5px;
          opacity:0; transform:translateY(-6px);
          transition:all .35s cubic-bezier(.23,1,.32,1);
          pointer-events:none; z-index:10;
        }
        .wk-card:hover .wk-card__brand { opacity:1; transform:translateY(0); }

        /* ── Measurement grid (invisible — defines final layout) ───────── */
        .wk-measure-grid {
          position:relative; z-index:0;
          display:grid; grid-template-columns:repeat(3, 1fr);
          gap:32px;
          max-width:1180px; margin:0 auto;
          padding:104px 48px 40px;
        }
        .wk-measure-item { height:${CARD_FULL_H}px; }

        /* ── Section title (revealed above first card) ─────────────────── */
        .wk-section-title { display:flex; align-items:center; gap:8px; }
        .wk-section-title__dot { width:5px; height:5px; border-radius:50%; background:var(--accent); flex:none; }
        .wk-section-title__text {
          font-family:'IBM Plex Mono', monospace; font-size:10.5px; font-weight:700;
          letter-spacing:.14em; text-transform:uppercase; color:var(--ink-60);
        }
        .wk-section-title__line { flex:1 1 auto; height:1px; background:var(--line); margin-left:4px; max-width:60px; }

        @media (max-width:900px) {
          .wk-measure-grid { grid-template-columns:repeat(2, 1fr); gap:20px; padding:96px 24px 32px; }
          .wk-hero__heading { font-size:clamp(30px,8vw,42px); }
          .wk-crop { display:none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .wk-card__inner, .wk-card__img, .wk-viewfinder, .wk-card__brand { transition:none !important; }
          .wk-card:hover .wk-card__inner { transform:none; }
          .wk-hero__dot { animation:none !important; }
        }
      `}</style>
    </div>
  );
}