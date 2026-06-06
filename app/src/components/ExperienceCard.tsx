import TagPill from './TagPill';

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
  tagColor,
}: ExperienceCardProps) {
  return (
    <div className="bg-card-cream border border-deep-charcoal/[0.15] rounded-xl p-8 relative">
      {/* Date ribbon */}
      <div
        className="absolute -top-3 left-6 bg-deep-charcoal text-white px-4 py-1.5 rounded-md"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 95% 100%, 0 100%)',
        }}
      >
        <span className="font-body font-medium text-[11px] tracking-[0.04em] uppercase">
          {dateRange}
        </span>
      </div>

      <p className="mt-4 font-body text-sm text-mid-gray font-medium">
        {company}
      </p>

      <h3 className="mt-2 font-display font-bold text-xl lg:text-2xl text-deep-charcoal leading-tight">
        {title}
      </h3>

      <ul className="mt-5 space-y-3">
        {bullets.map((bullet, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-terracotta mt-1.5 shrink-0">—</span>
            <span className="font-body text-base text-deep-charcoal/80 leading-relaxed">
              {bullet}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <TagPill variant="filled" color={tagColor === 'terracotta' ? 'terracotta' : 'forest-green'}>
          {tag}
        </TagPill>
      </div>
    </div>
  );
}
