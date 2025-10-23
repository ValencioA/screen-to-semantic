import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ContentCardProps {
  id?: string;
  title: string;
  image: string;
  duration?: string;
  year?: string;
  tag?: string;
}

export const ContentCard = ({ id, title, image, duration, year, tag }: ContentCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (id) {
      navigate(`/video/${id}`);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="group relative min-w-[160px] md:min-w-[200px] lg:min-w-[240px] cursor-pointer animate-scale-in"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-card shadow-card transition-all duration-300 group-hover:scale-105 group-hover:shadow-glow">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-card opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="rounded-full bg-primary p-3 shadow-glow">
            <Play className="h-6 w-6 text-primary-foreground fill-current" />
          </div>
        </div>

        {/* Tag badge */}
        {tag && (
          <div className="absolute right-2 top-2 rounded-md bg-accent/90 px-2 py-1 text-xs font-semibold backdrop-blur-sm">
            {tag}
          </div>
        )}
      </div>
      
      <div className="mt-2 space-y-1">
        <h3 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        {(duration || year) && (
          <p className="text-xs text-muted-foreground">
            {year} {duration && `• ${duration}`}
          </p>
        )}
      </div>
    </div>
  );
};
