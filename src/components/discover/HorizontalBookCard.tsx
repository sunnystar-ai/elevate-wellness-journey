
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HorizontalBookCardProps {
  id: number;
  title: string;
  author: string;
  rating: number;
  reviewCount: number;
  image: string;
  audioSample?: string;
}

const HorizontalBookCard = ({ id, title, author, rating, image }: HorizontalBookCardProps) => {
  return (
    <Link to={`/content/book/${id}`} className="flex-shrink-0 w-36 mr-4">
      <div className="rounded-lg overflow-hidden bg-card shadow-sm h-full flex flex-col">
        <div className="h-52 w-full">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-3 flex-1 flex flex-col">
          <h3 className="font-medium line-clamp-1 text-sm">{title}</h3>
          <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
            by {author}
          </div>
          
          <div className="flex items-center mt-auto pt-2">
            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
            <span className="text-xs">{rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HorizontalBookCard;
