interface TalkCardProps {
  title: string;
  image: string;
}

export default function TalkCard({ title, image }: TalkCardProps) {
  return (
    <div className="group bg-card-cream rounded-2xl overflow-hidden transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] cursor-pointer">
      <div className="aspect-square flex items-center justify-center p-8 bg-warm-cream/50 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain transition-transform duration-400 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="font-display font-semibold text-base text-deep-charcoal leading-tight">
          {title}
        </h3>
      </div>
    </div>
  );
}
