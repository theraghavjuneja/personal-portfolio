import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import TalkCard from '@/components/TalkCard';

gsap.registerPlugin(ScrollTrigger);

const talks = [
  {
    title: 'Fostering Creative Conviviality',
    image: '/images/talk-1.png',
  },
  {
    title: 'Designing with Data Transparency',
    image: '/images/talk-2.png',
  },
  {
    title: 'The Evolution of Collaboration',
    image: '/images/talk-3.png',
  },
  {
    title: 'Navigating Ethical Design Challenges',
    image: '/images/talk-4.png',
  },
  {
    title: 'Building for Consistency and Scale',
    image: '/images/talk-5.png',
  },
];

const toolIcons = [
  { name: 'Figma', svg: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M12 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0zm-8 4a4 4 0 0 1 4-4h4v4a4 4 0 1 1-8 0zm8-12v8h4a4 4 0 1 0 0-8h-4zM8 4a4 4 0 0 0 0 8h4V4H8zm0 12a4 4 0 0 0 0 8 4 4 0 0 0 4-4v-4H8z"/>
    </svg>
  )},
  { name: 'Sketch', svg: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M12 1.5l9.5 4.5-3.5 14h-12l-3.5-14L12 1.5z"/>
    </svg>
  )},
  { name: 'Framer', svg: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M4 0h16v8h-8v8h8v8h-8v-8h-8V0zm8 16h-8V8h8v8z"/>
    </svg>
  )},
  { name: 'Principle', svg: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="12" r="4"/>
    </svg>
  )},
  { name: 'Maze', svg: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" fill="none" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )},
  { name: 'Miro', svg: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M4 4h4v16H4V4zm6 0h4v16h-4V4zm6 0h4v16h-4V4z"/>
    </svg>
  )},
  { name: 'Notion', svg: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M4 4.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-15zM8 8h8v2H8V8zm0 4h8v2H8v-2zm0 4h5v2H8v-2z"/>
    </svg>
  )},
];

export default function TalksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const cards = cardsRef.current?.children;
    if (!cards) return;

    const ctx = gsap.context(() => {
      gsap.from(cards, {
        opacity: 0,
        y: 50,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      if (toolsRef.current) {
        gsap.from(toolsRef.current.children, {
          opacity: 0,
          y: 20,
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
      className="relative pt-24 pb-32 lg:pt-32 lg:pb-40"
      style={{
        background: 'linear-gradient(135deg, #F9E8B0 0%, #F4C2C2 100%)',
      }}
    >
      <div className="container-main">
        {/* Section Header */}
        <h2
          className="font-display font-bold text-deep-charcoal leading-[1.05] tracking-[-0.02em]"
          style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}
        >
          I love to WRITE
        </h2>

        {/* Talk Cards Grid */}
        <div
          ref={cardsRef}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {talks.map((talk, index) => (
            <div key={index} className={index === 3 ? 'sm:col-span-2 lg:col-span-1' : ''}>
              <TalkCard title={talk.title} image={talk.image} />
            </div>
          ))}
        </div>

        {/* Tool Icons Row */}
        <div
          ref={toolsRef}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 lg:gap-12"
        >
          {toolIcons.map((tool) => (
            <div
              key={tool.name}
              className="text-deep-charcoal/40 hover:text-deep-charcoal/70 hover:scale-110 transition-all duration-200 cursor-pointer"
              title={tool.name}
            >
              {tool.svg}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
