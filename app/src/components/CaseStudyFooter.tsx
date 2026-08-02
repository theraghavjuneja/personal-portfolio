import { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';

export default function CaseStudyFooter() {
  const weeks = 52;
  const days = 7;
  
  // Generate stable pseudo-random contribution data
  const grid = useMemo(() => {
    const data = [];
    for (let w = 0; w < weeks; w++) {
      const col = [];
      for (let d = 0; d < days; d++) {
        // Pseudo-random generation based on position
        let val = Math.random();
        let level = 0; // Empty
        
        if (val > 0.85) level = 3; // Dark teal
        else if (val > 0.6) level = 2; // Mid teal
        else if (val > 0.35) level = 1; // Light teal
        
        col.push(level);
      }
      data.push(col);
    }
    return data;
  }, []);

  const getColor = (level: number) => {
    switch(level) {
      case 3: return '#084E4C';
      case 2: return '#0E7C79';
      case 1: return '#CFE7E3';
      case 0: 
      default: return '#FAFAF7';
    }
  };

  return (
    <div style={{
      width: '100%',
      padding: '80px 24px',
      background: '#EEF0EA',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Background Contribution Graph */}
      <div style={{
        display: 'flex',
        gap: 4,
        opacity: 0.8,
        transform: 'rotate(-2deg) scale(1.1)',
        pointerEvents: 'none',
        userSelect: 'none',
        marginBottom: -60, // Overlap with content
        zIndex: 0
      }}>
        {grid.map((col, wIdx) => (
          <div key={wIdx} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {col.map((level, dIdx) => (
              <div 
                key={dIdx}
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 3,
                  background: getColor(level),
                  border: '1.5px solid #10141A',
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Foreground Call to Action Overlay */}
      <div style={{
        background: '#FAFAF7',
        border: '4px solid #10141A',
        borderRadius: 16,
        padding: '60px 40px',
        boxShadow: '12px 12px 0px #10141A',
        maxWidth: 600,
        width: '100%',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
        transform: 'rotate(1deg)'
      }}>
        <div style={{
          position: 'absolute',
          top: -24,
          left: -24,
          background: '#FFE2D1',
          border: '3px solid #10141A',
          boxShadow: '4px 4px 0px #10141A',
          borderRadius: 100,
          padding: '8px 16px',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 12,
          fontWeight: 700,
          transform: 'rotate(-6deg)'
        }}>
          NEXT STEPS
        </div>

        <h2 style={{
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: 800,
          color: '#10141A',
          letterSpacing: '-0.04em',
          lineHeight: 1.1,
          marginBottom: 16
        }}>
          Let's build something.
        </h2>
        
        <p style={{
          fontSize: 16,
          color: 'rgba(16,20,26,.65)',
          lineHeight: 1.6,
          marginBottom: 32,
          maxWidth: 400,
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          If you liked this case study and are looking to scale your own systems, I'm currently open to new opportunities.
        </p>

        <a 
          href="/#contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 14,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#FAFAF7',
            background: '#10141A',
            border: '3px solid #10141A',
            boxShadow: '6px 6px 0px rgba(16,20,26,0.3)',
            borderRadius: 8,
            padding: '16px 32px',
            textDecoration: 'none',
            transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translate(-4px, -4px)';
            e.currentTarget.style.boxShadow = '10px 10px 0px rgba(16,20,26,0.2)';
            e.currentTarget.style.background = '#0E7C79';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '6px 6px 0px rgba(16,20,26,0.3)';
            e.currentTarget.style.background = '#10141A';
          }}
        >
          Get in touch <ArrowRight size={18} />
        </a>
      </div>
      
    </div>
  );
}
