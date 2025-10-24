import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, ThumbsUp, ThumbsDown, Share2 } from "lucide-react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { videoApi } from "@/services/videoApi";
import { Video } from "@/types/video";
import { getYouTubeVideoId } from "@/utils/videoHelpers";
import { ContentCard } from "@/components/ContentCard";
import { useToast } from "@/hooks/use-toast";

export default function VideoDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const plyrRef = useRef<any>(null);
  const { toast } = useToast();
  
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        setLoading(true);
        const response = await videoApi.getVideos();
        
        if (response.status === 200 && response.items) {
          // Find current video by ID
          const video = response.items.find(v => getYouTubeVideoId(v.vLink) === id);
          setCurrentVideo(video || response.items[0]);
          
          // Set related videos (exclude current)
          const related = response.items.filter(v => getYouTubeVideoId(v.vLink) !== id).slice(0, 5);
          setRelatedVideos(related);
        }
      } catch (error) {
        console.error('Failed to fetch video data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [id]);

  const handleShare = async () => {
    const videoUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(videoUrl);
      toast({
        title: "URL copied",
        description: "Video URL has been copied to clipboard",
      });
    } catch (err) {
      console.error('Failed to copy:', err);
      toast({
        title: "Failed to copy",
        description: "Could not copy URL to clipboard",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!currentVideo) {
    return (
      <div className="min-h-screen bg-background">
        <section className="relative w-full bg-black">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 z-50 p-2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div className="aspect-video w-full bg-muted animate-pulse" />
        </section>
        <main className="px-4 md:px-6 lg:px-8 mt-6">
          <div className="max-w-4xl space-y-6">
            <div className="h-10 bg-muted animate-pulse rounded w-3/4" />
            <div className="h-20 bg-muted animate-pulse rounded" />
          </div>
        </main>
      </div>
    );
  }

  const videoId = getYouTubeVideoId(currentVideo.vLink);
  
  const plyrProps = {
    source: {
      type: 'video' as const,
      sources: [
        {
          src: videoId || '',
          provider: 'youtube' as const,
        },
      ],
    },
    options: {
      controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
      youtube: {
        noCookie: true,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        modestbranding: 1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Video Player Section */}
      <section className="relative w-full bg-black">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-50 p-2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-colors"
          aria-label="Go back"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <div className="aspect-video w-full">
          <Plyr ref={plyrRef} {...plyrProps} />
        </div>
      </section>

      {/* Content Details */}
      <main className="px-4 md:px-6 lg:px-8 mt-6 relative z-10">
        <div className="max-w-4xl space-y-6">
          {/* Title & Meta */}
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold">{currentVideo.title}</h1>
          </div>

          {/* Description */}
          <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
            {currentVideo.title}
          </p>

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
            
            <button 
              onClick={handleShare}
              className="flex flex-col items-center gap-2 text-foreground/80 hover:text-primary transition-colors group"
            >
              <div className="p-3 rounded-full border border-border group-hover:border-primary transition-colors">
                <Share2 className="h-5 w-5" />
              </div>
              <span className="text-xs">Share</span>
            </button>
          </div>

          {/* Related Videos */}
          <section className="space-y-4 pt-6 pb-8">
            <h2 className="text-xl font-bold">Related Videos</h2>
            <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2">
              {relatedVideos.length > 0 ? (
                relatedVideos.map((video) => (
                  <ContentCard 
                    key={getYouTubeVideoId(video.vLink)}
                    id={getYouTubeVideoId(video.vLink) || ''}
                    title={video.title}
                    image={video.thumbnail}
                  />
                ))
              ) : (
                [1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="min-w-[160px] md:min-w-[200px] lg:min-w-[240px]">
                    <div className="aspect-[2/3] bg-muted animate-pulse rounded-lg" />
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
