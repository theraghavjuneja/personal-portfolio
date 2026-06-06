import TagPill from './TagPill';

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  rotation?: number;
  dark?: boolean;
}

export default function ProjectCard({
  title,
  description,
  image,
  tags,
  rotation = 0,
  dark = false,
}: ProjectCardProps) {
  if (dark) {
    return (
      <div
        className="bg-deep-charcoal rounded-xl p-6 flex flex-col justify-between min-h-[340px] transition-all duration-400 hover:shadow-xl cursor-pointer"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <div>
          <p className="text-white/70 font-body text-sm leading-relaxed">
            {description}
          </p>
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg text-white mt-4 leading-tight">
            {title}
          </h3>
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag) => (
              <TagPill key={tag} variant="outline">
                {tag}
              </TagPill>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-card-cream rounded-xl p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-400 hover:shadow-xl cursor-pointer"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {image && (
        <div className="rounded-lg overflow-hidden aspect-[4/3] bg-warm-cream">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <h3 className="font-display font-semibold text-lg text-deep-charcoal mt-4 leading-tight line-clamp-2">
        {title}
      </h3>
      <p className="font-body text-sm text-mid-gray mt-2 line-clamp-2">
        {description}
      </p>
      <div className="flex flex-wrap gap-2 mt-3">
        {tags.map((tag) => (
          <TagPill key={tag} variant="outline">
            {tag}
          </TagPill>
        ))}
      </div>
    </div>
  );
}
