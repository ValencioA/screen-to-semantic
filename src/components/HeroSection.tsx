interface HeroSectionProps {
  id?: string;
  title: string;
  description: string;
  image: string;
  duration?: string;
  year?: string;
  rating?: string;
  onClick?: () => void;
  currentIndex?: number;
  totalCount?: number;
  onBulletClick?: (index: number) => void;
}

export const HeroSection = ({ id = "1", title, description, image, duration, year, rating, onClick, currentIndex = 0, totalCount = 0, onBulletClick }: HeroSectionProps) => {
  return (
    <section 
      className="relative w-full px-3 sm:px-4 md:px-6 lg:px-8 cursor-pointer mb-6 md:mb-8"
      onClick={onClick}
    >
      <div className="relative aspect-video md:aspect-[21/9] lg:aspect-[21/8] overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl bg-card shadow-card">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="max-w-xl md:max-w-2xl space-y-2 sm:space-y-3 md:space-y-4 animate-fade-in">
            <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs sm:text-sm md:text-base text-muted-foreground">
              {rating && (
                <span className="flex items-center gap-1">
                  <span className="text-primary font-semibold">{rating}</span>
                </span>
              )}
              {year && <span>{year}</span>}
              {duration && <span>• {duration}</span>}
            </div>
            
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-foreground/90 line-clamp-2 sm:line-clamp-3 max-w-full md:max-w-xl">
              {description}
            </p>
          </div>
        </div>
      </div>
      
      {/* Navigation Bullets */}
      {totalCount > 1 && (
        <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5 sm:gap-2 z-20">
          {Array.from({ length: totalCount }).map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                onBulletClick?.(index);
              }}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary ring-1 sm:ring-2 ring-primary/50' 
                  : 'bg-muted-foreground/50 hover:bg-muted-foreground/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};
