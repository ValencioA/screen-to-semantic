import { ChevronRight } from "lucide-react";
import { ContentCard } from "./ContentCard";

interface Content {
  id: string;
  title: string;
  image: string;
  duration?: string;
  year?: string;
  tag?: string;
}

interface ContentRowProps {
  title: string;
  items: Content[];
  showViewAll?: boolean;
}

export const ContentRow = ({ title, items, showViewAll = false }: ContentRowProps) => {
  return (
    <section className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-8">
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        {showViewAll && (
          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
            View All
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
      
      <div className="content-row flex gap-3 md:gap-4 overflow-x-auto px-4 md:px-6 lg:px-8 pb-2">
        {items.map((item) => (
          <ContentCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};
