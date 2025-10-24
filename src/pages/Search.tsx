import { useState } from "react";
import { ArrowLeft, Search as SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { ContentCard } from "@/components/ContentCard";
import { videoApi } from "@/services/videoApi";
import { getYouTubeVideoId } from "@/utils/videoHelpers";

const categories = [
  "Prayer",
  "Worship",
  "Sermons",
  "Testimonials",
  "Spiritual Talks",
  "Mass",
  "Documentary",
  "Bible Study",
  "Feast Days",
];

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["search", searchQuery],
    queryFn: () => videoApi.searchVideos(searchQuery),
    enabled: searchQuery.length > 0,
  });

  const filteredVideos = data?.items || [];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="container flex items-center gap-4 h-16 px-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-accent/10 rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-semibold">Search</h1>
        </div>
      </header>

      <main className="container px-4 py-6 space-y-6">
        {/* Search Input */}
        <div>
          <h2 className="text-lg mb-4">What you Like to watch today?</h2>
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search Movies & Web Series"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-card/50"
            />
          </div>
        </div>

        {/* Category Tags */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(
                selectedCategory === category ? null : category
              )}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-card hover:bg-card/80 text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Search result
              {filteredVideos.length > 0 && ` (${filteredVideos.length})`}
            </h3>
            
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[2/3] bg-card rounded-lg" />
                    <div className="mt-2 h-4 bg-card rounded" />
                  </div>
                ))}
              </div>
            ) : filteredVideos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredVideos.map((video) => {
                  const videoId = getYouTubeVideoId(video.vLink);
                  return (
                    <ContentCard
                      key={videoId}
                      id={videoId || ''}
                      title={video.title}
                      image={video.thumbnail}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No results found for "{searchQuery}"
              </div>
            )}
          </div>
        )}

        {!searchQuery && (
          <div className="text-center py-12 text-muted-foreground">
            Start typing to search for videos
          </div>
        )}
      </main>
    </div>
  );
};

export default Search;
