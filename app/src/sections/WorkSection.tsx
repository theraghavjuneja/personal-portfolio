import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  image: string | null;
  tags: string[];
  brand?: string; // optional hover badge (e.g. "fiverr")
}

const PROJECTS: Project[] = [
  {
    title: 'Simplifying Urban Logistics',
    description: 'Optimizing last-mile delivery routes with real-time ML.',
    image: '/images/work-1.jpg',
    tags: ['Case Study', 'Node.js'],
    brand: 'fiverr', // demo badge based on your reference image
  },
  {
    title: 'Frictionless Mental Wellness App',
    description: 'An intuitive platform serving 50k+ users for mental well-being.',
    image: '/images/work-2.jpg',
    tags: ['System Design', 'PostgreSQL'],
  },
  {
    title: 'B2B Marketplace Infrastructure',
    description: 'Digitizing inventory and fulfillment at enterprise scale.',
    image: '/images/work-3.jpg',
    tags: ['Microservices', 'Redis'],
  },
  {
    title: 'Designing with AI across the product lifecycle',
    description: 'AI augmented our workflow. It did not redefine our human-centered focus.',
    image: null,
    tags: ['Case Study', 'Leadership'],
  },
  {
    title: 'Harbor — Personal Finance',
    description: 'A simpler way to manage finances with real-time sync across 12 banks.',
    image: '/images/work-5.jpg',
    tags: ['Fintech', 'WebSockets'],
  },
  {
    title: 'Evolving our Reading Ecosystem',
    description: 'A focused reading experience for 2M+ monthly active users.',
    image: '/images/work-6.jpg',
    tags: ['Performance', 'CDN'],
  },
];

// Card dimensions — flying card is image-only height; final card is taller
const CARD_W = 280;
const CARD_IMG_H = 200; // height during flight (image only)
const CARD_FULL_H = 340; // height at final grid (image + text area)

// Off-screen starts: fraction of viewport (positive = right/down)
const STARTS: { xf: number; yf: number; rot: number }[] = [
  { xf: -1.4, yf: -1.1, rot: -28 },
  { xf: 1.4, yf: -1.1, rot: 24 },
  { xf: -1.4, yf: 1.1, rot: 16 },
  { xf: 1.4, yf: 1.1, rot: -20 },
  { xf: 0.0, yf: -1.5, rot: 10 },
  { xf: 1.2, yf: 0.2, rot: -14 },
];

// Pile offsets (px from center)
const PILE: { x: number; y: number; rot: number }[] = [
  { x: -22, y: -18, rot: -10 },
  { x: 18, y: 12, rot: 7 },
  { x: -10, y: 26, rot: -4 },
  { x: 30, y: -24, rot: 13 },
  { x: -28, y: 6, rot: -16 },
  { x: 10, y: -12, rot: 5 },
];

export default function WorkSection() {
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
      flyRefs.current.forEach(el => el && gsap.set(el, { opacity: 0 }));
      if (heroRef.current) gsap.set(heroRef.current, { opacity: 0 });
      if (measureRef.current) gsap.set(measureRef.current, { visibility: 'visible', opacity: 1 });

      // Position title above first card even in reduced-motion mode
      if (titleRef.current && measureRef.current && stickyRef.current) {
        const cRect = stickyRef.current.getBoundingClientRect();
        const first = measureRef.current.children[0] as HTMLElement;
        const r = first.getBoundingClientRect();
        gsap.set(titleRef.current, {
          x: r.left - cRect.left,
          y: r.top - cRect.top - 68,
          opacity: 1,
        });
      }

      infoRefs.current.forEach(el => el && gsap.set(el, { opacity: 1, y: 0 }));
      frameRefs.current.forEach(el => el && gsap.set(el, { opacity: 1 }));
      return;
    }

    const ctx = gsap.context(() => {
      const sticky = stickyRef.current!;
      const cW = sticky.offsetWidth;
      const cH = sticky.offsetHeight;

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

      /* ── Initial state ──────────────────────────────────────────────── */
      gsap.set(heroRef.current, { opacity: 0, y: 40 });
      gsap.set(titleRef.current, { opacity: 0, x: firstCard.x, y: titleTargetY + 16 });

      flyRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, {
          x: cW / 2 - CARD_W / 2 + STARTS[i].xf * cW,
          y: cH / 2 - CARD_IMG_H / 2 + STARTS[i].yf * cH,
          rotation: STARTS[i].rot,
          opacity: 0,
          scale: 0.72,
          width: CARD_W,
          height: CARD_IMG_H,
        });
      });
      infoRefs.current.forEach(el => el && gsap.set(el, { opacity: 0, y: 10 }));
      frameRefs.current.forEach(el => el && gsap.set(el, { opacity: 0 }));

      /* ── Build scroll-driven timeline ───────────────────────────────── */
      const tl = gsap.timeline({ paused: true });

      // Phase 1 (0–12%): hero text in
      tl.to(heroRef.current, { opacity: 1, y: 0, duration: 0.12, ease: 'power2.out' }, 0);

      // Phase 2 (12–55%): images fly from edges → center pile, staggered
      flyRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.to(el, {
          x: cW / 2 - CARD_W / 2 + PILE[i].x,
          y: cH / 2 - CARD_IMG_H / 2 + PILE[i].y,
          rotation: PILE[i].rot,
          opacity: 1,
          scale: 1,
          duration: 0.18,
          ease: 'power3.out',
        }, 0.12 + i * 0.06);
      });

      // Phase 3 (50–62%): hero text fades
      tl.to(heroRef.current, { opacity: 0, y: -20, duration: 0.1, ease: 'power2.in' }, 0.50);

      // Phase 5 (68–100%): pile explodes → each card flies to its grid slot
      flyRefs.current.forEach((el, i) => {
        if (!el) return;
        const g = gridTargets[i];
        tl.to(el, {
          x: g.x,
          y: g.y,
          rotation: 0,
          scale: 1,
          width: g.w,
          height: g.h,
          duration: 0.26,
          ease: 'power3.inOut',
        }, 0.68 + i * 0.025);
      });

      // Viewfinder frames fade in right after cards land
      frameRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.to(el, { opacity: 1, duration: 0.12, ease: 'power2.out' }, 0.83 + i * 0.015);
      });

      // Card info appears after cards land
      infoRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.to(el, { opacity: 1, y: 0, duration: 0.1, ease: 'power2.out' }, 0.87 + i * 0.02);
      });

      // Section title appears above first project
      tl.to(titleRef.current, { opacity: 1, y: titleTargetY, duration: 0.12, ease: 'power2.out' }, 0.84);

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
    <div ref={outerRef} id="work" style={{ height: '500vh' }}>
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: 'hsl(36,33%,97%)',
        }}
      >

        {/* ── Hero copy (Phase 1) ───────────────────────────────────────── */}
        <div ref={heroRef} className="wk-hero">
          <p className="wk-hero__label">Case Studies &amp; Work</p>
          <h2 className="wk-hero__heading">I build systems<br />that scale.</h2>
          <p className="wk-hero__sub">Engineered for reliability, designed for humans.</p>
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
          <span className="wk-section-title__text">Case Studies &amp; Work</span>
          <div className="wk-section-title__line" />
        </div>

      </div>

      {/* ── Hover & frame styles ─────────────────────────────────────── */}
      <style>{`
        .wk-card { cursor: pointer; }
        .wk-card__inner {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease;
        }
        .wk-card:hover .wk-card__inner {
          transform: translateY(-6px);
          box-shadow: 0 24px 48px rgba(0,0,0,0.14);
        }
        .wk-card__img-wrap {
          overflow: hidden;
          position: relative;
        }
        .wk-card__img {
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .wk-card:hover .wk-card__img {
          transform: scale(1.06);
        }
        .wk-card__dark-bg {
          width: 100%;
          height: 100%;
          background: #111;
        }
        .wk-viewfinder {
          color: #1a1a1a;
          transition: color 0.35s ease, opacity 0.3s ease;
        }
        .wk-card[data-theme="dark"] .wk-viewfinder {
          color: #e5e5e5;
        }
        .wk-card:hover .wk-viewfinder {
          color: #e11d48;
        }
        .wk-card__brand {
          position: absolute;
          top: 14px;
          left: 14px;
          background: #e11d48;
          color: #fff;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 5px 12px;
          border-radius: 4px;
          opacity: 0;
          transform: translateY(-6px);
          transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
          pointer-events: none;
          z-index: 10;
        }
        .wk-card:hover .wk-card__brand {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}