
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface FeaturedProgramProps {
  title: string;
  image: string;
  isNew?: boolean;
}

const FeaturedProgram = ({ title, image, isNew }: FeaturedProgramProps) => {
  return (
    <div className="relative rounded-xl overflow-hidden h-48">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
        {isNew && (
          <Badge className="mb-2 self-start bg-primary">NEW</Badge>
        )}
        <h2 className="text-white text-xl font-medium mb-2">{title}</h2>
        <Button size="sm" className="self-start">Start Program</Button>
      </div>
    </div>
  );
};

export default FeaturedProgram;
