import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMediumArticles, type MediumArticle } from '@/hooks/useMediumArticles';

gsap.registerPlugin(ScrollTrigger);

const MEDIUM_PROFILE_URL = 'https://medium.com/@raghavjuneja386';

// Hardcoded safety net. If the live fetch to /api/medium-articles ever
// fails (Medium down, blocked, network issue, whatever), these render
// instead — so the section is never empty or broken. Update this list
// by hand whenever you publish something you're proud of.
const TOP_5_ARTICLES: MediumArticle[] = [
  {
    title: "Your Load Balancer Is Lying to You (And You're Probably Letting It)",
    link: 'https://medium.com/@raghavjuneja386/your-load-balancer-is-lying-to-you-and-youre-probably-letting-it-2c62b44b056a',
    description:
      'A real production incident that exposed how load balancer health checks can mask failures instead of catching them.',
    pubDate: '2026-06-11',
    thumbnail: null,
  },
  {
    title: 'This One Mistake Decreased Our API Throughput by 40-80%',
    link: 'https://medium.com/@raghavjuneja386/this-one-mistake-decreased-our-api-throughput-by-40-80-041127683ba6',
    description:
      'How a single overlooked configuration choice quietly crippled API performance at scale.',
    pubDate: '2026-03-19',
    thumbnail: null,
  },
  {
    title: 'depends_on Is Lying to You — The Docker Healthcheck Fix No One Talks About',
    link: 'https://medium.com/@raghavjuneja386/depends-on-is-lying-to-you-the-docker-healthcheck-fix-no-one-talks-about-58b53afba715',
    description:
      "Why Docker Compose's depends_on doesn't guarantee readiness, and the healthcheck pattern that actually fixes it.",
    pubDate: '2026-03-14',
    thumbnail: null,
  },
  {
    title:
      'Stop Throwing Random Exceptions: Production-Grade Exception Handling for Microservices',
    link: 'https://medium.com/@raghavjuneja386/stop-throwing-random-exceptions-production-grade-exception-handling-for-micro-services-a384317d8608',
    description:
      'A structured approach to exception handling that keeps microservices debuggable instead of chaotic.',
    pubDate: '2026-05-18',
    thumbnail: null,
  },
  {
    title: 'The Secret Behind Fast Websites: A Practical Guide to CDNs',
    link: 'https://medium.com/@raghavjuneja386/the-secret-behind-fast-websites-a-practical-guide-to-cdns-c3f522a7fa4f',
    description:
      "What a CDN actually does beyond 'making images load faster,' explained from first principles.",
    pubDate: '2026-06-12',
    thumbnail: null,
  },
];

const toolIcons = [
  {
    name: 'Figma', svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 28, height: 28 }}>
        <path d="M12 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0zm-8 4a4 4 0 0 1 4-4h4v4a4 4 0 1 1-8 0zm8-12v8h4a4 4 0 1 0 0-8h-4zM8 4a4 4 0 0 0 0 8h4V4H8zm0 12a4 4 0 0 0 0 8 4 4 0 0 0 4-4v-4H8z" />
      </svg>
    )
  },
  {
    name: 'Sketch', svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 28, height: 28 }}>
        <path d="M12 1.5l9.5 4.5-3.5 14h-12l-3.5-14L12 1.5z" />
      </svg>
    )
  },
  {
    name: 'Framer', svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 28, height: 28 }}>
        <path d="M4 0h16v8h-8v8h8v8h-8v-8h-8V0zm8 16h-8V8h8v8z" />
      </svg>
    )
  },
  {
    name: 'Principle', svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 28, height: 28 }}>
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    )
  },
  {
    name: 'Maze', svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 28, height: 28 }}>
        <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  },
  {
    name: 'Miro', svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 28, height: 28 }}>
        <path d="M4 4h4v16H4V4zm6 0h4v16h-4V4zm6 0h4v16h-4V4z" />
      </svg>
    )
  },
  {
    name: 'Notion', svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 28, height: 28 }}>
        <path d="M4 4.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-15zM8 8h8v2H8V8zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" />
      </svg>
    )
  },
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function ArticleCard({ article }: { article: MediumArticle }) {
  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: '#FAFAF7',
        border: '3px solid #10141A',
        borderRadius: 12,
        boxShadow: '5px 5px 0px #10141A',
        overflow: 'hidden',
        textDecoration: 'none',
        color: '#10141A',
        transition: 'transform .15s ease, box-shadow .15s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translate(-2px, -2px)';
        e.currentTarget.style.boxShadow = '7px 7px 0px #10141A';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = '5px 5px 0px #10141A';
      }}
    >
      {article.thumbnail && (
        <div style={{ width: '100%', height: 140, overflow: 'hidden', borderBottom: '3px solid #10141A' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.thumbnail}
            alt=""
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}

      <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <p
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#0E7C79',
            margin: 0,
          }}
        >
          {formatDate(article.pubDate)}
        </p>

        <h3
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: 17,
            fontWeight: 700,
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
            margin: 0,
          }}
        >
          {article.title}
        </h3>

        <p
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 13.5,
            lineHeight: 1.5,
            color: 'rgba(16,20,26,.62)',
            margin: 0,
            flex: 1,
          }}
        >
          {article.description}
        </p>

        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#10141A',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            marginTop: 4,
          }}
        >
          Read on Medium
          <svg viewBox="0 0 24 10" width="20" height="9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 5h18" /><path d="M15 1l5 4-5 4" />
          </svg>
        </span>
      </div>
    </a>
  );
}

function MoreCard() {
  return (
    <a
      href={MEDIUM_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
        height: '100%',
        minHeight: 220,
        background: '#CFE7E3',
        border: '3px dashed #10141A',
        borderRadius: 12,
        textDecoration: 'none',
        color: '#063C3B',
        textAlign: 'center',
        padding: '24px',
        transition: 'transform .15s ease, background .15s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translate(-2px, -2px)';
        e.currentTarget.style.background = '#BEE0DA';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.background = '#CFE7E3';
      }}
    >
      <span
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: '3px solid #10141A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 22,
          fontWeight: 700,
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
        }}
      >
        +
      </span>
      <span
        style={{
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontSize: 16,
          fontWeight: 700,
        }}
      >
        View all articles
      </span>
      <span
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'rgba(6,60,59,.75)',
        }}
      >
        on Medium →
      </span>
    </a>
  );
}

export default function TalksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useReducedMotion();
  const { articles } = useMediumArticles(TOP_5_ARTICLES);

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
    // Re-run once articles swap from fallback -> fetched, so the stagger
    // reveal still applies correctly if the DOM nodes were replaced.
  }, [reducedMotion, articles]);

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

        {/* Article Cards Grid: 5 articles + 1 "view all" tile = clean 3x2 */}
        <div
          ref={cardsRef}
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {articles.slice(0, 5).map((article) => (
            <ArticleCard key={article.link} article={article} />
          ))}
          <MoreCard />
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