import { TopNav } from "@/components/TopNav";
import { BottomNav } from "@/components/BottomNav";
import { HeroSection } from "@/components/HeroSection";
import { ContentRow } from "@/components/ContentRow";

const recentlyWatched = [
  {
    id: "1",
    title: "The Prayer",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    year: "2023",
    duration: "2h 15m",
    tag: "Drama",
  },
  {
    id: "2",
    title: "Heaven's Reward",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
    year: "2023",
    duration: "1h 48m",
  },
  {
    id: "3",
    title: "The Journey",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
    year: "2022",
    duration: "2h 5m",
  },
  {
    id: "4",
    title: "Sacred Path",
    image: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=400&h=600&fit=crop",
    year: "2023",
    duration: "1h 52m",
    tag: "Faith",
  },
];

const highlights = [
  {
    id: "5",
    title: "The Forge",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=600&fit=crop",
    year: "2024",
    duration: "2h 10m",
    tag: "NEW",
  },
  {
    id: "6",
    title: "Divine Grace",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    year: "2023",
    duration: "1h 45m",
  },
  {
    id: "7",
    title: "Faithful Hearts",
    image: "https://images.unsplash.com/photo-1502759683299-cdcd6974244f?w=400&h=600&fit=crop",
    year: "2023",
    duration: "2h 20m",
  },
  {
    id: "8",
    title: "The Calling",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=600&fit=crop",
    year: "2024",
    duration: "1h 55m",
    tag: "Trending",
  },
];

const originals = [
  {
    id: "9",
    title: "Son of God",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=600&fit=crop",
    year: "2024",
    duration: "2h 30m",
    tag: "Original",
  },
  {
    id: "10",
    title: "Blessed Journey",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop",
    year: "2023",
    duration: "1h 50m",
  },
  {
    id: "11",
    title: "Faith Restored",
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=600&fit=crop",
    year: "2024",
    duration: "2h 15m",
    tag: "Original",
  },
  {
    id: "12",
    title: "The Testament",
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=600&fit=crop",
    year: "2023",
    duration: "2h 5m",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <TopNav />
      
      <main className="pt-0 md:pt-16">
        <HeroSection
          id="1"
          title="The Son of God"
          description="An epic cinematic journey through faith, redemption, and divine purpose. Experience the powerful story that has touched millions of hearts around the world."
          image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
          year="2024"
          duration="2h 30m"
          rating="⭐ 4.8"
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
};

export default Index;
