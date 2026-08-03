import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { IconType } from 'react-icons';
import {
  SiNodedotjs,
  SiGo,
  SiPython,
  SiTypescript,
  SiFastapi,
  SiPostgresql,
  SiRedis,
  SiApachekafka,
  SiRabbitmq,
  SiElastic,
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiGooglecloud,
  SiGrafana,
  SiPrometheus,
} from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

// ── "I love working on" list ────────────────────────────────
// Rewritten to actually match a backend/cloud engineer's work.
// Dropped: mentoring fellows & mentees, growth design, user research,
// data visualization, product analytics, cross-functional leadership
// — these read as product-designer skills, not yours. Edit freely;
// this is just a reasonable backend-flavored starting point.
const skills = [
  { title: 'building & shipping products' },
  { title: 'delivering on business goals' },
  { title: 'systems thinking' },
  { title: 'distributed systems & fault tolerance' },
  { title: 'cloud infrastructure & cost optimization' },
  { title: 'observability & monitoring' },
  { title: 'api design & architecture' },
  { title: 'infrastructure as code' },
];

// ── Technologies I use ───────────────────────────────────────
// Real brand logos (Simple Icons via react-icons) instead of the
// placeholder Unicode glyphs. A few tools (Loki, Temporal.IO, gRPC)
// don't have an official logo in Simple Icons — those fall back to a
// small lettered badge instead of showing a wrong/fake icon.
type Tech = { name: string; Icon?: IconType; fallback?: string };

const TECH_ROWS: Tech[][] = [
  [
    { name: 'Node.js', Icon: SiNodedotjs },
    { name: 'Go', Icon: SiGo },
    { name: 'Python', Icon: SiPython },
    { name: 'TypeScript', Icon: SiTypescript },
    { name: 'FastAPI', Icon: SiFastapi },
  ],
  [
    { name: 'PostgreSQL', Icon: SiPostgresql },
    { name: 'Redis', Icon: SiRedis },
    { name: 'Kafka', Icon: SiApachekafka },
    { name: 'RabbitMQ', Icon: SiRabbitmq },
    { name: 'Elasticsearch', Icon: SiElastic },
  ],
  [
    { name: 'Docker', Icon: SiDocker },
    { name: 'Kubernetes', Icon: SiKubernetes },
    { name: 'Terraform', Icon: SiTerraform },
    // { name: 'AWS', Icon: SiAmazonaws },
    { name: 'GCP', Icon: SiGooglecloud },
  ],
  [
    { name: 'Grafana', Icon: SiGrafana },
    { name: 'Prometheus', Icon: SiPrometheus },
    { name: 'Loki', fallback: 'Lk' },
    { name: 'Temporal.IO', fallback: 'Tp' },
    { name: 'gRPC', fallback: 'Rpc' },
  ],
];

// Static, on-brand "system diagram" graphic — replaces the per-skill
// Open-Peeps-style illustration swap, which had no real backend
// equivalent (there's no "illustration of mentoring" to show, and the
// hover-swap images used a totally different color palette anyway).
function SystemDiagramGraphic() {
  return (
    <svg viewBox="0 0 400 400" width="100%" height="100%" style={{ maxWidth: 380 }}>
      <path d="M80 100 L220 60" stroke="#10141A" strokeWidth="3" fill="none" />
      <path d="M220 60 L320 150" stroke="#10141A" strokeWidth="3" fill="none" />
      <path d="M220 60 L150 230" stroke="#10141A" strokeWidth="3" fill="none" />
      <path d="M320 150 L300 300" stroke="#10141A" strokeWidth="3" fill="none" />
      <path d="M150 230 L300 300" stroke="#10141A" strokeWidth="3" fill="none" />
      <path d="M150 230 L90 330" stroke="#10141A" strokeWidth="3" fill="none" />

      <circle cx="80" cy="100" r="24" fill="#CFE7E3" stroke="#10141A" strokeWidth="3" />
      <circle cx="220" cy="60" r="30" fill="#FAFAF7" stroke="#10141A" strokeWidth="3" />
      <circle cx="320" cy="150" r="20" fill="#0E7C79" stroke="#10141A" strokeWidth="3" />
      <circle cx="150" cy="230" r="36" fill="#FAFAF7" stroke="#10141A" strokeWidth="3" />
      <circle cx="300" cy="300" r="26" fill="#CFE7E3" stroke="#10141A" strokeWidth="3" />
      <circle cx="90" cy="330" r="18" fill="#0E7C79" stroke="#10141A" strokeWidth="3" />

      {/* Small "live" pulse, reusing the same blip motif used elsewhere on the site */}
      <circle cx="320" cy="150" r="5" fill="#EEF0EA">
        <animate attributeName="opacity" values="1;0.3;1" dur="2.2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export default function SpecializingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const graphicRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLUListElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const techHeadRef = useRef<HTMLHeadingElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { reducedMotion } = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

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

      // ── Tech rows: slide in ───────
      gsap.fromTo(rowRefs.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: techRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
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
          backgroundImage: 'radial-gradient(rgba(16,20,26,.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      {/* ── Solid colored circle (Open Peeps style) ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: '-10%', right: '-5%',
          width: '35%', paddingBottom: '35%', borderRadius: '50%',
          background: '#CFE7E3', border: '3px solid #10141A',
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      {/* ══════════════════════════════════════════════
          PART 1 — "I love working on" list
          ══════════════════════════════════════════════ */}
      <div
        style={{
          paddingTop: '96px', paddingBottom: '80px',
          position: 'relative', zIndex: 2,
          borderBottom: '3px solid #10141A',
        }}
      >
        <div className="container-main">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* Left — Graphic with HUD frame */}
            <div ref={graphicRef} className="lg:w-1/2 flex justify-center relative">
              {/* Bold thick border frame */}
              <div aria-hidden="true" style={{ position: 'absolute', inset: -12, borderRadius: 20, border: '3px solid #10141A', background: '#FAFAF7', boxShadow: '8px 8px 0px #10141A', pointerEvents: 'none', zIndex: -1 }} />

              <div
                className="w-full max-w-[400px] lg:max-w-[460px] relative flex items-center justify-center overflow-hidden"
                style={{ filter: 'drop-shadow(6px 6px 0px #10141A)', zIndex: 5, aspectRatio: '1 / 1', borderRadius: 8, backgroundColor: '#FAFAF7' }}
              >
                <img
                  src={`images/specialising-${hoveredIndex + 1}.png`}
                  alt={skills[hoveredIndex]?.title || 'Specializing'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
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
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0E7C79', display: 'inline-block', animation: 'sp-blip 2.2s ease-in-out infinite' }} />
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
                style={{ marginTop: 8, width: 40, height: 4, background: '#10141A', borderRadius: 2, marginBottom: 24 }}
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
                      setHoveredIndex(index);
                      const el = e.currentTarget as HTMLLIElement;
                      el.style.color = '#0E7C79';
                      const bg = el.querySelector('.sp-hover-bg') as HTMLSpanElement;
                      if (bg) bg.style.opacity = '1';
                      const ul = el.querySelector('.sp-underline') as HTMLSpanElement;
                      if (ul) ul.style.width = '100%';
                    }}
                    onMouseLeave={e => {
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
                        background: '#CFE7E3',
                        border: '3px solid #10141A',
                        boxShadow: '4px 4px 0px #10141A',
                        opacity: 0,
                        transform: 'rotate(-1deg)',
                        transition: 'opacity .25s ease',
                        pointerEvents: 'none',
                        zIndex: -1,
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
                          height: '4px', width: '0%',
                          background: '#10141A',
                          borderRadius: 2,
                          transition: 'width .4s cubic-bezier(.25,.46,.45,.94)',
                        }}
                      />
                    </span>
                  </li>
                ))}
              </ul>
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
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0E7C79', display: 'inline-block', animation: 'sp-blip 2.2s ease-in-out infinite' }} />
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
              <div style={{ marginTop: 8, width: 40, height: 4, background: '#10141A', borderRadius: 2 }} />
            </div>
            {/* Counter badge */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: '#FAFAF7',
              border: '3px solid #10141A',
              boxShadow: '4px 4px 0px #10141A',
              borderRadius: 100, padding: '8px 18px',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#0E7C79', animation: 'sp-blip 2s ease-in-out infinite' }} />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#0E7C79' }}>
                {TECH_ROWS.reduce((a, r) => a + r.length, 0)}+ tools
              </span>
            </div>
          </div>

          {/* Tech rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, overflow: 'hidden' }}>
            {TECH_ROWS.map((row, rowIdx) => (
              <div
                key={rowIdx}
                ref={el => { rowRefs.current[rowIdx] = el; }}
                style={{ opacity: 0 }} // Animated by GSAP
              >
                <div
                  className={`tech-marquee tech-marquee-${rowIdx % 2 === 0 ? 'left' : 'right'}`}
                  style={{ display: 'flex', gap: 12, width: 'max-content' }}
                >
                  {[...row, ...row, ...row, ...row].map((tech, j) => (
                    <div
                      key={j}
                      className="tech-chip"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        background: '#FAFAF7',
                        border: '3px solid #10141A',
                        borderRadius: 8,
                        padding: '10px 18px',
                        cursor: 'default',
                        transition: 'transform .2s, box-shadow .2s, background .2s',
                        boxShadow: '3px 3px 0px #10141A',
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLDivElement;
                        el.style.transform = 'translate(-4px, -4px) scale(1.02)';
                        el.style.boxShadow = '7px 7px 0px #10141A';
                        el.style.background = '#CFE7E3';
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLDivElement;
                        el.style.transform = '';
                        el.style.boxShadow = '3px 3px 0px #10141A';
                        el.style.background = '#FAFAF7';
                      }}
                    >
                      <span
                        style={{
                          fontSize: 15,
                          color: '#0E7C79',
                          lineHeight: 1,
                          width: 16,
                          height: 16,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {tech.Icon ? (
                          <tech.Icon size={16} />
                        ) : (
                          <span
                            style={{
                              fontFamily: "'IBM Plex Mono', monospace",
                              fontSize: 9,
                              fontWeight: 700,
                            }}
                          >
                            {tech.fallback}
                          </span>
                        )}
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
        .tech-marquee-left {
          animation: marquee-l 35s linear infinite;
        }
        .tech-marquee-right {
          animation: marquee-r 35s linear infinite;
        }
        .tech-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes marquee-l {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        @keyframes marquee-r {
          0% { transform: translateX(-25%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}