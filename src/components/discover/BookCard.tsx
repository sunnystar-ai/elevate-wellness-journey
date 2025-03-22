
import React from 'react';
import { Star, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BookCardProps {
  id: number;
  title: string;
  author: string;
  rating: number;
  reviewCount: number;
  image: string;
}

const BookCard = ({ title, author, rating, reviewCount, image }: BookCardProps) => {
  return (
    <div className="rounded-xl overflow-hidden bg-card shadow-sm flex">
      <div className="w-1/3 h-24">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-medium">{title}</h3>
          <div className="text-xs text-muted-foreground mt-1">
            by {author}
          </div>
        </div>
        
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
            <span className="text-sm font-medium mr-1">{rating}</span>
            <span className="text-xs text-muted-foreground">({reviewCount} reviews)</span>
          </div>
          <Button size="sm" variant="ghost" className="ml-auto p-0 h-8 w-8">
            <BookOpen className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
