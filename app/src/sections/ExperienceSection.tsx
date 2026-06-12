import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import ExperienceCard from '@/components/ExperienceCard';
import MorphingShape from '@/components/MorphingShape';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    dateRange: 'Nov 2025 - Present',
    company: 'Lexipitch',
    title: 'SDE-1 Backend',
    bullets: [
      'Architected disposition-based campaign management platform used by B2C enterprises for managing the sales cycle,',
      'Engineered multi-provider communication layer across 5+ providers',
      'Built and owned full observability stack from scratch — Promtail → Loki → Grafana pipeline',
      'Reduced cloud cost by over 40% through rightsizing and infrastructure optimisation',
      'Established CI/CD pipelines for automated build, test, and deployment workflows; designed resilient message infrastructure with RabbitMQ for async task queuing and Redis for ephemeral state'
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
      'Owned entire serverless infra on GCP- cloud run, cloud run jobs, firewalls, observability stack',
      'Architected end to end PDF translation platform - 20+ languages, 200 page documents',
      'Designed & coded the entire website & their razorpay powered payment orchestration layer',
      'PS: This platform is even better than DeepL & Google Translate.'
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
      'Developed multiple B2B chatbots using dialogflow with custom webhook integrations',
      'Engineered AI interview assistants- resume parsing, ATS.',
      'Build automated micro site builders using tool-calling capacity & automated hackathon listing processes',
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
