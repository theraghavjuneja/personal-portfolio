import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const contactLinks = [
  { label: 'Contact', href: 'mailto:raghav@example.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'Dribbble', href: 'https://dribbble.com' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const { reducedMotion } = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      if (linksRef.current) {
        gsap.from(linksRef.current.children, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }

      if (copyRef.current) {
        gsap.from(copyRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          delay: 0.3,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="bg-deep-charcoal pt-24 pb-16 lg:pt-32 lg:pb-20"
    >
      <div className="container-main">
        {/* Contact Links */}
        <div
          ref={linksRef}
          className="flex flex-wrap items-center justify-center gap-8 lg:gap-12"
        >
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="group relative font-display font-bold text-warm-cream leading-[1.1] tracking-[-0.01em] hover:text-ochre-yellow transition-colors duration-300"
              style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-ochre-yellow scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p
          ref={copyRef}
          className="mt-16 text-center font-body text-xs text-warm-cream/40 tracking-wide"
        >
          Raghav Juneja &middot; All Rights Reserved &copy; 2026
        </p>
      </div>
    </footer>
  );
}
