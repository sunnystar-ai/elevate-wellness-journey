
import React from 'react';
import { Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { ContentItem } from '@/hooks/useContentDetail';

interface ContentDescriptionProps {
  displayContent: ContentItem;
}

const ContentDescription = ({ displayContent }: ContentDescriptionProps) => {
  return (
    <>
      <AnimatedSection>
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Description</h2>
          <p className="text-muted-foreground">
            {displayContent.description || 
              "Experience this transformative content designed to enhance your wellbeing journey."}
          </p>
        </div>
      </AnimatedSection>

      {displayContent.tags && displayContent.tags.length > 0 && (
        <AnimatedSection delay={100}>
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {displayContent.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  <Tag className="mr-1 h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}
    </>
  );
};

export default ContentDescription;
