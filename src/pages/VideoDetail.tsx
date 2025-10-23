import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Play, ThumbsUp, ThumbsDown, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentCard } from "@/components/ContentCard";

// Mock data - in a real app, this would come from an API or context
const mockVideoData = {
  "1": {
    title: "The Prayer",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop",
    year: "2023",
    duration: "2h 15m",
    category: "Drama",
    language: "English",
    description: "Witness the tale of the true son of God as he continues to perform miracles that gave lives. The narration follows Jesus's humble birth, his miraculous healing, and eventual resurrection.",
  },
  // Add more video data as needed
};

const trailers = [
  {
    id: "t1",
    title: "Trailer 1",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=300&fit=crop",
  },
  {
    id: "t2",
    title: "Trailer 2",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=300&fit=crop",
  },
];

const similarMovies = [
  {
    id: "s1",
    title: "Three",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
    year: "2023",
    duration: "1h 45m",
  },
  {
    id: "s2",
    title: "Saint Anthony Padua",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
    year: "2022",
    duration: "2h 10m",
  },
  {
    id: "s3",
    title: "Father Song",
    image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=400&h=600&fit=crop",
    year: "2023",
    duration: "1h 55m",
  },
];

export default function VideoDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Get video data - fallback to first video if not found
  const video = mockVideoData[id as keyof typeof mockVideoData] || mockVideoData["1"];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Video Player Section */}
      <section className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-10 p-2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-colors"
          aria-label="Go back"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <img
          src={video.image}
          alt={video.title}
          className="h-full w-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="rounded-full bg-background/90 p-6 shadow-glow hover:bg-background transition-all hover:scale-110">
            <Play className="h-10 w-10 text-primary fill-current" />
          </button>
        </div>
      </section>

      {/* Content Details */}
      <main className="px-4 md:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="max-w-4xl space-y-6">
          {/* Title & Meta */}
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold">{video.title}</h1>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>{video.duration}</span>
              <span>•</span>
              <span>{video.category}</span>
              <span>•</span>
              <span>{video.year}</span>
              <span>•</span>
              <span>{video.language}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
            {video.description}
          </p>

          {/* Play Button */}
          <Button size="lg" variant="premium" className="w-full md:w-auto gap-2">
            <Play className="h-5 w-5 fill-current" />
            Play
          </Button>

          {/* Action Buttons */}
          <div className="flex items-center gap-6 pt-2">
            <button className="flex flex-col items-center gap-2 text-foreground/80 hover:text-primary transition-colors group">
              <div className="p-3 rounded-full border border-border group-hover:border-primary transition-colors">
                <ThumbsUp className="h-5 w-5" />
              </div>
              <span className="text-xs">Like</span>
            </button>
            
            <button className="flex flex-col items-center gap-2 text-foreground/80 hover:text-primary transition-colors group">
              <div className="p-3 rounded-full border border-border group-hover:border-primary transition-colors">
                <ThumbsDown className="h-5 w-5" />
              </div>
              <span className="text-xs">Not for me</span>
            </button>
            
            <button className="flex flex-col items-center gap-2 text-foreground/80 hover:text-primary transition-colors group">
              <div className="p-3 rounded-full border border-border group-hover:border-primary transition-colors">
                <Share2 className="h-5 w-5" />
              </div>
              <span className="text-xs">Share</span>
            </button>
          </div>

          {/* Trailers & Clips */}
          <section className="space-y-4 pt-6">
            <h2 className="text-xl font-bold">Trailers & Clips</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {trailers.map((trailer) => (
                <div
                  key={trailer.id}
                  className="min-w-[200px] md:min-w-[250px] cursor-pointer group"
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-card shadow-card transition-all duration-300 group-hover:scale-105 group-hover:shadow-glow">
                    <img
                      src={trailer.image}
                      alt={trailer.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-card opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="rounded-full bg-primary p-3 shadow-glow">
                        <Play className="h-5 w-5 text-primary-foreground fill-current" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Similar Movies */}
          <section className="space-y-4 pt-6 pb-8">
            <h2 className="text-xl font-bold">Similar Movies</h2>
            <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2">
              {similarMovies.map((movie) => (
                <ContentCard key={movie.id} {...movie} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
