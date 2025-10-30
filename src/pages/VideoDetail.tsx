import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, ThumbsUp, ThumbsDown, Share2 } from "lucide-react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { videoApi } from "@/services/videoApi";
import { Video, VideoSection } from "@/types/video";
import { getYouTubeVideoId } from "@/utils/videoHelpers";
import { ContentRow } from "@/components/ContentRow";
import { useToast } from "@/hooks/use-toast";

export default function VideoDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const plyrRef = useRef<any>(null);
  const { toast } = useToast();
  
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [sections, setSections] = useState<VideoSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const fetchVideoData = async () => {
      setLoading(true);
      setVideoError(false);
      
      // Fetch video details
      try {
        const videoResponse = await videoApi.getVideoDetails(id || '');
        
        if (videoResponse.status === 200) {
          // Handle new structure with sections
          if (videoResponse.result?.sections && videoResponse.result.sections.length > 0) {
            const firstVideo = videoResponse.result.sections[0]?.items?.[0];
            if (firstVideo) {
              setCurrentVideo(firstVideo);
            }
          } 
          // Handle old structure with items
          else if (videoResponse.items && videoResponse.items.length > 0) {
            setCurrentVideo(videoResponse.items[0]);
          } else {
            console.error('Video not found:', id);
            setVideoError(true);
          }
        } else {
          setVideoError(true);
        }
      } catch (error) {
        console.error('Failed to fetch video details:', error);
        setVideoError(true);
      }

      // Fetch sections for recommended videos - independent of video details
      try {
        const sectionsResponse = await videoApi.getAllSections();
        
        if (sectionsResponse.status === 200 && sectionsResponse.result?.sections) {
          setSections(sectionsResponse.result.sections);
        }
      } catch (error) {
        console.error('Failed to fetch sections:', error);
        // Don't set error state, just log - sections are optional
      }
      
      setLoading(false);
    };

    if (id) {
      fetchVideoData();
    }
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

  if (!loading && videoError) {
    return (
      <div className="min-h-screen bg-background">
        <section className="relative w-full bg-black">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 z-50 p-2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
          <div className="aspect-video w-full bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">Video not found</p>
          </div>
        </section>
        {sections.length > 0 && (
          <main className="px-4 md:px-6 lg:px-8 mt-6 space-y-8">
            {sections.map((section, index) => (
              <ContentRow
                key={index}
                title={section.title}
                items={section.items.map(video => ({
                  id: getYouTubeVideoId(video.vLink) || '',
                  title: video.title,
                  image: video.thumbnail,
                }))}
              />
            ))}
          </main>
        )}
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
          onClick={() => navigate("/")}
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

          {/* Recommended Videos Sections */}
          {sections.length > 0 && (
            <div className="space-y-8 pt-6 pb-8">
              {sections.map((section, index) => (
                <ContentRow
                  key={index}
                  title={section.title}
                  items={section.items
                    .filter(v => getYouTubeVideoId(v.vLink) !== id)
                    .map(video => ({
                      id: getYouTubeVideoId(video.vLink) || '',
                      title: video.title,
                      image: video.thumbnail,
                    }))}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
