import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import CaseStudyFooter from '@/components/CaseStudyFooter';

export default function CaseStudyPage() {
  return (
    <div style={{ background: '#EEF0EA', minHeight: '100vh', padding: '120px 24px 60px', fontFamily: "'IBM Plex Sans', system-ui, sans-serif" }}>
      <div className="container-main" style={{ maxWidth: 800, margin: '0 auto' }}>
        
        {/* Back Link */}
        <Link 
          to="/" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: 8, 
            fontFamily: "'IBM Plex Mono', monospace", 
            fontSize: 12, 
            fontWeight: 700, 
            letterSpacing: '0.05em', 
            textTransform: 'uppercase', 
            color: '#10141A',
            textDecoration: 'none',
            marginBottom: 40,
            padding: '8px 16px',
            background: '#FAFAF7',
            border: '2px solid #10141A',
            borderRadius: 8,
            boxShadow: '3px 3px 0px #10141A',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translate(-2px, -2px)';
            e.currentTarget.style.boxShadow = '5px 5px 0px #10141A';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '3px 3px 0px #10141A';
          }}
        >
          <ArrowLeft size={16} /> Back to Projects
        </Link>

        {/* Header Section */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <span style={{ 
              fontFamily: "'IBM Plex Mono', monospace", 
              fontSize: 11, 
              fontWeight: 700, 
              letterSpacing: '0.05em', 
              textTransform: 'uppercase', 
              color: '#10141A', 
              background: '#CFE7E3', 
              border: '2px solid #10141A', 
              borderRadius: 100, 
              padding: '4px 12px',
              boxShadow: '2px 2px 0px #10141A'
            }}>System Design</span>
            <span style={{ 
              fontFamily: "'IBM Plex Mono', monospace", 
              fontSize: 11, 
              fontWeight: 700, 
              letterSpacing: '0.05em', 
              textTransform: 'uppercase', 
              color: '#10141A', 
              background: '#FFE2D1', 
              border: '2px solid #10141A', 
              borderRadius: 100, 
              padding: '4px 12px',
              boxShadow: '2px 2px 0px #10141A'
            }}>Temporal.IO</span>
          </div>
          
          <h1 style={{ 
            fontFamily: "'Space Grotesk', system-ui, sans-serif", 
            fontSize: 'clamp(36px, 5vw, 64px)', 
            fontWeight: 800, 
            color: '#10141A', 
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            marginBottom: 24
          }}>
            Scaling Workflows from 0 to 100K+ Daily
          </h1>
          
          <p style={{ fontSize: 18, color: 'rgba(16,20,26,.65)', lineHeight: 1.7 }}>
            Architected an event-driven campaign engine for B2C enterprises using Temporal.IO — fault-tolerant by design, optimized for PostgreSQL at scale.
          </p>
        </div>

        {/* Hero Image */}
        <div style={{
          width: '100%',
          background: '#0C1116',
          border: '3px solid #10141A',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '8px 8px 0px #10141A',
          marginBottom: 64
        }}>
          <img src="/images/work-2.jpg" alt="Scaling Workflows Architecture" style={{ width: '100%', display: 'block' }} />
        </div>

        {/* Content Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          
          <section>
            <h2 style={{ 
              fontFamily: "'Space Grotesk', system-ui, sans-serif", 
              fontSize: 32, 
              fontWeight: 700, 
              color: '#10141A', 
              marginBottom: 16 
            }}>The Challenge</h2>
            <p style={{ fontSize: 16, color: 'rgba(16,20,26,.7)', lineHeight: 1.8 }}>
              As the user base grew, our legacy cron-based scheduling system began to fail under the load of thousands of concurrent campaigns. We experienced high latency, dropped events, and severe database lock contentions. The business needed a system that could guarantee execution without sacrificing throughput.
            </p>
          </section>

          <section>
            <h2 style={{ 
              fontFamily: "'Space Grotesk', system-ui, sans-serif", 
              fontSize: 32, 
              fontWeight: 700, 
              color: '#10141A', 
              marginBottom: 16 
            }}>The Solution</h2>
            <p style={{ fontSize: 16, color: 'rgba(16,20,26,.7)', lineHeight: 1.8, marginBottom: 24 }}>
              I redesigned the architecture to use <strong>Temporal.IO</strong> as the orchestration engine. This allowed us to write workflows as code, handling retries, timeouts, and state management natively. 
            </p>
            
            <div style={{
              background: '#FAFAF7',
              border: '3px solid #10141A',
              borderRadius: 12,
              padding: 24,
              boxShadow: '4px 4px 0px #10141A'
            }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <li style={{ display: 'flex', gap: 12 }}>
                  <span style={{ color: '#0E7C79', fontWeight: 'bold' }}>✓</span>
                  <span style={{ color: '#10141A', fontSize: 15, fontWeight: 500 }}>Migrated 10M+ rows of legacy campaign data.</span>
                </li>
                <li style={{ display: 'flex', gap: 12 }}>
                  <span style={{ color: '#0E7C79', fontWeight: 'bold' }}>✓</span>
                  <span style={{ color: '#10141A', fontSize: 15, fontWeight: 500 }}>Implemented idempotency keys to prevent duplicate actions.</span>
                </li>
                <li style={{ display: 'flex', gap: 12 }}>
                  <span style={{ color: '#0E7C79', fontWeight: 'bold' }}>✓</span>
                  <span style={{ color: '#10141A', fontSize: 15, fontWeight: 500 }}>Optimized PostgreSQL indexes reducing query time by 80%.</span>
                </li>
              </ul>
            </div>
          </section>

        </div>
      </div>
      <CaseStudyFooter />
    </div>
  );
}
