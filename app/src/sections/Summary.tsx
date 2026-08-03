import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
gsap.registerPlugin(ScrollTrigger);

/**
 * Content tokens — each word reveals in sequence as the user scrolls.
 * `emphasis: true` words snap to the accent color + heavier weight once active,
 * so the key facts (stack, scale, client count, "10x engineer") stand out
 * from the rest of the sentence without needing a highlight pill.
 */
const WORDS: { text: string; emphasis?: boolean, highlight?: boolean }[] = [
  { text: 'I' },
  { text: 'am' },
  { text: 'a' },
  { text: 'software', emphasis: true, highlight: true },
  { text: 'developer', emphasis: true },
  { text: 'with' },
  { text: 'over' },
  { text: '2', emphasis: true },
  { text: 'years', emphasis: true },
  { text: 'of' },
  { text: 'experience' },
  { text: 'across' },
  { text: 'languages' },
  { text: 'like' },
  { text: 'Go,', emphasis: true, highlight: true },
  { text: 'Python,', emphasis: true, highlight: true },
  { text: 'and' },
  { text: 'JavaScript.', emphasis: true, highlight: true },
  { text: "I've " },
  { text: 'scaled' },
  { text: '10s', emphasis: true },
  { text: 'of' },
  { text: '100s', emphasis: true },
  { text: 'of' },
  { text: 'products,' },
  { text: 'and' },
  { text: 'worked' },
  { text: 'with' },
  { text: '20+', emphasis: true },
  { text: 'recurring', emphasis: true },
  { text: 'clients.' },
  { text: "I'm" },
  { text: 'a' },
  { text: '10x', emphasis: true, highlight: true },
  { text: 'engineer', emphasis: true, highlight: true },
  { text: 'with' },
  { text: 'a' },
  { text: 'product', emphasis: true, highlight: true },
  { text: 'mindset' },
  { text: '—' },
  { text: 'I' },
  { text: "don't " },
  { text: 'just' },
  { text: 'ship,' },
  { text: 'I' },
  { text: 'build.', emphasis: true },
];

export default function Summary() {
  const outerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const { reducedMotion } = useReducedMotion();

  useEffect(() => {
    // Show everything by default. JS only takes over the blur/reveal
    // effect once it has actually initialized successfully below.
    // This guarantees the page is never stuck illegible if GSAP fails,
    // is slow to load, or throws on a given browser.
    const revealAll = () => {
      wordRefs.current.forEach(el => {
        if (!el) return;
        el.classList.add('is-active');
        el.style.opacity = '';
      });
    };

    if (reducedMotion) {
      revealAll();
      return;
    }

    // Safety net: if the scroll-driven effect hasn't taken hold within
    // 1.5s of mount (slow script load, GSAP failure, etc.), force full
    // visibility so the content is never permanently blurred/unreadable.
    let initialized = false;
    const fallbackTimer = window.setTimeout(() => {
      if (!initialized) revealAll();
    }, 1500);

    let ctx: ReturnType<typeof gsap.context> | undefined;
    let st: ScrollTrigger | undefined;

    try {
      // Prevent mobile address-bar show/hide from firing spurious
      // resize -> refresh cycles that desync scroll progress math.
      ScrollTrigger.config({ ignoreMobileResize: true });

      ctx = gsap.context(() => {
        const total = wordRefs.current.length;

        st = ScrollTrigger.create({
          trigger: outerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.35,
          onUpdate: self => {
            const raw = self.progress * total;
            const activeIdx = Math.floor(raw);
            const frac = raw - activeIdx;

            wordRefs.current.forEach((el, i) => {
              if (!el) return;
              if (i < activeIdx) {
                el.classList.add('is-active');
                el.style.opacity = '';
              } else if (i === activeIdx) {
                el.classList.add('is-active');
                el.style.opacity = String(Math.min(1, 0.25 + frac * 0.9));
              } else {
                el.classList.remove('is-active');
                el.style.opacity = '';
              }
            });
          },
        });

        initialized = true;
      }, outerRef);
    } catch (e) {
      // If GSAP/ScrollTrigger throws outright, fall back immediately.
      revealAll();
      initialized = true;
    }

    // Re-measure ScrollTrigger's start/end once web fonts have actually
    // loaded. Fonts swap in asynchronously; if that happens after
    // ScrollTrigger has already measured the trigger's height, the
    // scroll math goes stale and words stop updating correctly — this
    // is the main cause of the "stuck blurred" bug across browsers.
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      }).catch(() => {
        /* ignore font-loading errors, not critical */
      });
    }

    return () => {
      window.clearTimeout(fallbackTimer);
      st?.kill();
      ctx?.revert();
    };
  }, [reducedMotion]);

  return (
    <div ref={outerRef} className="iw-root" style={{ height: '260vh' }}>
      <div
        className="iw-sticky"
        style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}
      >
        <span className="iw-crop iw-crop--tl" />
        <span className="iw-crop iw-crop--br" />

        <div className="iw-inner">
          <p className="iw-paragraph">
            {WORDS.map((w, i) => (
              <span
                key={i}
                ref={el => { wordRefs.current[i] = el; }}
                className={`iw-word${w.emphasis ? " iw-word--em" : ""
                  }${w.highlight ? " iw-word--hl" : ""}`}
              >
                {w.text}
              </span>
            ))}
          </p>
        </div>
      </div>

      <style>{`
        /*
          NOTE: prefer moving these fonts to a <link rel="preconnect"> +
          <link rel="stylesheet"> pair (or next/font) in your document
          <head> instead of a runtime @import inside a styled component.
          A head-level <link> lets the browser start fetching immediately
          and, more importantly, lets you use font-display / font loading
          APIs to avoid layout shifts before GSAP measures the page.
          The @import below is kept for drop-in compatibility, but the
          document.fonts.ready + ScrollTrigger.refresh() call above is
          what actually protects you against the stale-measurement bug
          if you keep it as-is.
        */
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');
        .iw-root {
          --bg: #EEF0EA;
          --ink: #10141A;
          --ink-60: rgba(16,20,26,.6);
          --ink-40: rgba(16,20,26,.32);
          --line: rgba(16,20,26,.14);
          --accent: #0E7C79;
          --accent-ink: #063C3B;
          --accent-soft: #CFE7E3;
          font-family:'IBM Plex Sans', system-ui, sans-serif;
          position: relative;
        }
        .iw-sticky {
          background: var(--bg);
          display:flex; align-items:center; justify-content:center;
        }
        .iw-crop { position:absolute; width:18px; height:18px; z-index:5; pointer-events:none; opacity:.35; }
        .iw-crop::before, .iw-crop::after { content:''; position:absolute; background:var(--ink); }
        .iw-crop::before { width:100%; height:1px; top:0; left:0; }
        .iw-crop::after { width:1px; height:100%; top:0; left:0; }
        .iw-crop--tl { top:24px; left:24px; }
        .iw-crop--br { bottom:24px; right:24px; transform:rotate(180deg); }
        .iw-inner {
          max-width: 880px;
          padding: 0 32px;
          margin: 0 auto;
        }
        .iw-paragraph {
          font-family:'IBM Plex Sans', sans-serif;
          font-weight:500;
          font-size: clamp(24px, 3.6vw, 40px);
          line-height: 1.55;
          letter-spacing: -.01em;
          color: var(--ink);
        }
        .iw-word {
          display:inline-block;
          margin-right: 0.25em;
          color: var(--ink-40);
          opacity: .55;
          /* No filter: blur() here on purpose. Blur compositing renders
             and performs inconsistently across browsers and is expensive
             to animate on ~45 simultaneous elements, especially on
             mobile GPUs — that inconsistency is what caused the effect
             to render fully blurred/stuck on some browsers and on
             mobile. Opacity + color + transform give the same "coming
             into focus" feel and render identically everywhere. */
          transform: translateY(6px);
          transition: color .4s ease, transform .4s ease, opacity .35s ease;
          will-change: color, transform, opacity;
        }
        .iw-word--hl.is-active {
          background: #CFE7E3;
          color: #10141A;
          border: 3px solid #10141A;
          box-shadow: 4px 4px 0px #10141A;
          border-radius: 5px;
          padding: 0 8px;
          margin: 0 4px;
          box-decoration-break: clone;
          -webkit-box-decoration-break: clone;
        }
        .iw-word--hl {
          transition:
            color .4s ease,
            background .4s ease,
            transform .4s ease,
            opacity .35s ease;
        }
        .iw-word--em {
          font-family:'Space Grotesk', system-ui, sans-serif;
        }
        .iw-word--em.is-active {
          color: var(--accent-ink);
          font-weight:600;
        }
        .iw-word.is-active {
          opacity: 1;
          transform: translateY(0);
          color: var(--ink);
        }
        @media (max-width:900px) {
          .iw-inner { padding:0 24px; }
          .iw-crop { display:none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .iw-word { transition:none !important; transform:none !important; opacity:1 !important; color:var(--ink) !important; }
          .iw-word--em { color: var(--accent-ink) !important; font-weight:600; }
        }
      `}</style>
    </div>
  );
}