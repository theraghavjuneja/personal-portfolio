import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Check if device supports hover (ignore touch devices)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // Hide default cursor across the body
    document.body.style.cursor = 'none';

    let xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power3.out" });
    let yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power3.out" });

    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    
    gsap.set(cursorRef.current, { x: lastX, y: lastY });

    // Idle wobble animation for "organic" hand-drawn feel
    const idleWobble = gsap.to(cursorRef.current, {
      borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    const updateCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    let isHovering = false;

    const handleMouseEnter = () => {
      isHovering = true;
      // Pause wobble and make it a perfect circle when expanded
      idleWobble.pause();
      
      gsap.to(cursorRef.current, { 
        scale: 2.2, 
        backgroundColor: '#FFD93D', // Yellow on hover
        boxShadow: '4px 4px 0px #10141A',
        borderRadius: '50%', // Perfect circle on hover
        duration: 0.3, 
        ease: "back.out(2)" 
      });

      // Show icon
      if (iconRef.current) {
        gsap.to(iconRef.current, {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.3,
          ease: "back.out(2)"
        });
      }
    };

    const handleMouseLeave = () => {
      isHovering = false;
      // Resume wobble
      idleWobble.play();
      
      gsap.to(cursorRef.current, { 
        scale: 1, 
        backgroundColor: '#CFE7E3', // Teal normal
        boxShadow: '3px 3px 0px #10141A',
        duration: 0.3, 
        ease: "power2.out" 
      });

      // Hide icon
      if (iconRef.current) {
        gsap.to(iconRef.current, {
          opacity: 0,
          scale: 0.5,
          rotate: -45,
          duration: 0.2,
          ease: "power2.in"
        });
      }
    };

    const handleMouseDown = () => {
      gsap.to(cursorRef.current, { scale: isHovering ? 1.8 : 0.8, duration: 0.1 });
    };

    const handleMouseUp = () => {
      gsap.to(cursorRef.current, { scale: isHovering ? 2.2 : 1, duration: 0.2, ease: "back.out(2)" });
    };

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Attach to initial elements
    const attachListeners = () => {
      const interactables = document.querySelectorAll('a, button, input, textarea, select, [role="button"], .cursor-pointer, .sp-skill-item, .tech-chip');
      interactables.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
        // ensure default cursor is hidden even on links
        (el as HTMLElement).style.cursor = 'none';
      });
    };

    attachListeners();

    // Use MutationObserver to attach to dynamically added elements
    const observer = new MutationObserver(() => {
      attachListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.style.cursor = 'auto';
      idleWobble.kill();
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
      const interactables = document.querySelectorAll('a, button, input, textarea, select, [role="button"], .cursor-pointer, .sp-skill-item, .tech-chip');
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
        (el as HTMLElement).style.cursor = 'auto';
      });
    };
  }, []);

  // Return nothing on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center overflow-hidden"
      style={{
        width: '32px',
        height: '32px',
        marginLeft: '-16px',
        marginTop: '-16px',
        background: '#CFE7E3',
        border: '3px solid #10141A',
        borderRadius: '50%',
        boxShadow: '3px 3px 0px #10141A',
        transformOrigin: 'center center'
      }}
    >
      <svg 
        ref={iconRef}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="w-4 h-4 text-[#10141A] opacity-0"
        style={{ transform: 'scale(0.5) rotate(-45deg)' }}
      >
        <line x1="7" y1="17" x2="17" y2="7"></line>
        <polyline points="7 7 17 7 17 17"></polyline>
      </svg>
    </div>
  );
};

export default CustomCursor;
