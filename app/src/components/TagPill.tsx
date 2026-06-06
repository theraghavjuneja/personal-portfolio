interface TagPillProps {
  children: React.ReactNode;
  variant?: 'outline' | 'filled';
  color?: 'terracotta' | 'forest-green';
}

export default function TagPill({ children, variant = 'outline', color = 'terracotta' }: TagPillProps) {
  if (variant === 'filled') {
    const bgColor = color === 'terracotta' ? 'bg-terracotta' : 'bg-forest-green';
    return (
      <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-body font-medium tracking-[0.04em] uppercase text-white ${bgColor}`}>
        {children}
      </span>
    );
  }

  return (
    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-body font-medium tracking-[0.04em] uppercase text-deep-charcoal border border-mid-gray/30">
      {children}
    </span>
  );
}
