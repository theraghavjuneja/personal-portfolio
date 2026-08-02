import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

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

    const updateCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseEnter = () => {
      gsap.to(cursorRef.current, { 
        scale: 1.8, 
        backgroundColor: '#FFD93D', // Yellow on hover
        boxShadow: '6px 6px 0px #10141A',
        duration: 0.3, 
        ease: "back.out(2)" 
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursorRef.current, { 
        scale: 1, 
        backgroundColor: '#CFE7E3', // Teal normal
        boxShadow: '3px 3px 0px #10141A',
        duration: 0.3, 
        ease: "power2.out" 
      });
    };

    const handleMouseDown = () => {
      gsap.to(cursorRef.current, { scale: 0.9, duration: 0.1 });
    };

    const handleMouseUp = () => {
      gsap.to(cursorRef.current, { scale: 1.8, duration: 0.2, ease: "back.out(2)" });
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
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
      style={{
        width: '24px',
        height: '24px',
        marginLeft: '-12px',
        marginTop: '-12px',
        background: '#CFE7E3',
        border: '3px solid #10141A',
        borderRadius: '50%',
        boxShadow: '3px 3px 0px #10141A',
        transformOrigin: 'center center'
      }}
    />
  );
};

export default CustomCursor;
