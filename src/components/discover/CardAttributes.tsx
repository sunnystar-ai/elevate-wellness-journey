
import React from 'react';
import { Activity, Dumbbell, Tag } from 'lucide-react';

interface CardAttributesProps {
  difficulty?: string;
  intensity?: string;
  equipment?: string;
}

const CardAttributes = ({ difficulty, intensity, equipment }: CardAttributesProps) => {
  if (!difficulty && !intensity && !equipment) return null;
  
  return (
    <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
      {difficulty && (
        <div className="flex items-center">
          <Activity className="mr-1 h-3 w-3" />
          {difficulty}
        </div>
      )}
      {intensity && (
        <div className="flex items-center">
          <Dumbbell className="mr-1 h-3 w-3" />
          {intensity}
        </div>
      )}
      {equipment && (
        <div className="flex items-center">
          <Tag className="mr-1 h-3 w-3" />
          {equipment}
        </div>
      )}
    </div>
  );
};

export default CardAttributes;
