import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import PillButton from '@/components/PillButton';
import ScriptWord from '@/components/ScriptWord';
import MorphingShape from '@/components/MorphingShape';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Photo slides in from left
      gsap.from(photoRef.current, {
        opacity: 0,
        x: -60,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Decorative shapes fade in
      gsap.from(shapesRef.current?.children || [], {
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      // Text content line-by-line
      const textEls = textRef.current?.querySelectorAll('.reveal-line');
      if (textEls) {
        gsap.from(textEls, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
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
      id="about"
      className="bg-warm-cream relative pt-32 pb-24 lg:pt-40 lg:pb-32"
    >
      <div className="container-main">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left Column - Photo */}
          <div ref={photoRef} className="lg:w-[45%] relative">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/images/about-photo.jpg"
                alt="Raghav with his cat Ziggy"
                className="w-full aspect-[3/4] object-cover"
              />
              {/* Photo tag */}
              <div className="absolute bottom-4 left-4 bg-deep-charcoal text-white px-4 py-2 rounded-full">
                <span className="font-body font-medium text-xs tracking-wide">
                  Raghav & his cat, Ziggy
                </span>
              </div>
            </div>

            {/* Decorative shapes around photo */}
            <div ref={shapesRef} className="absolute inset-0 pointer-events-none">
              <MorphingShape
                type="star"
                color="#3A7056"
                size={70}
                className="absolute -top-6 -right-4"
              />
              <MorphingShape
                type="swirl"
                color="#F4A8B0"
                size={60}
                className="absolute -bottom-4 -left-8"
              />
              <MorphingShape
                type="smiley"
                color="#E2A74F"
                size={50}
                className="absolute top-[40%] -left-10"
              />
            </div>
          </div>

          {/* Right Column - Text */}
          <div ref={textRef} className="lg:w-[55%] lg:pt-8">
            <h2 className="reveal-line font-display font-bold text-deep-charcoal leading-[1.05] tracking-[-0.02em]" style={{ fontSize: 'clamp(26px, 3.5vw, 44px)' }}>
              Hi, I'm Raghav Juneja — a <ScriptWord className="text-[1.1em]">low-ego, high-impact</ScriptWord> product design leader based in Berlin, Germany.
            </h2>

            <p className="reveal-line mt-8 font-body text-lg text-mid-gray leading-relaxed">
              Over the last 10+ years, I've built a career around designing with empathy and clarity, collaborating across disciplines, and helping teams bring clarity to complexity.
            </p>

            <p className="reveal-line mt-6 font-body text-lg text-mid-gray leading-relaxed">
              As a Principal Design Manager, I lead with intentionality and data, guiding designers to not just build great products, but to ask better questions, challenge assumptions, and always consider the 'why' behind the work.
            </p>

            <div className="reveal-line mt-10">
              <PillButton href="#experience" script>
                Learn about how I lead
              </PillButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
