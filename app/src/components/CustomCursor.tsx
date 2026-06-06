import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const PaperPlaneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48" height="48" viewBox="0 0 24 24"
    fill="#E8F4FD"
    stroke="#3B82C8"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 2L11 13" />
    <path d="M22 2L15 22L11 13L2 9L22 2Z" />
  </svg>
);

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if device supports hover (ignore touch devices)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.6, ease: "power3.out" });
    let yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.6, ease: "power3.out" });

    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let lastRippleX = lastX;
    let lastRippleY = lastY;

    gsap.set(cursorRef.current, { x: lastX, y: lastY });

    const createRipple = (x: number, y: number) => {
      const ripple = document.createElement('div');
      ripple.className = 'fixed w-3 h-3 rounded-full border-2 pointer-events-none z-[9998] opacity-30';
      ripple.style.borderColor = '#3B82C8';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.transform = 'translate(-50%, -50%) scale(0.5)';
      document.body.appendChild(ripple);

      gsap.to(ripple, {
        scale: 3.5,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        onComplete: () => ripple.remove()
      });
    };

    const updateCursor = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      xTo(x);
      yTo(y);

      const dx = x - lastX;
      const dy = y - lastY;

      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        let angle = Math.atan2(dy, dx) * (180 / Math.PI);
        // rotate boat to point in direction of movement
        gsap.to(cursorRef.current, {
          rotation: (angle + 90) + "_short",
          duration: 0.5,
          ease: "power2.out"
        });
      }

      const rDx = x - lastRippleX;
      const rDy = y - lastRippleY;
      const dist = Math.sqrt(rDx * rDx + rDy * rDy);
      // Create ripple every 40px of movement
      if (dist > 40) {
        createRipple(x, y);
        lastRippleX = x;
        lastRippleY = y;
      }

      lastX = x;
      lastY = y;
    };

    const handleMouseEnter = () => {
      gsap.to(cursorRef.current, { scale: 1.25, duration: 0.3, ease: "back.out(1.7)" });
    };

    const handleMouseLeave = () => {
      gsap.to(cursorRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });
    };

    window.addEventListener('mousemove', updateCursor);

    // Attach to initial elements
    const attachListeners = () => {
      const interactables = document.querySelectorAll('a, button, input, textarea, select, [role="button"], .cursor-pointer');
      interactables.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    attachListeners();

    // Use MutationObserver to attach to dynamically added elements
    const observer = new MutationObserver(() => {
      attachListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      observer.disconnect();
      const interactables = document.querySelectorAll('a, button, input, textarea, select, [role="button"], .cursor-pointer');
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
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
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center"
      style={{
        width: '48px',
        height: '48px',
        marginLeft: '-24px',
        marginTop: '-24px',
        transformOrigin: 'center center'
      }}
    >
      <PaperPlaneIcon />
    </div>
  );
};

export default CustomCursor;
