
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ContentCard from './ContentCard';
import AnimatedSection from '@/components/ui/AnimatedSection';

interface ContentItem {
  id: number;
  title: string;
  image: string;
  [key: string]: any;
}

interface ContentSectionProps {
  title: string;
  items: ContentItem[];
  linkTo?: string;
  delay?: number;
}

const ContentSection = ({ title, items, linkTo, delay = 0 }: ContentSectionProps) => {
  return (
    <AnimatedSection delay={delay} className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">{title}</h2>
        {linkTo && (
          <Link to={linkTo} className="text-primary text-sm flex items-center">
            See All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        )}
      </div>
      
      <ScrollArea>
        <div className="flex space-x-4 pb-4">
          {items.map((item) => (
            <ContentCard 
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              duration={item.duration || item.prepTime}
              difficulty={item.difficulty}
              intensity={item.intensity}
              equipment={item.equipment}
              tags={item.tags}
              recommended={item.recommended}
            />
          ))}
        </div>
      </ScrollArea>
    </AnimatedSection>
  );
};

export default ContentSection;
