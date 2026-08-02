import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import TalkCard from '@/components/TalkCard';

gsap.registerPlugin(ScrollTrigger);

const talks = [
  { title: 'Fostering Creative Conviviality', image: '/images/talk-1.png' },
  { title: 'Designing with Data Transparency', image: '/images/talk-2.png' },
  { title: 'The Evolution of Collaboration', image: '/images/talk-3.png' },
  { title: 'Navigating Ethical Design Challenges', image: '/images/talk-4.png' },
  { title: 'Building for Consistency and Scale', image: '/images/talk-5.png' },
];

const toolIcons = [
  { name: 'Figma', svg: (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 28, height: 28 }}>
      <path d="M12 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0zm-8 4a4 4 0 0 1 4-4h4v4a4 4 0 1 1-8 0zm8-12v8h4a4 4 0 1 0 0-8h-4zM8 4a4 4 0 0 0 0 8h4V4H8zm0 12a4 4 0 0 0 0 8 4 4 0 0 0 4-4v-4H8z"/>
    </svg>
  )},
  { name: 'Sketch', svg: (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 28, height: 28 }}>
      <path d="M12 1.5l9.5 4.5-3.5 14h-12l-3.5-14L12 1.5z"/>
    </svg>
  )},
  { name: 'Framer', svg: (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 28, height: 28 }}>
      <path d="M4 0h16v8h-8v8h8v8h-8v-8h-8V0zm8 16h-8V8h8v8z"/>
    </svg>
  )},
  { name: 'Principle', svg: (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 28, height: 28 }}>
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="12" r="4"/>
    </svg>
  )},
  { name: 'Maze', svg: (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 28, height: 28 }}>
      <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" fill="none" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )},
  { name: 'Miro', svg: (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 28, height: 28 }}>
      <path d="M4 4h4v16H4V4zm6 0h4v16h-4V4zm6 0h4v16h-4V4z"/>
    </svg>
  )},
  { name: 'Notion', svg: (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 28, height: 28 }}>
      <path d="M4 4.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-15zM8 8h8v2H8V8zm0 4h8v2H8v-2zm0 4h5v2H8v-2z"/>
    </svg>
  )},
];

export default function TalksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const cards = cardsRef.current?.children;
    if (!cards) return;

    const ctx = gsap.context(() => {
      gsap.from(eyebrowRef.current, {
        opacity: 0, y: 14, duration: 0.55, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', toggleActions: 'play none none none' },
      });

      gsap.from(headingRef.current, {
        opacity: 0, y: 22, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });

      gsap.from(cards, {
        opacity: 0,
        y: 40,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      });

      if (toolsRef.current) {
        gsap.from(toolsRef.current.children, {
          opacity: 0,
          y: 16,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: toolsRef.current,
            start: 'top 90%',
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
      id="talks"
      style={{
        background: '#EEF0EA',
        paddingTop: '96px',
        paddingBottom: '120px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Dot-grid overlay */}
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

      {/* Teal glow — bottom right */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-14%',
          right: '-8%',
          width: '38%',
          paddingBottom: '38%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(14,124,121,.07) 0%, transparent 70%)',
          filter: 'blur(52px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container-main" style={{ position: 'relative', zIndex: 2 }}>
        {/* Eyebrow */}
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
            textTransform: 'uppercase' as const,
            color: '#0E7C79',
            marginBottom: 16,
          }}
        >
          <span
            style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#0E7C79',
              display: 'inline-block',
              animation: 'tk-blip 2.2s ease-in-out infinite',
            }}
          />
          Writing
        </div>

        {/* Heading */}
        <h2
          ref={headingRef}
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            fontWeight: 700,
            color: '#10141A',
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          I love to{' '}
          <span
            style={{
              background: '#CFE7E3',
              color: '#063C3B',
              borderRadius: 5,
              padding: '0 8px',
            }}
          >
            WRITE
          </span>
        </h2>

        <div
          style={{
            marginTop: 8,
            width: 40,
            height: 2,
            background: 'rgba(14,124,121,.35)',
            borderRadius: 2,
          }}
        />

        {/* Talk Cards Grid */}
        <div
          ref={cardsRef}
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {talks.map((talk, index) => (
            <div key={index} className={index === 3 ? 'sm:col-span-2 lg:col-span-1' : ''}>
              <TalkCard title={talk.title} image={talk.image} />
            </div>
          ))}
        </div>

        {/* Tool Icons Divider */}
        <div
          style={{
            marginTop: 72,
            paddingTop: 40,
            borderTop: '1px solid rgba(16,20,26,.1)',
          }}
        >
          <p
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase' as const,
              color: 'rgba(16,20,26,.35)',
              textAlign: 'center',
              marginBottom: 28,
            }}
          >
            Tools I use
          </p>

          <div
            ref={toolsRef}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 32,
            }}
          >
            {toolIcons.map((tool) => (
              <div
                key={tool.name}
                title={tool.name}
                style={{
                  color: 'rgba(16,20,26,.25)',
                  transition: 'color .2s ease, transform .2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.color = '#0E7C79';
                  (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.15)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.color = 'rgba(16,20,26,.25)';
                  (e.currentTarget as HTMLDivElement).style.transform = '';
                }}
              >
                {tool.svg}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes tk-blip {
          0%, 100% { box-shadow: 0 0 0 0 rgba(14,124,121,.55); }
          50%       { box-shadow: 0 0 0 5px rgba(14,124,121,0); }
        }
      `}</style>
    </section>
  );
}
