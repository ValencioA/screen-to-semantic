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
  const [carouselVideos, setCarouselVideos] = useState<Video[]>([]);
  const [recentVideos, setRecentVideos] = useState<Video[]>([]);
  const [highlightVideos, setHighlightVideos] = useState<Video[]>([]);
  const [originalVideos, setOriginalVideos] = useState<Video[]>([]);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const [carouselResponse, recentResponse, highlightsResponse, originalsResponse] = await Promise.allSettled([
          videoApi.getCarouselVideos(),
          videoApi.getRecentWatched(),
          videoApi.getHighlights(),
          videoApi.getOriginalVideos()
        ]);
        
        if (carouselResponse.status === 'fulfilled' && carouselResponse.value.status === 200 && carouselResponse.value.items) {
          setCarouselVideos(carouselResponse.value.items);
        } else {
          console.error('Failed to fetch carousel:', carouselResponse.status === 'rejected' ? carouselResponse.reason : 'No items');
        }
        
        if (recentResponse.status === 'fulfilled' && recentResponse.value.status === 200 && recentResponse.value.items) {
          setRecentVideos(recentResponse.value.items);
        } else {
          console.error('Failed to fetch recent watched:', recentResponse.status === 'rejected' ? recentResponse.reason : 'No items');
        }
        
        if (highlightsResponse.status === 'fulfilled' && highlightsResponse.value.status === 200 && highlightsResponse.value.items) {
          setHighlightVideos(highlightsResponse.value.items);
        } else {
          console.error('Failed to fetch highlights:', highlightsResponse.status === 'rejected' ? highlightsResponse.reason : 'No items');
        }
        
        if (originalsResponse.status === 'fulfilled' && originalsResponse.value.status === 200 && originalsResponse.value.items) {
          setOriginalVideos(originalsResponse.value.items);
        } else {
          console.error('Failed to fetch originals:', originalsResponse.status === 'rejected' ? originalsResponse.reason : 'No items');
        }
      } catch (err) {
        console.error('Failed to fetch videos:', err);
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
  const recentlyWatched = recentVideos.map((video) => ({
    id: getYouTubeVideoId(video.vLink) || '',
    title: video.title,
    image: video.thumbnail,
    duration: '',
    year: '',
  }));

  const highlights = highlightVideos.map((video) => ({
    id: getYouTubeVideoId(video.vLink) || '',
    title: video.title,
    image: video.thumbnail,
    duration: '',
    year: '',
  }));

  const originals = originalVideos.map((video) => ({
    id: getYouTubeVideoId(video.vLink) || '',
    title: video.title,
    image: video.thumbnail,
    duration: '',
    year: '',
  }));

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

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <TopNav />
      
      <main className="pt-0 md:pt-16">
        {currentVideo ? (
          <HeroSection
            id={getYouTubeVideoId(currentVideo.vLink) || ''}
            title={currentVideo.title}
            description={currentVideo.title}
            image={currentVideo.thumbnail}
            onClick={() => navigate(`/video/${getYouTubeVideoId(currentVideo.vLink)}`)}
            currentIndex={currentCarouselIndex}
            totalCount={carouselVideos.length}
            onBulletClick={(index) => setCurrentCarouselIndex(index)}
          />
        ) : (
          <div className="relative w-full h-[50vh] md:h-[70vh] bg-muted animate-pulse" />
        )}
        
        <div className="space-y-8 md:space-y-12 mt-8 md:mt-12">
          {recentlyWatched.length > 0 ? (
            <ContentRow title="Recently Watched" items={recentlyWatched} showViewAll />
          ) : (
            <div className="px-4 md:px-6 lg:px-8 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold">Recently Watched</h2>
              <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="min-w-[160px] md:min-w-[200px] lg:min-w-[240px]">
                    <div className="aspect-[2/3] bg-muted animate-pulse rounded-lg" />
                  </div>
                ))}
              </div>
            </div>
          )}
          {highlights.length > 0 ? (
            <ContentRow title="Highlights" items={highlights} showViewAll />
          ) : (
            <div className="px-4 md:px-6 lg:px-8 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold">Highlights</h2>
              <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="min-w-[160px] md:min-w-[200px] lg:min-w-[240px]">
                    <div className="aspect-[2/3] bg-muted animate-pulse rounded-lg" />
                  </div>
                ))}
              </div>
            </div>
          )}
          {originals.length > 0 ? (
            <ContentRow title="Originals" items={originals} showViewAll />
          ) : (
            <div className="px-4 md:px-6 lg:px-8 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold">Originals</h2>
              <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="min-w-[160px] md:min-w-[200px] lg:min-w-[240px]">
                    <div className="aspect-[2/3] bg-muted animate-pulse rounded-lg" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
}
