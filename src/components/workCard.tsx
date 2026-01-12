import type { ImageMetadata } from "astro";

interface WorkCardProps {
  name: string;
  url?: string;
  image: ImageMetadata;
  tags: string[];
}

export default function WorkCard({ name, url, image, tags }: WorkCardProps) {
  const CardWrapper = url ? "a" : "div";
  const cardProps = url
    ? { href: url, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <CardWrapper
      {...cardProps}
      className="group relative overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-white/30 hover:bg-white/10"
    >
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={image.src}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2">{name}</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/80"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </CardWrapper>
  );
}
