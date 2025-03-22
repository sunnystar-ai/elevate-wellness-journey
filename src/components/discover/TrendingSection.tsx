
import React from 'react';
import { TrendingUp } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

interface TrendingItem {
  id: number;
  title: string;
  category: string;
  views: number;
  image: string;
}

interface TrendingSectionProps {
  title: string;
  items: TrendingItem[];
  delay?: number;
}

const TrendingSection = ({ title, items, delay = 0 }: TrendingSectionProps) => {
  return (
    <AnimatedSection delay={delay} className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">{title}</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="rounded-xl overflow-hidden bg-card shadow-sm flex flex-col"
          >
            <div className="relative h-24">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                {item.views}
              </div>
            </div>
            <div className="p-2">
              <h3 className="font-medium text-sm">{item.title}</h3>
              <div className="text-xs text-muted-foreground">
                {item.category}
              </div>
            </div>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
};

export default TrendingSection;
