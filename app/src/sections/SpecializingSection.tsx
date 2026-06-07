import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { title: 'building & shipping products', image: 'building-and-shipping.png' },
  { title: 'delivering on business goals', image: 'delivering-on-goals.png' },
  { title: 'systems thinking', image: 'system-thinking.png' },
  { title: 'cross-functional leadership', image: 'cross-functional-leadership.png' },
  { title: 'mentoring designers', image: 'mentoring-designers.png' },
  { title: 'product analytics', image: 'product-analytics.png' },
  { title: 'growth design', image: 'growth-design.png' },
  { title: 'user research', image: 'user-research.png' },
  { title: 'data visualization', image: 'data-visusalisation.png' },
];

export default function SpecializingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const graphicRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const skillsRef = useRef<HTMLUListElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useReducedMotion();
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Blob 1 — drifts in a slow elliptical path
      gsap.to(blob1Ref.current, {
        x: 60,
        y: -40,
        duration: 8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      // Blob 2 — counters blob1 for visual balance
      gsap.to(blob2Ref.current, {
        x: -50,
        y: 50,
        duration: 10,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 1.5,
      });

      // Blob 3 — smaller, faster accent blob
      gsap.to(blob3Ref.current, {
        x: 40,
        y: 30,
        duration: 6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.8,
      });

      // Radial pulse behind graphic
      gsap.to(pulseRef.current, {
        scale: 1.18,
        opacity: 0.35,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      // Graphic entrance
      gsap.from(graphicRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Heading
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      // Skills stagger
      const skillItems = skillsRef.current?.children;
      if (skillItems) {
        gsap.from(skillItems, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 80%',
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
      className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #F4C2C2 0%, #F9E8B0 100%)',
      }}
    >
      {/* ── Animated gradient mesh blobs ── */}
      <div
        ref={blob1Ref}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-8%',
          width: '55%',
          paddingBottom: '55%',
          borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%',
          background:
            'radial-gradient(ellipse at 40% 40%, rgba(249,157,120,0.38) 0%, rgba(244,194,194,0.18) 60%, transparent 80%)',
          filter: 'blur(32px)',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />
      <div
        ref={blob2Ref}
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-12%',
          right: '-6%',
          width: '48%',
          paddingBottom: '48%',
          borderRadius: '45% 55% 40% 60% / 60% 40% 55% 45%',
          background:
            'radial-gradient(ellipse at 60% 55%, rgba(249,220,145,0.45) 0%, rgba(244,194,194,0.15) 55%, transparent 80%)',
          filter: 'blur(36px)',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />
      <div
        ref={blob3Ref}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '35%',
          left: '38%',
          width: '30%',
          paddingBottom: '30%',
          borderRadius: '50% 50% 55% 45% / 45% 55% 45% 55%',
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(255,210,140,0.32) 0%, rgba(249,157,120,0.1) 55%, transparent 75%)',
          filter: 'blur(24px)',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />

      {/* ── Subtle grain texture overlay ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
          pointerEvents: 'none',
          opacity: 0.6,
        }}
      />

      {/* ── Main content ── */}
      <div className="container-main relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left Column — Graphic with radial pulse halo */}
          <div ref={graphicRef} className="lg:w-1/2 flex justify-center relative">
            {/* Pulsing halo behind image */}
            <div
              ref={pulseRef}
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: '-16%',
                borderRadius: '50%',
                background:
                  'radial-gradient(ellipse at 50% 50%, rgba(249,157,120,0.28) 0%, rgba(249,220,145,0.18) 50%, transparent 72%)',
                filter: 'blur(12px)',
                opacity: 0.5,
                willChange: 'transform, opacity',
                pointerEvents: 'none',
              }}
            />
            <img
              src={hoveredImage ? `/images/${hoveredImage}` : "/images/specializing-graphic.png"}
              alt={hoveredImage ? "Hovered skill illustration" : "Abstract creative energy illustration"}
              className="w-full max-w-[400px] lg:max-w-[480px] relative z-10 transition-opacity duration-300"
              style={{ filter: 'drop-shadow(0 12px 32px rgba(210,120,80,0.18))' }}
            />
          </div>

          {/* Right Column — Skills */}
          <div className="lg:w-1/2">
            <h2
              ref={headingRef}
              className="font-display font-bold text-deep-charcoal leading-[1.05] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}
            >
              I love working on
            </h2>

            <ul ref={skillsRef} className="mt-10 space-y-1">
              {skills.map((skill, index) => (
                <li
                  key={index}
                  className="group relative font-display font-medium text-deep-charcoal leading-[1.15] tracking-[-0.01em] cursor-default"
                  style={{ fontSize: 'clamp(20px, 2.5vw, 32px)' }}
                  onMouseEnter={() => setHoveredImage(skill.image)}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  {/* Hover shimmer highlight bar */}
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      inset: '-2px -12px',
                      borderRadius: '8px',
                      background:
                        'linear-gradient(90deg, rgba(249,157,120,0.0) 0%, rgba(249,220,145,0.22) 40%, rgba(249,157,120,0.14) 100%)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      pointerEvents: 'none',
                    }}
                    className="skill-hover-bg"
                  />

                  {/* Animated gradient underline */}
                  <span className="relative inline-block py-1.5">
                    {skill.title}
                    <span
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        height: '1.5px',
                        width: '0%',
                        background:
                          'linear-gradient(90deg, #F09070 0%, #F9DC91 50%, #F09070 100%)',
                        backgroundSize: '200% 100%',
                        borderRadius: '2px',
                        transition: 'width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        animation: 'shimmer-line 2.5s linear infinite',
                      }}
                      className="skill-underline"
                    />
                  </span>
                </li>
              ))}
            </ul>

            {/* Floating decorative dots */}
            <div
              aria-hidden="true"
              style={{
                marginTop: '2.5rem',
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
              }}
            >
              {[0.9, 0.55, 0.3].map((opacity, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    width: i === 0 ? '8px' : i === 1 ? '6px' : '5px',
                    height: i === 0 ? '8px' : i === 1 ? '6px' : '5px',
                    borderRadius: '50%',
                    background: `rgba(210, 110, 70, ${opacity})`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Hover & keyframe styles ── */}
      <style>{`
        .group:hover .skill-hover-bg {
          opacity: 1 !important;
        }
        .group:hover .skill-underline {
          width: 100% !important;
        }
        @keyframes shimmer-line {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </section>
  );
}