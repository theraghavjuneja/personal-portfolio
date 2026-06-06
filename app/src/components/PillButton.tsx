import { ArrowRight } from 'lucide-react';

interface PillButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  script?: boolean;
}

export default function PillButton({ children, onClick, href, script = false }: PillButtonProps) {
  const className = `group inline-flex items-center gap-3 h-12 px-8 rounded-full border border-deep-charcoal/80 font-body font-semibold text-base text-deep-charcoal hover:bg-deep-charcoal hover:text-warm-cream transition-all duration-300 ${script ? 'font-script text-xl font-semibold tracking-normal' : ''}`;

  const arrow = (
    <ArrowRight
      size={18}
      className="transition-transform duration-300 group-hover:translate-x-1.5"
    />
  );

  if (href) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
        {arrow}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {children}
      {arrow}
    </button>
  );
}
