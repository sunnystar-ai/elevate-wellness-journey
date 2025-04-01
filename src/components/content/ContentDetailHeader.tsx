
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { ContentItem } from '@/hooks/useContentDetail';

interface ContentDetailHeaderProps {
  displayContent: ContentItem;
  goBack: () => void;
}

const ContentDetailHeader = ({ displayContent, goBack }: ContentDetailHeaderProps) => {
  return (
    <>
      <Button variant="ghost" className="mb-6" onClick={goBack}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <AnimatedSection>
        <div className="relative mb-6 h-64 overflow-hidden rounded-xl md:h-80">
          <img
            src={displayContent.image}
            alt={displayContent.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h1 className="text-2xl font-bold text-white md:text-3xl">{displayContent.title}</h1>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
};

export default ContentDetailHeader;
