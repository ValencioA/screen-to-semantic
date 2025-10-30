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
        const response = await videoApi.getAllSections();
        console.log("All Sections Response:", response);
        console.log("Extracted sections:", response.result?.sections);

        if (
          response.status === 200 &&
          response.result &&
          Array.isArray(response.result.sections)
        ) {
          setSections(response.result.sections);
        } else {
          console.warn("Unexpected API structure:", response);
        }
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Carousel videos from the first section only
  const carouselVideos = sections.length > 0 && Array.isArray(sections[0]?.items)
    ? sections[0].items
    : [];

  // Auto-rotate carousel every 5 seconds
  useEffect(() => {
    if (carouselVideos.length === 0) return;

    const interval = setInterval(() => {
      setCurrentCarouselIndex((prev) => (prev + 1) % carouselVideos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselVideos.length]);

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
        {/* Hero Carousel (from first section only) */}
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

        {/* Dynamic Sections (excluding the first one used in carousel) */}
        <div className="space-y-8 md:space-y-12 mt-8 md:mt-12 px-4 md:px-6 lg:px-8">
          {sections.length > 0 ? (
            sections.slice(1).map((section, index) => {
              if (!section || !Array.isArray(section.items) || section.items.length === 0) {
                return null;
              }

              const items = section.items
                .filter(video => video && video.vLink && video.thumbnail)
                .map(video => ({
                  id: getYouTubeVideoId(video.vLink) || '',
                  title: video.title || 'Untitled',
                  image: video.thumbnail,
                  duration: '',
                  year: '',
                }));

              if (items.length === 0) return null;

              return (
                <ContentRow
                  key={section.title || `section-${index + 1}`}
                  title={section.title}
                  items={items}
                  showViewAll
                />
              );
            })
          ) : (
            <div className="space-y-4 p-6">
              <h2 className="text-xl md:text-2xl font-bold text-white">No content available</h2>
              <p className="text-muted-foreground">
                We couldn't load any sections. Please check your connection or try again later.
              </p>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}