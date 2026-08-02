interface ExperienceCardProps {
  dateRange: string;
  company: string;
  title: string;
  bullets: string[];
  tag: string;
  tagColor: 'terracotta' | 'forest-green';
}

export default function ExperienceCard({
  dateRange,
  company,
  title,
  bullets,
  tag,
}: ExperienceCardProps) {
  return (
    <div
      style={{
        background: '#FAFAF7',
        border: '3px solid #10141A',
        borderRadius: 16,
        padding: '32px 28px 28px',
        position: 'relative',
        transition: 'transform .2s, box-shadow .2s',
        boxShadow: '6px 6px 0px #10141A',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translate(-4px, -4px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '10px 10px 0px #10141A';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = '';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '6px 6px 0px #10141A';
      }}
    >
      {/* Date ribbon */}
      <div
        style={{
          position: 'absolute',
          top: -3,
          left: 24,
          background: '#FAFAF7',
          color: '#10141A',
          border: '3px solid #10141A',
          borderTop: 'none',
          boxShadow: '4px 4px 0px #10141A',
          padding: '5px 14px',
          borderRadius: '0 0 8px 8px',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase' as const,
        }}
      >
        {dateRange}
      </div>

      <p
        style={{
          marginTop: 16,
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase' as const,
          color: '#0E7C79',
        }}
      >
        {company}
      </p>

      <h3
        style={{
          marginTop: 6,
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontSize: 22,
          fontWeight: 700,
          color: '#10141A',
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
        }}
      >
        {title}
      </h3>

      <ul style={{ marginTop: 18, display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
        {bullets.map((bullet, i) => (
          <li key={i} style={{ display: 'flex', gap: 10 }}>
            <span
              style={{
                color: '#0E7C79',
                flexShrink: 0,
                marginTop: 3,
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 13,
                lineHeight: 1.4,
              }}
            >
              ›
            </span>
            <span
              style={{
                fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
                fontSize: 14,
                color: 'rgba(16,20,26,.68)',
                lineHeight: 1.65,
              }}
            >
              {bullet}
            </span>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 20 }}>
        <span
          style={{
            display: 'inline-block',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            color: '#10141A',
            background: '#CFE7E3',
            border: '2px solid #10141A',
            boxShadow: '2px 2px 0px #10141A',
            borderRadius: 20,
            padding: '4px 12px',
          }}
        >
          {tag}
        </span>
      </div>
    </div>
  );
}
