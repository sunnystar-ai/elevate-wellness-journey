
import React from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { ContentItem } from '@/hooks/useContentDetail';

interface NonRecipeContentProps {
  displayContent: ContentItem & {
    ingredients?: string[];
    benefits?: string[];
  };
}

const NonRecipeContent = ({ displayContent }: NonRecipeContentProps) => {
  return (
    <>
      {displayContent.benefits && (!displayContent.ingredients || displayContent.ingredients.length === 0) && (
        <AnimatedSection delay={200}>
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold">Benefits</h2>
            <ul className="list-inside list-disc space-y-2">
              {displayContent.benefits.map((benefit, index) => (
                <li key={index} className="text-muted-foreground">
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>
      )}
    </>
  );
};

export default NonRecipeContent;
