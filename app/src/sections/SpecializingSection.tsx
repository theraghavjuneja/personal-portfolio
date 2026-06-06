import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  'building & shipping products',
  'delivering on business goals',
  'systems thinking',
  'cross-functional leadership',
  'mentoring designers',
  'product analytics',
  'growth design',
  'user research',
  'data visualization',
];

export default function SpecializingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const graphicRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const skillsRef = useRef<HTMLUListElement>(null);
  const { reducedMotion } = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
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
      className="relative pt-32 pb-24 lg:pt-40 lg:pb-32"
      style={{
        background: 'linear-gradient(135deg, #F4C2C2 0%, #F9E8B0 100%)',
      }}
    >
      <div className="container-main">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Column - Graphic */}
          <div ref={graphicRef} className="lg:w-1/2 flex justify-center">
            <img
              src="/images/specializing-graphic.png"
              alt="Abstract creative energy illustration"
              className="w-full max-w-[400px] lg:max-w-[480px]"
            />
          </div>

          {/* Right Column - Skills */}
          <div className="lg:w-1/2">
            <h2
              ref={headingRef}
              className="font-display font-bold text-deep-charcoal leading-[1.05] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}
            >
              Specializing in
            </h2>

            <ul ref={skillsRef} className="mt-10 space-y-3">
              {skills.map((skill, index) => (
                <li
                  key={index}
                  className="font-display font-medium text-deep-charcoal leading-[1.15] tracking-[-0.01em]"
                  style={{ fontSize: 'clamp(20px, 2.5vw, 32px)' }}
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
