interface TalkCardProps {
  title: string;
  image: string;
}

export default function TalkCard({ title, image }: TalkCardProps) {
  return (
    <div
      style={{
        background: '#FAFAF7',
        border: '1px solid rgba(16,20,26,.12)',
        borderRadius: 12,
        overflow: 'hidden',
        transition: 'transform .35s cubic-bezier(.23,1,.32,1), box-shadow .35s ease',
        boxShadow: '0 2px 16px -8px rgba(16,20,26,.18)',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-5px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 48px -14px rgba(16,20,26,.22), 0 6px 18px -6px rgba(14,124,121,.18)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = '';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 16px -8px rgba(16,20,26,.18)';
      }}
    >
      <div
        style={{
          aspectRatio: '4/3',
          overflow: 'hidden',
          background: 'rgba(16,20,26,.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={image}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform .6s cubic-bezier(.23,1,.32,1)',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = ''; }}
        />
      </div>
      <div style={{ padding: '16px 18px 18px' }}>
        <h3
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 600,
            fontSize: 15,
            color: '#10141A',
            lineHeight: 1.35,
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </h3>
      </div>
    </div>
  );
}
