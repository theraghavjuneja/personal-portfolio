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
        border: '1px solid rgba(16,20,26,.12)',
        borderRadius: 12,
        padding: '32px 28px 28px',
        position: 'relative',
        transition: 'transform .35s cubic-bezier(.23,1,.32,1), box-shadow .35s ease',
        boxShadow: '0 2px 16px -8px rgba(16,20,26,.18)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 40px -12px rgba(16,20,26,.22), 0 4px 16px -6px rgba(14,124,121,.15)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = '';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 16px -8px rgba(16,20,26,.18)';
      }}
    >
      {/* Date ribbon */}
      <div
        style={{
          position: 'absolute',
          top: -1,
          left: 24,
          background: '#10141A',
          color: 'rgba(238,240,234,.82)',
          padding: '5px 14px',
          borderRadius: '0 0 6px 6px',
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
            color: '#0E7C79',
            background: '#CFE7E3',
            border: '1px solid rgba(14,124,121,.25)',
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
