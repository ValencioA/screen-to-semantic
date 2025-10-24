import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopNav } from "@/components/TopNav";
import { BottomNav } from "@/components/BottomNav";
import { HeroSection } from "@/components/HeroSection";
import { ContentRow } from "@/components/ContentRow";
import { videoApi } from "@/services/videoApi";
import { Video } from "@/types/video";
import { getYouTubeVideoId } from "@/utils/videoHelpers";

export default function Index() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState<Video[]>([]);
  const [carouselVideos, setCarouselVideos] = useState<Video[]>([]);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const [videosResponse, carouselResponse] = await Promise.all([
          videoApi.getVideos(),
          videoApi.getCarouselVideos()
        ]);
        
        if (videosResponse.status === 200 && videosResponse.items) {
          setVideos(videosResponse.items);
        }
        
        if (carouselResponse.status === 200 && carouselResponse.items) {
          setCarouselVideos(carouselResponse.items);
        }
      } catch (err) {
        console.error('Failed to fetch videos:', err);
        setError('Failed to load videos');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Auto-rotate carousel every 5 seconds
  useEffect(() => {
    if (carouselVideos.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentCarouselIndex((prev) => (prev + 1) % carouselVideos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselVideos.length]);

  // Transform API data to component format
  const transformedVideos = videos.map((video) => ({
    id: getYouTubeVideoId(video.vLink) || '',
    title: video.title,
    image: video.thumbnail,
    duration: '',
    year: '',
  }));

  // Split videos into sections
  const recentlyWatched = transformedVideos.slice(0, 5);
  const highlights = transformedVideos.slice(5, 10);
  const originals = transformedVideos.slice(10, 15);

  // Current carousel video
  const currentVideo = carouselVideos[currentCarouselIndex];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading videos...</p>
        </div>
      </div>
    );
  }

  if (error || !currentVideo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-destructive">{error || 'No videos available'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <TopNav />
      
      <main className="pt-0 md:pt-16">
        <HeroSection
          id={getYouTubeVideoId(currentVideo.vLink) || ''}
          title={currentVideo.title}
          description={currentVideo.title}
          image={currentVideo.thumbnail}
          onClick={() => navigate(`/video/${getYouTubeVideoId(currentVideo.vLink)}`)}
        />
        
        <div className="space-y-8 md:space-y-12 mt-8 md:mt-12">
          <ContentRow title="Recently Watched" items={recentlyWatched} showViewAll />
          <ContentRow title="Highlights" items={highlights} showViewAll />
          <ContentRow title="Originals" items={originals} showViewAll />
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
}
