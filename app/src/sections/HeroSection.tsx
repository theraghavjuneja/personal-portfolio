import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import PillButton from '@/components/PillButton';
// import ScriptWord from '@/components/ScriptWord';
import MorphingShape from '@/components/MorphingShape';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Animate headline words
      const words = headlineRef.current?.querySelectorAll('.word');
      if (words) {
        gsap.from(words, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.2,
        });
      }

      // Animate illustration
      gsap.from(illustrationRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5,
      });

      // Animate decorative shapes
      gsap.from(shapesRef.current?.children || [], {
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 0.8,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-warm-cream flex items-center pt-[72px] overflow-hidden"
    >
      {/* Decorative Shapes */}
      <div ref={shapesRef} className="absolute inset-0 pointer-events-none">
        <MorphingShape
          type="spiral"
          color="#3A7056"
          size={120}
          className="absolute top-[15%] left-[45%]"
        />
        <MorphingShape
          type="starburst"
          color="#C8563B"
          size={80}
          className="absolute top-[60%] left-[8%]"
        />
        <MorphingShape
          type="blob"
          color="#E2A74F"
          size={100}
          className="absolute bottom-[15%] right-[12%]"
        />
      </div>

      <div className="w-full px-6 lg:pl-16 xl:pl-24 lg:pr-0 py-16 lg:py-0 relative">
        {/* Currently Sticker */}
        <div
          className="absolute top-0 right-4 lg:top-8 lg:right-12 z-20 bg-white/90 backdrop-blur-sm border border-deep-charcoal/10 rounded-lg px-4 py-3 shadow-sm"
          style={{ transform: 'rotate(-3deg)' }}
        >
          <p className="text-[10px] font-body font-medium tracking-[0.08em] uppercase text-deep-charcoal/60">
            Currently
          </p>
          <p className="text-sm font-body font-medium text-deep-charcoal mt-0.5">
            backend engineer @ Lexipitch
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center min-h-[calc(100vh-72px)]">
          {/* Left Column - Text */}
          <div ref={headlineRef} className="lg:w-[40%] w-full relative z-10 pt-12 lg:pt-0 pr-4">
            <h1 className="font-display font-extrabold text-deep-charcoal leading-[0.95] tracking-[-0.03em]" style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}>
              <span className="word inline-block">Hi,</span>{' '}
              <span className="word inline-block">I'm</span>{' '}
              <span className="word inline-block">Raghav</span>{' '}
              <span className="word inline-block">Juneja.</span>
            </h1>

            {/* <h2 className="mt-6 font-display font-bold text-deep-charcoal leading-[1.0] tracking-[-0.02em]" style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>
              <span className="word inline-block">I</span>{' '}
              <span className="word inline-block">construct</span>{' '}
              <span className="word inline-block"><ScriptWord>impactful</ScriptWord></span>{' '}
              <span className="word inline-block"><ScriptWord>digital products,</ScriptWord></span>{' '}
              <span className="word inline-block">build</span>{' '}
              <span className="word inline-block">and</span>{' '}
              <span className="word inline-block">grow</span>{' '}
              <span className="word inline-block">design</span>{' '}
              <span className="word inline-block">cultures,</span>{' '}
              <span className="word inline-block">and</span>{' '}
              <span className="word inline-block">solve</span>{' '}
              <span className="word inline-block">complex</span>{' '}
              <span className="word inline-block">user</span>{' '}
              <span className="word inline-block">problems.</span>
            </h2> */}

            <div className="word mt-10">
              <PillButton href="#work">View Work</PillButton>
            </div>
          </div>

          {/* Right Column - Illustration */}
          <div
            ref={illustrationRef}
            className="lg:w-[60%] w-full relative flex justify-end items-center mt-12 lg:mt-0"
          >
            {/* Main Illustration */}
            <img
              src="/images/hero-illustration.png"
              alt="Raghav sketching on iPad Pro at drafting desk"
              className="w-full h-auto object-contain animate-float"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
