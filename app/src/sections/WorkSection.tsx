import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import ProjectCard from '@/components/ProjectCard';
import MorphingShape from '@/components/MorphingShape';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Simplifying Urban Logistics',
    description: 'Optimizing last-mile delivery routes.',
    image: '/images/work-1.jpg',
    tags: ['Case Study', 'Product Strategy'],
    rotation: -2,
  },
  {
    title: 'Designing a frictionless mental wellness app',
    description: 'Creating an intuitive platform for mental well-being.',
    image: '/images/work-2.jpg',
    tags: ['Case Study', 'UX Lead'],
    rotation: 1,
  },
  {
    title: 'Bridging Digital & Physical: Evolving our B2B marketplace experience.',
    description: 'Digitizing inventory management and fulfillment.',
    image: '/images/work-3.jpg',
    tags: ['Case Study', 'Service Design'],
    rotation: -1,
  },
  {
    title: 'Designing with AI across the product lifecycle',
    description: 'AI augmented our creative workflow. It did not redefine our focus on human-centered design.',
    tags: ['Case Study', 'Leadership'],
    rotation: 2,
    dark: true,
  },
  {
    title: 'Harbor',
    description: 'Creating a simpler way to manage personal finances',
    image: '/images/work-5.jpg',
    tags: ['Case Study', 'App Design'],
    rotation: -1.5,
  },
  {
    title: 'Evolving our reading ecosystem.',
    description: 'Designing a focused reading experience for an e-commerce platform',
    image: '/images/work-6.jpg',
    tags: ['Case Study', 'Product Design'],
    rotation: 1.5,
  },
];

export default function WorkSection() {
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
        y: 60,
        duration: 0.8,
        stagger: 0.15,
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
      id="work"
      className="bg-warm-cream relative pt-32 pb-24 lg:pt-40 lg:pb-32"
    >
      {/* Decorative shapes */}
      <MorphingShape
        type="waves"
        color="#3A7056"
        size={80}
        className="absolute top-[45%] left-[5%] hidden lg:block"
      />
      <MorphingShape
        type="starburst"
        color="#E2A74F"
        size={60}
        className="absolute top-[55%] right-[5%] hidden lg:block"
      />

      <div className="container-main">
        {/* Section Header */}
        <h2 className="font-display font-bold text-deep-charcoal leading-[1.05] tracking-[-0.02em]" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
          Case Studies & Work
        </h2>
        <div className="mt-4 w-[60%] h-px bg-deep-charcoal/10" />

        {/* Project Grid */}
        <div
          ref={cardsRef}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className={index === 3 ? 'md:col-span-2 lg:col-span-1' : ''}
              style={{
                marginTop: index % 3 === 1 ? '24px' : index % 3 === 2 ? '12px' : '0',
              }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                image={project.image}
                tags={project.tags}
                rotation={project.rotation}
                dark={project.dark}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
