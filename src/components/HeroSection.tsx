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
      className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] w-full overflow-hidden cursor-pointer rounded-2xl mx-4 md:mx-6 lg:mx-8"
      onClick={onClick}
    >
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>
      
      <div className="relative h-full flex items-end pb-12 md:pb-16 lg:pb-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-2xl space-y-4 md:space-y-6 animate-fade-in">
          <div className="flex items-center gap-3 text-sm md:text-base text-muted-foreground">
            {rating && (
              <span className="flex items-center gap-1">
                <span className="text-primary font-semibold">{rating}</span>
              </span>
            )}
            {year && <span>{year}</span>}
            {duration && <span>• {duration}</span>}
          </div>
          
          <p className="text-sm md:text-base lg:text-lg text-foreground/90 line-clamp-3 max-w-xl">
            {description}
          </p>
        </div>
      </div>
      
      {/* Navigation Bullets */}
      {totalCount > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {Array.from({ length: totalCount }).map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                onBulletClick?.(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary ring-2 ring-primary/50' 
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
