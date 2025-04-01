
import React from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { ContentItem } from '@/hooks/useContentDetail';

interface RecipeSpecificContentProps {
  displayContent: ContentItem & {
    ingredients?: string[];
    instructions?: string[];
    servingSuggestions?: string[];
  };
}

const RecipeSpecificContent = ({ displayContent }: RecipeSpecificContentProps) => {
  return (
    <>
      {displayContent.ingredients && displayContent.ingredients.length > 0 && (
        <AnimatedSection delay={200}>
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold">Ingredients</h2>
            <ul className="list-inside list-disc space-y-2">
              {displayContent.ingredients.map((ingredient, index) => (
                <li key={index} className="text-muted-foreground">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>
      )}
      
      {displayContent.instructions && displayContent.instructions.length > 0 && (
        <AnimatedSection delay={300}>
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold">Instructions</h2>
            <ol className="list-inside list-decimal space-y-3">
              {displayContent.instructions.map((instruction, index) => (
                <li key={index} className="text-muted-foreground">
                  {instruction}
                </li>
              ))}
            </ol>
          </div>
        </AnimatedSection>
      )}
      
      {displayContent.servingSuggestions && displayContent.servingSuggestions.length > 0 && (
        <AnimatedSection delay={400}>
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold">Serving Suggestions</h2>
            <ul className="list-inside list-disc space-y-2">
              {displayContent.servingSuggestions.map((suggestion, index) => (
                <li key={index} className="text-muted-foreground">
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>
      )}
    </>
  );
};

export default RecipeSpecificContent;
