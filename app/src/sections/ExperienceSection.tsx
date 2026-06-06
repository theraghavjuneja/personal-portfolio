import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import ExperienceCard from '@/components/ExperienceCard';
import MorphingShape from '@/components/MorphingShape';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    dateRange: 'Present',
    company: 'CrowdStrike',
    title: 'Senior Product Design Manager',
    bullets: [
      'Scaled the cloud security design team, defining career ladders, critique culture, and hiring processes.',
      'Partnered with product & engineering leadership to define roadmap priorities.',
      'Shipped features used by 200k+ enterprise clients.',
    ],
    tag: 'B2B',
    tagColor: 'terracotta' as const,
    offset: 0,
  },
  {
    dateRange: '2018 — 2022',
    company: 'Ogilvy',
    title: 'Creative Director',
    bullets: [
      'Owned creative output from discovery through launch.',
      'Reduced client revision cycles by 25%.',
      'Scaled the internal design studio from 6 to 18 people.',
    ],
    tag: 'B2B',
    tagColor: 'terracotta' as const,
    offset: 40,
  },
  {
    dateRange: '2014 — 2018',
    company: 'Airbnb',
    title: 'Lead Experience Designer',
    bullets: [
      'Led design on the core guest booking flow.',
      'Collaborated directly with engineering and product leads.',
      'Delivered end-to-end design solutions from discovery to post-launch optimization.',
    ],
    tag: 'B2C',
    tagColor: 'forest-green' as const,
    offset: 20,
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const cards = cardsRef.current?.children;
    if (!cards) return;

    const ctx = gsap.context(() => {
      gsap.from(cards, {
        opacity: 0,
        y: 80,
        duration: 0.9,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
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
      className="bg-warm-cream relative pt-32 pb-24 lg:pt-40 lg:pb-32"
      style={{
        background: 'linear-gradient(to bottom, #FAF8F4 0%, #FAF8F4 85%, #F4C2C2 100%)',
      }}
    >
      {/* Decorative shapes */}
      <MorphingShape
        type="blob"
        color="#E2A74F"
        size={200}
        className="absolute bottom-[20%] left-[30%] opacity-30 hidden lg:block"
      />
      <MorphingShape
        type="squares"
        color="#C8563B"
        size={100}
        className="absolute bottom-[10%] left-[5%] hidden lg:block"
      />

      <div className="container-main">
        {/* Section Header */}
        <h2 className="font-display font-extrabold text-deep-charcoal leading-[1.0] tracking-[-0.02em]" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
          Experience<span className="text-terracotta">.</span>
        </h2>

        {/* Job Cards */}
        <div
          ref={cardsRef}
          className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {experiences.map((exp, index) => (
            <div
              key={index}
              style={{ marginTop: window.innerWidth >= 1024 ? `${exp.offset}px` : 0 }}
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
    </section>
  );
}
