import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import PillButton from '@/components/PillButton';
import MorphingShape from '@/components/MorphingShape';
function Word({
  children,
  wordIndex,
  style,
  className = '',
}: {
  children: React.ReactNode;
  wordIndex: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <span
      className={`word ${className}`}
      style={{ '--word-i': wordIndex, ...style } as React.CSSProperties}
    >
      {children}
    </span>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(illustrationRef.current, {
        opacity: 0,
        scale: 0.97,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.8,
      });

      gsap.from(shapesRef.current?.children || [], {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        stagger: 0.18,
        ease: 'back.out(1.7)',
        delay: 1.4,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-warm-cream flex items-center pt-[56px] overflow-hidden"
    >
      {}
      <style>{`
        @keyframes wordDropIn {
          from { opacity: 0; transform: translateY(-28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .hero-headline .word {
          display: inline-block;
          opacity: 0;
          animation: wordDropIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: calc(var(--word-i) * 100ms + 100ms);
        }

        
        .hero-h1 {
          font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
          font-size: clamp(60px, 7.5vw, 96px);
          font-weight: 800;
          letter-spacing: -3px;
          line-height: 1.0;
          color: var(--color-deep-charcoal, #1a1a1a);
        }

        
        .hero-h2 {
          font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
          font-size: clamp(22px, 2.6vw, 36px);
          font-weight: 500;
          letter-spacing: -0.5px;
          line-height: 1.45;
          color: #3a3a3a;
        }

        
        .hero-accent {
          font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
          font-style: italic;
          font-weight: 600;
          font-size: 1.18em;
          color: #C8563B;
          letter-spacing: 0px;
        }

        
        @keyframes stickerIn {
          from { opacity: 0; transform: rotate(-3deg) scale(0.88) translateY(-8px); }
          to   { opacity: 1; transform: rotate(-3deg) scale(1) translateY(0); }
        }
        .currently-sticker {
          animation: stickerIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: 1.6s;
          opacity: 0;
        }

        
        .hero-cta {
          opacity: 0;
          animation: fadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: calc(19 * 100ms + 300ms);
        }

        
        .hero-grid {
          background-image:
            linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        
        @keyframes pulseGreen {
          0%, 100% { box-shadow: 0 0 0 0 rgba(58, 112, 86, 0.35); }
          50%       { box-shadow: 0 0 0 6px rgba(58, 112, 86, 0); }
        }
        .avail-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #3A7056;
          animation: pulseGreen 2s ease-in-out infinite;
          flex-shrink: 0;
        }
      `}</style>

      {}
      <div className="hero-grid absolute inset-0 pointer-events-none" />

      {}
      
      <div ref={shapesRef} className="absolute inset-0 pointer-events-none">
        {}
        <MorphingShape
          type="spiral"
          color="#3A7056"
          size={88}
          className="absolute top-[10%] right-[38%]"
        />
        {}
        <MorphingShape
          type="starburst"
          color="#C8563B"
          size={64}
          className="absolute top-[52%] right-[5%]"
        />
        {}
        <MorphingShape
          type="blob"
          color="#E2A74F"
          size={80}
          className="absolute bottom-[10%] right-[18%]"
        />
      </div>

      <div className="w-full relative">

        {}
        {/*
          CHANGES:
          - Pushed to top-right corner as before, but given stronger presence:
            border is slightly darker, shadow is more pronounced, font is larger
          - Added subtle pulsing green "available" dot for personality
        */}
        <div
          className="currently-sticker absolute top-4 right-5 lg:top-8 lg:right-14 z-20
                     bg-white border border-deep-charcoal/15 rounded-xl
                     px-4 py-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.10)]"
          style={{ transform: 'rotate(-3deg)' }}
        >
          <p className="text-[9px] font-body font-semibold tracking-[0.12em] uppercase text-deep-charcoal/40 mb-1">
            Currently
          </p>
          <p className="text-[13px] font-body font-semibold text-deep-charcoal leading-tight">
            backend engineer @ Lexipitch
          </p>
          {}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="avail-dot" />
            <span className="text-[10px] font-body font-medium text-[#3A7056]">Open to work</span>
          </div>
        </div>

        {}
        <div className="flex flex-col lg:flex-row items-center min-h-[calc(100vh-56px)] px-6 lg:pl-20 xl:pl-28 lg:pr-0">

          
          <div className="lg:w-[42%] w-full relative z-10 pt-10 lg:pt-0 pr-6 lg:pr-8">

            {}
            <div
              className="hero-cta mb-6 h-px w-10 bg-[#C8563B]"
              style={{ animationDelay: '0ms', opacity: 0 }}
            />

            
            <h1 className="hero-headline hero-h1">
              <Word wordIndex={0}>Hi,</Word>
              {' '}
              <Word wordIndex={1}>I&apos;m</Word>
              {' '}
              <Word wordIndex={2}>Raghav</Word>
              {' '}
              <Word wordIndex={3}>Juneja.</Word>
            </h1>

            
            <h2 className="hero-headline hero-h2 mt-8">
              <Word wordIndex={4}>I</Word>
              {' '}
              <Word wordIndex={5}>architect</Word>
              {' '}
              
              <Word wordIndex={6} className="hero-accent">
                scalable&nbsp;backend&nbsp;systems,
              </Word>
              {' '}
              <Word wordIndex={7}>build</Word>
              {' '}
              <Word wordIndex={8}>resilient</Word>
              {' '}
              <Word wordIndex={9}>cloud</Word>
              {' '}
              <Word wordIndex={10}>infrastructure,</Word>
              {' '}
              <Word wordIndex={11}>and</Word>
              {' '}
              <Word wordIndex={12}>solve</Word>
              {' '}
              <Word wordIndex={13}>complex</Word>
              {' '}
              <Word wordIndex={14}>engineering</Word>
              {' '}
              <Word wordIndex={15}>problems</Word>
              {' '}
              <Word wordIndex={16}>at</Word>
              {' '}
              <Word wordIndex={17}>scale.</Word>
            </h2>

            
            <div className="hero-cta mt-10 flex items-center gap-5">
              <PillButton href="#work">View Work</PillButton>

              {}
              <div className="flex items-center gap-4 text-deep-charcoal/45">
                <span className="h-4 w-px bg-deep-charcoal/15" />
                <div className="text-center">
                  <p className="text-[15px] font-display font-bold text-deep-charcoal leading-none">3+</p>
                  <p className="text-[10px] font-body tracking-wide uppercase mt-0.5">yrs exp</p>
                </div>
                <span className="h-4 w-px bg-deep-charcoal/15" />
                <div className="text-center">
                  <p className="text-[15px] font-display font-bold text-deep-charcoal leading-none">12+</p>
                  <p className="text-[10px] font-body tracking-wide uppercase mt-0.5">projects</p>
                </div>
              </div>
            </div>

          </div>

          
          <div
            ref={illustrationRef}
            className="lg:w-[58%] w-full relative flex justify-end items-center mt-14 lg:mt-0"
          >
            <img
              src="/images/hero-illustration.png"
              alt="Raghav Juneja working at a developer desk surrounded by tech stack diagrams"
              className="w-full max-w-[880px] xl:max-w-[800px] h-auto object-contain animate-float transform origin-right scale-110 lg:scale-125"
            />
          </div>

        </div>
      </div>
    </section>
  );
}