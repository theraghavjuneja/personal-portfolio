import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import PillButton from '@/components/PillButton';
import ScriptWord from '@/components/ScriptWord';
import MorphingShape from '@/components/MorphingShape';

gsap.registerPlugin(ScrollTrigger);

/* ─── Marquee content ──────────────────────────────────────────── */
const TICKER_ITEMS = [
  'backend engineer',
  '·',
  'cloud infrastructure',
  '·',
  'distributed systems',
  '·',
  'lexipitch',
  '·',
  'open to work',
  '·',
  'node.js  /  golang',
  '·',
  'postgresql  /  redis',
  '·',
];

/* ─── Stats ────────────────────────────────────────────────────── */
const STATS = [
  { value: '3+', label: 'years exp' },
  { value: '12+', label: 'projects shipped' },
  { value: '4', label: 'open-source libs' },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);
  const badgeRef   = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const shapesRef  = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useReducedMotion();

  /* ── Video: play on scroll-enter, pause on leave ──────────────── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted      = true;
    video.loop       = true;
    video.playsInline = true;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 90%',
      end: 'bottom 10%',
      onEnter:     () => video.play().catch(() => {}),
      onLeave:     () => video.pause(),
      onEnterBack: () => video.play().catch(() => {}),
      onLeaveBack: () => video.pause(),
    });

    return () => { trigger.kill(); video.pause(); };
  }, []);

  /* ── GSAP entrance animations ─────────────────────────────────── */
  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const ease = 'power3.out';

      /* Left column slides in from left */
      gsap.from(leftRef.current, {
        opacity: 0, x: -70, duration: 1.1, ease,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      });

      /* Video badge drops in */
      gsap.from(badgeRef.current, {
        opacity: 0, y: 18, duration: 0.7, ease, delay: 0.35,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      });

      /* Right column: each .ab-clip-inner slides up from its clip container */
      const clips = rightRef.current?.querySelectorAll('.ab-clip-inner');
      if (clips) {
        gsap.from(clips, {
          y: '105%',
          duration: 0.75,
          stagger: 0.10,
          ease,
          scrollTrigger: {
            trigger: rightRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      /* Stats pop in */
      const statEls = statsRef.current?.children;
      if (statEls) {
        gsap.from(statEls, {
          opacity: 0, y: 22, scale: 0.88,
          duration: 0.55, stagger: 0.12, ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }

      /* Decorative shapes */
      const shapeEls = shapesRef.current?.children;
      if (shapeEls) {
        gsap.from(shapeEls, {
          opacity: 0, scale: 0.6, duration: 0.8, stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
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
      className="relative bg-warm-cream overflow-hidden"
    >
      {/* ── Marquee ticker strip (top border) ─────────────────── */}
      <div className="ab-ticker-strip">
        <div className="ab-ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="ab-ticker-item">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Decorative shapes (absolute, pointer-events: none) ─── */}
      <div ref={shapesRef} className="absolute inset-0 pointer-events-none z-10">
        <MorphingShape
          type="starburst"
          color="#C8563B"
          size={72}
          className="absolute top-12 right-[30%]"
        />
        <MorphingShape
          type="star"
          color="#3A7056"
          size={56}
          className="absolute bottom-24 left-[44%]"
        />
        <MorphingShape
          type="waves"
          color="#E2A74F"
          size={68}
          className="absolute top-[42%] right-[6%]"
        />
        <MorphingShape
          type="swirl"
          color="#F4A8B0"
          size={50}
          className="absolute bottom-12 right-[18%]"
        />
      </div>

      {/* ── Main two-column body ───────────────────────────────── */}
      <div className="flex flex-col lg:flex-row min-h-[90vh]">

        {/* ── LEFT: Video panel ──────────────────────────────────── */}
        <div
          ref={leftRef}
          className="relative lg:w-[44%] w-full overflow-hidden"
          style={{ minHeight: '420px' }}
        >
          <video
            ref={videoRef}
            src="/images/video.mp4"
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ pointerEvents: 'none', userSelect: 'none' }}
          />

          {/* Vignette overlay */}
          <div className="ab-video-vignette" />

          {/* Film-label badge */}
          <div
            ref={badgeRef}
            className="ab-film-badge"
          >
            <span className="ab-film-badge__dot" />
            <span className="ab-film-badge__text">ABOUT / 01</span>
          </div>

          {/* Bottom frosted tag */}
          <div className="ab-glass-tag">
            <span className="ab-glass-tag__name">Raghav Juneja</span>
            <span className="ab-glass-tag__role">Backend Engineer</span>
          </div>
        </div>

        {/* ── RIGHT: Type column ─────────────────────────────────── */}
        <div
          ref={rightRef}
          className="lg:w-[56%] w-full flex flex-col justify-center
                     px-8 sm:px-12 lg:px-16 xl:px-20
                     py-16 lg:py-24"
        >
          {/* Eyebrow */}
          <div className="ab-line-reveal mb-6">
            <div className="ab-clip-inner">
              <p className="ab-eyebrow">
                <span className="ab-eyebrow__line" />
                Who I Am
              </p>
            </div>
          </div>

          {/* Headline */}
          <div className="ab-line-reveal mb-8">
            <div className="ab-clip-inner">
              <h2 className="ab-headline">
                Hi, I'm Raghav —{' '}
                <ScriptWord className="text-[1.08em]">
                  low-latency,
                </ScriptWord>{' '}
                high-impact{' '}
                <span className="ab-headline__accent">backend engineer.</span>
              </h2>
            </div>
          </div>

          {/* Para 1 */}
          <div className="ab-line-reveal">
            <div className="ab-clip-inner">
              <p className="ab-body">
                Over the last 3+ years I've architected cloud-native services
                that handle millions of requests, built event-driven pipelines
                on top of Kafka and Redis, and shipped resilient APIs used in
                production at Lexipitch and beyond.
              </p>
            </div>
          </div>

          {/* Para 2 */}
          <div className="ab-line-reveal mt-5">
            <div className="ab-clip-inner">
              <p className="ab-body">
                I care deeply about system reliability, developer experience,
                and clean abstractions — turning hairy distributed-systems
                problems into elegant, maintainable solutions at scale.
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div ref={statsRef} className="ab-stats mt-10">
            {STATS.map(({ value, label }) => (
              <div key={label} className="ab-stat">
                <span className="ab-stat__value">{value}</span>
                <span className="ab-stat__label">{label}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="ab-line-reveal mt-10">
            <div className="ab-clip-inner">
              <PillButton href="#experience" script>
                See my experience
              </PillButton>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom marquee divider ─────────────────────────────── */}
      <div className="ab-ticker-strip ab-ticker-strip--bottom">
        <div className="ab-ticker-track ab-ticker-track--reverse">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="ab-ticker-item">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
