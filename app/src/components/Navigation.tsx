import { useEffect, useState, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Linkedin, Github } from 'lucide-react';

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Talks', href: '#talks' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const { reducedMotion, setReducedMotion } = useReducedMotion();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Intersection observer → highlight active section */
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveLink('#' + e.target.id);
        });
      },
      { threshold: 0.35 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActiveLink(href);
    document.querySelector(href)?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <>
      {/* ─── Styles ─── */}
      <style>{`
        /* Nav slide-in on load */
        @keyframes navIn {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nav-root {
          animation: navIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* Individual link — animated underline using a pseudo-element */
        .nav-link {
          position: relative;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: #3a3a3a;
          text-decoration: none;
          padding-bottom: 2px;
          transition: color 0.2s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 1.5px;
          background: #C8563B;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .nav-link:hover::after,
        .nav-link.active::after {
          transform: scaleX(1);
        }
        .nav-link:hover,
        .nav-link.active {
          color: #C8563B;
        }

        /* Logo monogram */
        .logo-mark {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-style: italic;
          font-size: 22px;
          font-weight: 600;
          color: #1a1a1a;
          letter-spacing: -0.5px;
          line-height: 1;
          transition: color 0.2s;
        }
        .logo-mark:hover { color: #C8563B; }

        /* The logo ring */
        .logo-ring {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1.5px solid rgba(26,26,26,0.18);
          transition: border-color 0.2s, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .logo-ring:hover {
          border-color: #C8563B;
          transform: rotate(-6deg) scale(1.06);
        }

        /* Reduce-motion pill */
        .motion-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          height: 28px;
          padding: 0 10px;
          border-radius: 100px;
          border: 1px solid rgba(26,26,26,0.18);
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(26,26,26,0.55);
          background: transparent;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
          white-space: nowrap;
        }
        .motion-pill:hover {
          border-color: rgba(26,26,26,0.35);
          color: rgba(26,26,26,0.8);
        }
        .motion-pill.active {
          border-color: #C8563B;
          color: #C8563B;
          background: rgba(200, 86, 59, 0.07);
        }
        .motion-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .motion-pill.active .motion-dot {
          transform: scale(1.4);
        }

        /* Social icon button */
        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          color: rgba(26,26,26,0.45);
          transition: color 0.2s, background 0.2s;
        }
        .social-btn:hover {
          color: #1a1a1a;
          background: rgba(26,26,26,0.06);
        }

        /* Scrolled state: frosted pill that floats in */
        @keyframes pillFloat {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .nav-pill {
          position: fixed;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 28px;
          height: 46px;
          padding: 0 20px;
          border-radius: 100px;
          background: rgba(250, 247, 242, 0.82);          /* warm-cream tint */
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(26,26,26,0.10);
          box-shadow: 0 4px 24px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05);
          animation: pillFloat 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          z-index: 60;
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════════
          UNSCROLLED STATE — full-width transparent bar
          ═══════════════════════════════════════════════════════ */}
      <nav
        ref={navRef}
        className={`nav-root fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        style={{ height: '72px', display: 'flex', alignItems: 'center' }}
      >
        <div className="w-full px-6 lg:px-16 xl:px-24 flex items-center justify-between">

          {/* ── Logo monogram ── */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
            }}
            aria-label="Back to top"
          >
            {/* <div className="logo-ring">
              <span className="logo-mark">RJ</span>
            </div> */}
          </a>

          {/* ── Centre nav links ── */}
          <div className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`nav-link ${activeLink === link.href ? 'active' : ''}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* ── Right controls ── */}
          <div className="flex items-center gap-3">
            {/* <button
              onClick={() => setReducedMotion(!reducedMotion)}
              className={`motion-pill hidden sm:flex ${reducedMotion ? 'active' : ''}`}
            >
              <span className="motion-dot" />
              Reduce motion
            </button> */}

            {/* Thin separator */}
            <span
              className="hidden sm:block h-4 w-px"
              style={{ background: 'rgba(26,26,26,0.15)' }}
            />

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="LinkedIn"
            >
              <Linkedin size={17} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="GitHub"
            >
              <Github size={17} />
            </a>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════
          SCROLLED STATE — floating frosted pill (macOS-style)
          Replaces the full bar for a premium "island" feel
          ═══════════════════════════════════════════════════════ */}
      {scrolled && (
        <div className="nav-pill">

          {/* Monogram — smaller inside pill */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
            }}
            aria-label="Back to top"
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: 'italic',
                fontSize: '17px',
                fontWeight: 600,
                color: '#1a1a1a',
                letterSpacing: '-0.3px',
                transition: 'color 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#C8563B')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#1a1a1a')}
            >
              RJ
            </span>
          </a>

          {/* Hairline divider */}
          <span style={{ width: '1px', height: '16px', background: 'rgba(26,26,26,0.12)' }} />

          {/* Nav links inside pill */}
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`nav-link ${activeLink === link.href ? 'active' : ''}`}
              style={{ fontSize: '13px' }}
            >
              {link.label}
            </a>
          ))}

          {/* Hairline divider */}
          <span style={{ width: '1px', height: '16px', background: 'rgba(26,26,26,0.12)' }} />

          {/* Social icons in pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="LinkedIn"
            >
              <Linkedin size={15} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="GitHub"
            >
              <Github size={15} />
            </a>
          </div>
        </div>
      )}
    </>
  );
}