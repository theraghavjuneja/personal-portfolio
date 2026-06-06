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
  const { reducedMotion, setReducedMotion } = useReducedMotion();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-300 ${
        scrolled
          ? 'bg-warm-cream/88 backdrop-blur-[12px] border-b border-deep-charcoal/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="container-main w-full flex items-center justify-between">
        {/* Avatar */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
          }}
          className="w-12 h-12 rounded-full overflow-hidden bg-card-cream border border-deep-charcoal/10 flex items-center justify-center shrink-0"
        >
          <img
            src="/images/hero-illustration.png"
            alt="Raghav Juneja"
            className="w-10 h-10 object-contain"
          />
        </a>

        {/* Center Nav Links - hidden on mobile */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="group relative font-body font-medium text-[15px] text-deep-charcoal hover:text-terracotta transition-colors duration-200"
            >
              {link.label}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-terracotta scale-0 group-hover:scale-100 transition-transform duration-200" />
            </a>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Reduce Motion Toggle */}
          <button
            onClick={() => setReducedMotion(!reducedMotion)}
            className={`hidden sm:flex items-center gap-2 h-8 px-3 rounded-full border transition-colors duration-200 ${
              reducedMotion
                ? 'border-terracotta bg-terracotta/10'
                : 'border-deep-charcoal/20 hover:border-deep-charcoal/40'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                reducedMotion ? 'bg-terracotta' : 'bg-deep-charcoal/30'
              }`}
            />
            <span className="font-body font-medium text-[12px] tracking-[0.04em] uppercase text-deep-charcoal/70">
              Reduce motion
            </span>
          </button>

          {/* Social Icons */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-deep-charcoal/60 hover:text-deep-charcoal transition-opacity duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-deep-charcoal/60 hover:text-deep-charcoal transition-opacity duration-200"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
        </div>
      </div>
    </nav>
  );
}
