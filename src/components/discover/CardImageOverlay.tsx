
import React from 'react';
import { Clock, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CardImageOverlayProps {
  prepTime?: string;
  duration?: string;
  recommended?: string;
}

const CardImageOverlay = ({ prepTime, duration, recommended }: CardImageOverlayProps) => {
  return (
    <>
      {(prepTime || duration) && (
        <div className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
          <span className="flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            {prepTime || duration}
          </span>
        </div>
      )}
      
      {recommended && (
        <div className="absolute left-2 top-2">
          <Badge variant="secondary" className="bg-primary text-primary-foreground">
            <Check className="mr-1 h-3 w-3" />
            {recommended}
          </Badge>
        </div>
      )}
    </>
  );
};

export default CardImageOverlay;
