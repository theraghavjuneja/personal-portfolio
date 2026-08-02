import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import ExperienceCard from '@/components/ExperienceCard';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    dateRange: 'Nov 2025 - Present',
    company: 'Lexipitch',
    title: 'SDE-1 Backend',
    bullets: [
      'Architected disposition-based campaign management platform used by B2C enterprises for managing the sales cycle',
      'Engineered multi-provider communication layer across 5+ providers',
      'Built and owned full observability stack from scratch — Promtail → Loki → Grafana pipeline',
      'Reduced cloud cost by over 40% through rightsizing and infrastructure optimisation',
      'Established CI/CD pipelines for automated build, test, and deployment workflows',
    ],
    tag: 'B2B',
    tagColor: 'terracotta' as const,
    offset: 0,
  },
  {
    dateRange: 'Jan 2025 — Nov 2025',
    company: 'Texlate',
    title: 'Founding Engineer',
    bullets: [
      'Owned entire serverless infra on GCP — cloud run, cloud run jobs, firewalls, observability stack',
      'Architected end to end PDF translation platform — 20+ languages, 200 page documents',
      'Designed & coded the entire website & their Razorpay powered payment orchestration layer',
      'PS: This platform is even better than DeepL & Google Translate.',
    ],
    tag: 'B2C',
    tagColor: 'terracotta' as const,
    offset: 40,
  },
  {
    dateRange: 'April 2024 — December 2024',
    company: 'WhereUElevate',
    title: 'SDE Intern',
    bullets: [
      'Developed multiple B2B chatbots using Dialogflow with custom webhook integrations',
      'Engineered AI interview assistants — resume parsing, ATS',
      'Built automated micro-site builders using tool-calling capacity & automated hackathon listing processes',
    ],
    tag: 'B2C',
    tagColor: 'forest-green' as const,
    offset: 20,
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const cards = cardsRef.current?.children;
    if (!cards) return;

    const ctx = gsap.context(() => {
      // Eyebrow
      gsap.from(eyebrowRef.current, {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      });

      // Heading
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Cards stagger in
      gsap.from(cards, {
        opacity: 0,
        y: 48,
        duration: 0.8,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      style={{ background: '#EEF0EA', paddingTop: '96px', paddingBottom: '96px', position: 'relative', overflow: 'hidden' }}
    >
      {/* Subtle dot grid overlay — mirrors hero left-panel */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(16,20,26,.1) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Teal accent stripe — top-left decorative mark */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '2px',
          background: 'linear-gradient(90deg, #0E7C79 0%, transparent 60%)',
          zIndex: 1,
        }}
      />

      <div className="container-main" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section eyebrow */}
        <div
          ref={eyebrowRef}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#0E7C79',
            marginBottom: 16,
          }}
        >
          <span
            style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#0E7C79',
              display: 'inline-block',
              animation: 'exp-blip 2.2s ease-in-out infinite',
            }}
          />
          Career
        </div>

        {/* Section heading */}
        <h2
          ref={headingRef}
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: 'clamp(32px, 4vw, 56px)',
            fontWeight: 700,
            color: '#10141A',
            letterSpacing: '-0.03em',
            lineHeight: 1.06,
            margin: 0,
          }}
        >
          Experience
          <span style={{ color: '#0E7C79' }}>.</span>
        </h2>

        <div
          style={{
            marginTop: 8,
            width: 48,
            height: 4,
            background: '#10141A',
            borderRadius: 2,
          }}
        />

        {/* Job Cards */}
        <div
          ref={cardsRef}
          className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {experiences.map((exp, index) => (
            <div
              key={index}
              style={{ marginTop: typeof window !== 'undefined' && window.innerWidth >= 1024 ? `${exp.offset}px` : 0 }}
            >
              <ExperienceCard
                dateRange={exp.dateRange}
                company={exp.company}
                title={exp.title}
                bullets={exp.bullets}
                tag={exp.tag}
                tagColor={exp.tagColor}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes exp-blip {
          0%, 100% { box-shadow: 0 0 0 0 rgba(14,124,121,.55); }
          50%       { box-shadow: 0 0 0 5px rgba(14,124,121,0); }
        }
      `}</style>
    </section>
  );
}
