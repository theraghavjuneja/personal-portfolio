import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

// ── Skills list ──────────────────────────────────────────────
const skills = [
  { title: 'building & shipping products',    image: 'building-and-shipping.png' },
  { title: 'delivering on business goals',    image: 'delivering-on-goals.png'   },
  { title: 'systems thinking',               image: 'system-thinking.png'        },
  { title: 'cross-functional leadership',     image: 'cross-functional-leadership.png' },
  { title: 'mentoring fellows & mentees',     image: 'mentoring-designers.png'   },
  { title: 'product analytics',               image: 'product-analytics.png'     },
  { title: 'growth design',                   image: 'growth-design.png'         },
  { title: 'user research',                   image: 'user-research.png'         },
  { title: 'data visualization',              image: 'data-visusalisation.png'   },
];

// ── Technologies I use ───────────────────────────────────────
const TECH_ROWS = [
  [
    { name: 'Node.js',     icon: '⬡' },
    { name: 'Go',          icon: '◈' },
    { name: 'Python',      icon: '◎' },
    { name: 'TypeScript',  icon: '▣' },
    { name: 'FastAPI',     icon: '⬡' },
  ],
  [
    { name: 'PostgreSQL',  icon: '◈' },
    { name: 'Redis',       icon: '▲' },
    { name: 'Kafka',       icon: '◉' },
    { name: 'RabbitMQ',   icon: '◎' },
    { name: 'Elasticsearch', icon: '◈' },
  ],
  [
    { name: 'Docker',      icon: '▣' },
    { name: 'Kubernetes',  icon: '⬡' },
    { name: 'Terraform',   icon: '▲' },
    { name: 'AWS',         icon: '◉' },
    { name: 'GCP',         icon: '◎' },
  ],
  [
    { name: 'Grafana',     icon: '◈' },
    { name: 'Prometheus',  icon: '◉' },
    { name: 'Loki',        icon: '▣' },
    { name: 'Temporal.IO', icon: '⬡' },
    { name: 'gRPC',        icon: '▲' },
  ],
];

export default function SpecializingSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const graphicRef  = useRef<HTMLDivElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const dividerRef  = useRef<HTMLDivElement>(null);
  const skillsRef   = useRef<HTMLUListElement>(null);
  const techRef     = useRef<HTMLDivElement>(null);
  const techHeadRef = useRef<HTMLHeadingElement>(null);
  const rowRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const { reducedMotion } = useReducedMotion();
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {

      // ── Graphic entrance ───────────────────────────────────
      gsap.from(graphicRef.current, {
        opacity: 0, x: -40, scale: 0.94,
        duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });

      // ── Eyebrow / heading ──────────────────────────────────
      gsap.from([eyebrowRef.current, headingRef.current, dividerRef.current], {
        opacity: 0, y: 28,
        duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 76%', toggleActions: 'play none none none' },
      });

      // ── Skills list: clip-reveal stagger ──────────────────
      const skillItems = skillsRef.current ? Array.from(skillsRef.current.children) : [];
      skillItems.forEach((item, i) => {
        gsap.from(item, {
          opacity: 0,
          x: -24,
          duration: 0.55,
          ease: 'power3.out',
          delay: i * 0.06,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        });
      });

      // ── Tech section heading ───────────────────────────────
      gsap.from(techHeadRef.current, {
        opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: techRef.current, start: 'top 82%', toggleActions: 'play none none none' },
      });

      // ── Tech rows: stagger in from alternating sides ───────
      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        const chips = Array.from(row.children);
        gsap.from(chips, {
          opacity: 0,
          y: 20,
          scale: 0.88,
          duration: 0.45,
          stagger: { each: 0.07, from: i % 2 === 0 ? 'start' : 'end' },
          ease: 'back.out(1.8)',
          scrollTrigger: {
            trigger: row,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#EEF0EA',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Dot-grid background ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(rgba(16,20,26,.1) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      {/* ── Subtle teal glow ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: '-8%', right: '-6%',
          width: '42%', paddingBottom: '42%', borderRadius: '50%',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(14,124,121,.07) 0%, transparent 70%)',
          filter: 'blur(52px)', pointerEvents: 'none', zIndex: 0,
        }}
      />

      {/* ══════════════════════════════════════════════
          PART 1 — "I love working on" list
          ══════════════════════════════════════════════ */}
      <div
        style={{
          paddingTop: '96px', paddingBottom: '80px',
          position: 'relative', zIndex: 2,
          borderBottom: '1px solid rgba(16,20,26,.1)',
        }}
      >
        <div className="container-main">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* Left — Graphic with HUD frame */}
            <div ref={graphicRef} className="lg:w-1/2 flex justify-center relative">
              {/* Thin border frame */}
              <div aria-hidden="true" style={{ position:'absolute', inset:-8, borderRadius:16, border:'1px solid rgba(14,124,121,.18)', pointerEvents:'none' }} />
              {/* Corner crops */}
              {(['tl','tr','bl','br'] as const).map(pos => (
                <span key={pos} aria-hidden="true" style={{
                  position: 'absolute', width: 14, height: 14,
                  ...(pos==='tl' ? { top:-8,    left:-8,  borderTop:'2px solid #0E7C79', borderLeft:'2px solid #0E7C79',   borderRadius:'3px 0 0 0' } : {}),
                  ...(pos==='tr' ? { top:-8,    right:-8, borderTop:'2px solid #0E7C79', borderRight:'2px solid #0E7C79',  borderRadius:'0 3px 0 0' } : {}),
                  ...(pos==='bl' ? { bottom:-8, left:-8,  borderBottom:'2px solid #0E7C79', borderLeft:'2px solid #0E7C79', borderRadius:'0 0 0 3px' } : {}),
                  ...(pos==='br' ? { bottom:-8, right:-8, borderBottom:'2px solid #0E7C79', borderRight:'2px solid #0E7C79', borderRadius:'0 0 3px 0' } : {}),
                  pointerEvents: 'none', zIndex: 10,
                }} />
              ))}
              <img
                src={hoveredImage ? `/images/${hoveredImage}` : '/images/specializing-graphic.png'}
                alt={hoveredImage ? 'Hovered skill illustration' : 'Abstract creative energy illustration'}
                className="w-full max-w-[400px] lg:max-w-[460px] relative"
                style={{ filter: 'drop-shadow(0 16px 40px rgba(16,20,26,.12))', transition: 'opacity 0.25s ease', zIndex: 5 }}
              />
            </div>

            {/* Right — Skills list */}
            <div className="lg:w-1/2">
              {/* Eyebrow */}
              <div
                ref={eyebrowRef}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 700,
                  letterSpacing: '0.18em', textTransform: 'uppercase' as const,
                  color: '#0E7C79', marginBottom: 14,
                }}
              >
                <span style={{ width:6, height:6, borderRadius:'50%', background:'#0E7C79', display:'inline-block', animation:'sp-blip 2.2s ease-in-out infinite' }} />
                Specializing in
              </div>

              <h2
                ref={headingRef}
                style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700,
                  color: '#10141A', letterSpacing: '-0.025em', lineHeight: 1.1, margin: 0,
                }}
              >
                I love working on
              </h2>

              <div
                ref={dividerRef}
                style={{ marginTop: 8, width: 40, height: 2, background: 'rgba(14,124,121,.35)', borderRadius: 2, marginBottom: 24 }}
              />

              {/* Skills */}
              <ul
                ref={skillsRef}
                style={{ listStyle: 'none', margin: 0, padding: 0 }}
              >
                {skills.map((skill, index) => (
                  <li
                    key={index}
                    className="sp-skill-item"
                    onMouseEnter={e => {
                      setHoveredImage(skill.image);
                      const el = e.currentTarget as HTMLLIElement;
                      el.style.color = '#0E7C79';
                      const bg = el.querySelector('.sp-hover-bg') as HTMLSpanElement;
                      if (bg) bg.style.opacity = '1';
                      const ul = el.querySelector('.sp-underline') as HTMLSpanElement;
                      if (ul) ul.style.width = '100%';
                    }}
                    onMouseLeave={e => {
                      setHoveredImage(null);
                      const el = e.currentTarget as HTMLLIElement;
                      el.style.color = '#10141A';
                      const bg = el.querySelector('.sp-hover-bg') as HTMLSpanElement;
                      if (bg) bg.style.opacity = '0';
                      const ul = el.querySelector('.sp-underline') as HTMLSpanElement;
                      if (ul) ul.style.width = '0%';
                    }}
                    style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontWeight: 600,
                      fontSize: 'clamp(18px, 2.2vw, 28px)',
                      color: '#10141A',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.2,
                      cursor: 'default',
                      position: 'relative',
                      transition: 'color .22s ease',
                      padding: '7px 12px',
                    }}
                  >
                    {/* Hover background highlight */}
                    <span
                      className="sp-hover-bg"
                      aria-hidden="true"
                      style={{
                        position: 'absolute', inset: '0 -4px',
                        borderRadius: 6,
                        background: 'linear-gradient(90deg, rgba(14,124,121,0) 0%, rgba(14,124,121,.08) 40%, rgba(14,124,121,.05) 100%)',
                        opacity: 0,
                        transition: 'opacity .25s ease',
                        pointerEvents: 'none',
                      }}
                    />
                    {/* Text + animated underline */}
                    <span style={{ position: 'relative', display: 'inline-block' }}>
                      {skill.title}
                      <span
                        className="sp-underline"
                        aria-hidden="true"
                        style={{
                          position: 'absolute', bottom: 0, left: 0,
                          height: '1.5px', width: '0%',
                          background: 'linear-gradient(90deg, #0E7C79 0%, #7FE3D6 50%, #0E7C79 100%)',
                          backgroundSize: '200% 100%',
                          borderRadius: 2,
                          transition: 'width .4s cubic-bezier(.25,.46,.45,.94)',
                          animation: 'sp-shimmer 2.4s linear infinite',
                        }}
                      />
                    </span>
                  </li>
                ))}
              </ul>

              {/* Hover hint */}
              <div style={{ marginTop: 20, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span
                  aria-hidden="true"
                  style={{
                    display: 'inline-block', width: 5, height: 5,
                    borderRadius: '50%', background: '#0E7C79',
                    flexShrink: 0, marginTop: 7,
                    animation: 'sp-blip 2.8s ease-in-out infinite',
                  }}
                />
                <p style={{
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 500,
                  color: 'rgba(16,20,26,.4)', margin: 0, lineHeight: 1.55,
                }}>
                  Hover any skill to glimpse it in action.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          PART 2 — Technologies I use
          ══════════════════════════════════════════════ */}
      <div ref={techRef} style={{ paddingTop: '80px', paddingBottom: '96px', position: 'relative', zIndex: 2 }}>
        <div className="container-main">

          {/* Section header */}
          <div style={{ marginBottom: 52, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 700,
                letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: '#0E7C79', marginBottom: 12,
              }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:'#0E7C79', display:'inline-block', animation:'sp-blip 2.2s ease-in-out infinite' }} />
                Stack
              </div>
              <h2
                ref={techHeadRef}
                style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700,
                  color: '#10141A', letterSpacing: '-0.025em', lineHeight: 1.1, margin: 0,
                }}
              >
                Technologies I use
              </h2>
              <div style={{ marginTop: 8, width: 40, height: 2, background: 'rgba(14,124,121,.35)', borderRadius: 2 }} />
            </div>
            {/* Counter badge */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'rgba(14,124,121,.08)',
              border: '1px solid rgba(14,124,121,.2)',
              borderRadius: 100, padding: '8px 18px',
            }}>
              <span style={{ width:7, height:7, borderRadius:'50%', background:'#0E7C79', animation:'sp-blip 2s ease-in-out infinite' }} />
              <span style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize:11, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase' as const, color:'#0E7C79' }}>
                {TECH_ROWS.reduce((a, r) => a + r.length, 0)}+ tools
              </span>
            </div>
          </div>

          {/* Tech rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {TECH_ROWS.map((row, rowIdx) => (
              <div
                key={rowIdx}
                ref={el => { rowRefs.current[rowIdx] = el; }}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 10,
                  /* Alternate alignment for visual rhythm */
                  justifyContent: rowIdx % 2 === 0 ? 'flex-start' : 'flex-end',
                }}
              >
                {row.map((tech, j) => (
                  <div
                    key={j}
                    className="tech-chip"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      background: '#FAFAF7',
                      border: '1px solid rgba(16,20,26,.12)',
                      borderRadius: 8,
                      padding: '10px 18px',
                      cursor: 'default',
                      transition: 'transform .25s cubic-bezier(.23,1,.32,1), box-shadow .25s ease, border-color .25s ease, background .25s ease',
                      boxShadow: '0 1px 4px rgba(16,20,26,.06)',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.transform = 'translateY(-3px) scale(1.04)';
                      el.style.boxShadow = '0 8px 24px -6px rgba(14,124,121,.22), 0 2px 8px -2px rgba(16,20,26,.12)';
                      el.style.borderColor = 'rgba(14,124,121,.4)';
                      el.style.background = '#F3FAF9';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.transform = '';
                      el.style.boxShadow = '0 1px 4px rgba(16,20,26,.06)';
                      el.style.borderColor = 'rgba(16,20,26,.12)';
                      el.style.background = '#FAFAF7';
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: 14,
                        color: '#0E7C79',
                        lineHeight: 1,
                        width: 16,
                        textAlign: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {tech.icon}
                    </span>
                    <span
                      style={{
                        fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
                        fontSize: 14,
                        fontWeight: 600,
                        color: '#10141A',
                        letterSpacing: '-0.01em',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Keyframes & component styles ── */}
      <style>{`
        @keyframes sp-blip {
          0%, 100% { box-shadow: 0 0 0 0 rgba(14,124,121,.55); }
          50%       { box-shadow: 0 0 0 5px rgba(14,124,121,0);  }
        }
        @keyframes sp-shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </section>
  );
}