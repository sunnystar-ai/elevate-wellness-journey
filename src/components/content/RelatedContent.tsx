
import React from 'react';
import { BookOpen } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Separator } from '@/components/ui/separator';
import { ContentItem } from '@/hooks/useContentDetail';
import { useNavigate } from 'react-router-dom';

interface RelatedContentProps {
  displayContent: ContentItem;
}

const RelatedContent = ({ displayContent }: RelatedContentProps) => {
  const navigate = useNavigate();

  return (
    <AnimatedSection>
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h3 className="mb-4 flex items-center text-lg font-medium">
          <BookOpen className="mr-2 h-4 w-4" /> Related Content
        </h3>
        <Separator className="mb-4" />
        
        {displayContent.relatedContent ? (
          <div className="space-y-4">
            {displayContent.relatedContent.map((item, index) => (
              <div
                key={index}
                className="flex cursor-pointer gap-3 rounded-md p-2 hover:bg-muted"
                onClick={() => navigate(`/content/${item.type || 'general'}/${item.id}`)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-16 w-16 rounded-md object-cover"
                />
                <div>
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.duration || item.prepTime || '10 min'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            No related content found
          </p>
        )}
      </div>
    </AnimatedSection>
  );
};

export default RelatedContent;
