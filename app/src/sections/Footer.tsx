import { useEffect, useState, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';

function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const h = time.getHours().toString().padStart(2, '0');
  const m = time.getMinutes().toString().padStart(2, '0');
  const ampm = time.getHours() >= 12 ? 'PM' : 'AM';
  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left">
      <p style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="text-[10px] font-bold text-[#FAFAF7]/60 uppercase tracking-widest mb-1">Local Time</p>
      <p style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="text-xl font-bold text-[#FAFAF7]">{h}:{m} <span className="text-sm text-[#FAFAF7]/60">{ampm}</span></p>
    </div>
  );
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const { reducedMotion } = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    
    const ctx = gsap.context(() => {
      // Small reveal animation for the main content
      gsap.fromTo('.footer-reveal', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%'
        }}
      );
    }, footerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <footer ref={footerRef} id="contact" className="relative w-full bg-[#10141A] overflow-hidden pt-12 pb-8 flex flex-col items-center border-t-[4px] border-[#10141A]">
      <style>{`
        .footer-marquee {
          animation: footer-marquee 25s linear infinite;
        }
        @keyframes footer-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      {/* Top Marquee */}
      <div className="absolute top-0 left-0 w-full bg-[#CFE7E3] border-b-[4px] border-[#10141A] overflow-hidden flex items-center h-12 z-10">
         <div className="flex whitespace-nowrap footer-marquee" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            {[...Array(10)].map((_, i) => (
              <span key={i} className="text-xs font-bold uppercase tracking-widest text-[#10141A] px-8 flex items-center gap-8">
                OPEN TO WORK <span className="w-2.5 h-2.5 rounded-full bg-[#C8563B] border-[2px] border-[#10141A]"></span> LET'S BUILD SOMETHING <span className="w-2.5 h-2.5 rounded-full bg-[#C8563B] border-[2px] border-[#10141A]"></span>
              </span>
            ))}
         </div>
      </div>
      
      <div className="mt-20 w-full max-w-7xl px-6 md:px-12 lg:px-24 flex flex-col md:flex-row justify-between items-center md:items-start gap-16 relative z-10">
         
         {/* Left Side: Big CTA */}
         <div className="flex-1 text-center md:text-left mt-4 md:mt-0 footer-reveal">
            <h2 style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }} className="text-[clamp(44px,8vw,96px)] font-extrabold leading-[0.95] tracking-tighter text-[#FAFAF7] mb-8">
               Let's make<br/>something <span className="inline-block bg-[#FFE2D1] text-[#10141A] border-[4px] border-[#10141A] rounded-xl px-4 py-1 transform -rotate-2 shadow-[6px_6px_0px_#CFE7E3] mt-2 md:mt-0">epic.</span>
            </h2>
            <a 
              href="mailto:raghav@lexipitch.com" 
              className="inline-flex items-center justify-center gap-4 bg-[#C8563B] text-[#FAFAF7] border-[4px] border-[#10141A] rounded-xl px-8 py-5 text-xl font-bold transition-all duration-200 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_#FAFAF7] hover:bg-[#0E7C79] group mx-auto md:mx-0 shadow-[4px_4px_0px_#FAFAF7]"
              style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
            >
               Start a conversation
               <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 group-hover:scale-110 transition-transform" strokeWidth={3} />
            </a>
         </div>

         {/* Right Side: Links & Clock */}
         <div className="flex flex-col gap-10 items-center md:items-end w-full md:w-auto footer-reveal">
            
            {/* Social Links */}
            <div className="flex flex-col gap-4 w-full max-w-[240px]">
               <p style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="text-[10px] font-bold text-[#FAFAF7]/60 uppercase tracking-widest text-center md:text-right">Find me online</p>
               {[
                 { l: 'LinkedIn', h: 'https://linkedin.com/in/theraghavjuneja/' },
                 { l: 'GitHub',   h: 'https://github.com/theraghavjuneja' },
                 { l: 'Twitter',  h: 'https://twitter.com/theraghavjuneja' },
               ].map(link => (
                 <a key={link.l} href={link.h} target="_blank" rel="noopener noreferrer" 
                    className="block w-full text-center bg-[#FAFAF7] border-[3px] border-[#10141A] rounded-lg px-6 py-3 font-bold text-[#10141A] transition-all hover:-translate-y-1 hover:-translate-x-1 hover:bg-[#CFE7E3] shadow-[4px_4px_0px_#FAFAF7] hover:shadow-[6px_6px_0px_#0E7C79]"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                 >
                   {link.l}
                 </a>
               ))}
            </div>
            
            {/* Clock Desktop */}
            <div className="hidden md:block w-full max-w-[240px] border-t-2 border-[#FAFAF7]/10 pt-6">
              <LiveClock />
            </div>
         </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-24 w-full max-w-7xl px-6 md:px-12 lg:px-24 footer-reveal">
         <div className="border-t-[3px] border-[#FAFAF7]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
           <p style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="text-xs font-bold text-[#FAFAF7]/50">
              © {new Date().getFullYear()} Raghav Juneja
           </p>
           {/* Clock Mobile */}
           <div className="md:hidden">
              <LiveClock />
           </div>
           <p style={{ fontFamily: "'IBM Plex Mono', monospace" }} className="text-xs font-bold text-[#FAFAF7]/50">
              Designed with <span className="text-[#C8563B]">♥</span> and curiosity
           </p>
         </div>
      </div>
    </footer>
  );
}
