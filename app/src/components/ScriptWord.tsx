interface ScriptWordProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScriptWord({ children, className = '' }: ScriptWordProps) {
  return (
    <span className={`script-accent text-terracotta inline-block ${className}`}>
      {children}
    </span>
  );
}
