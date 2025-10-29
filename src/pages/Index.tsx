import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopNav } from "@/components/TopNav";
import { BottomNav } from "@/components/BottomNav";
import { HeroSection } from "@/components/HeroSection";
import { ContentRow } from "@/components/ContentRow";
import { videoApi } from "@/services/videoApi";
import { VideoSection } from "@/types/video";
import { getYouTubeVideoId } from "@/utils/videoHelpers";

export default function Index() {
  const navigate = useNavigate();
  const [sections, setSections] = useState<VideoSection[]>([]);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        console.log('Fetching sections from API...');
        const response = await videoApi.getAllSections();
        console.log('API Response:', response);
        
        if (response.status === 200 && response.sections) {
          console.log('Sections received:', response.sections);
          console.log('Number of sections:', response.sections.length);
          
          // Log first item from first section to see structure
          if (response.sections[0]?.items?.[0]) {
            console.log('Sample video item:', response.sections[0].items[0]);
            console.log('Item keys:', Object.keys(response.sections[0].items[0]));
          }
          
          setSections(response.sections);
        } else {
          console.error('Failed to fetch sections:', response.message);
          console.error('Response:', response);
        }
      } catch (err) {
        console.error('Failed to fetch videos:', err);
      } finally {
        setLoading(false);
        console.log('Loading complete');
      }
    };

    fetchVideos();
  }, []);

  // Get carousel videos from first section or dedicated carousel section
  const carouselVideos = sections.length > 0 && sections[0].items ? sections[0].items : [];

  // Auto-rotate carousel every 5 seconds
  useEffect(() => {
    if (carouselVideos.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentCarouselIndex((prev) => (prev + 1) % carouselVideos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselVideos.length]);

  // Current carousel video
  const currentVideo = carouselVideos[currentCarouselIndex];

  // Transform sections for rendering (skip first section if used for carousel)
  const contentSections = sections.length > 1 ? sections.slice(1) : [];
  
  console.log('Carousel videos count:', carouselVideos.length);
  console.log('Content sections count:', contentSections.length);
  console.log('Current video:', currentVideo);

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
          {contentSections.length > 0 ? (
            contentSections.map((section, index) => {
              console.log(`Processing section ${index}:`, section.title, 'Items:', section.items?.length);
              
              const items = (section.items || [])
                .filter((video) => {
                  const hasRequiredFields = video && video.vLink && video.thumbnail;
                  if (!hasRequiredFields) {
                    console.log('Filtered out video:', video);
                  }
                  return hasRequiredFields;
                })
                .map((video) => ({
                  id: getYouTubeVideoId(video.vLink) || '',
                  title: video.title || 'Untitled',
                  image: video.thumbnail,
                  duration: '',
                  year: '',
                }));

              console.log(`Section "${section.title}" has ${items.length} valid items`);

              // Only render section if it has valid items
              if (items.length === 0) {
                console.log(`Skipping section "${section.title}" - no valid items`);
                return null;
              }

              return (
                <ContentRow 
                  key={section.id || `${section.title}-${index}`}
                  title={section.title} 
                  items={items} 
                  showViewAll 
                />
              );
            })
          ) : (
            <div className="px-4 md:px-6 lg:px-8 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold">Loading content...</h2>
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
