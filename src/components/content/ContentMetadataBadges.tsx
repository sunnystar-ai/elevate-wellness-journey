
import React from 'react';
import { Clock, User, Dumbbell, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ContentItem } from '@/hooks/useContentDetail';

interface ContentMetadataBadgesProps {
  displayContent: ContentItem;
}

const ContentMetadataBadges = ({ displayContent }: ContentMetadataBadgesProps) => {
  return (
    <div className="mb-8 flex flex-wrap gap-4">
      {displayContent.prepTime && (
        <Badge className="flex items-center gap-1.5 px-3 py-1.5">
          <Clock className="h-4 w-4" />
          {displayContent.prepTime} prep time
        </Badge>
      )}
      {displayContent.duration && !displayContent.prepTime && (
        <Badge className="flex items-center gap-1.5 px-3 py-1.5">
          <Clock className="h-4 w-4" />
          {displayContent.duration}
        </Badge>
      )}
      {displayContent.difficulty && (
        <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1.5">
          <Award className="h-4 w-4" />
          {displayContent.difficulty} difficulty
        </Badge>
      )}
      {displayContent.intensity && (
        <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1.5">
          <Dumbbell className="h-4 w-4" />
          {displayContent.intensity} intensity
        </Badge>
      )}
      {displayContent.creator && (
        <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1.5">
          <User className="h-4 w-4" />
          By {displayContent.creator}
        </Badge>
      )}
    </div>
  );
};

export default ContentMetadataBadges;
