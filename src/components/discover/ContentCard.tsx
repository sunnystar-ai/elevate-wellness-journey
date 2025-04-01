
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Bookmark, Heart, Dumbbell, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ContentCardProps {
  id: number;
  title: string;
  image: string;
  duration: string;
  difficulty?: string;
  intensity?: string;
  equipment?: string;
  tags?: string[];
  recommended?: string;
  prepTime?: string;
  type?: string;
  ingredients?: string[];
  instructions?: string[];
  servingSuggestions?: string[];
}

const ContentCard = ({ 
  id,
  title, 
  image, 
  duration, 
  difficulty, 
  intensity, 
  equipment,
  tags,
  recommended,
  prepTime,
  ingredients,
  type = 'content'
}: ContentCardProps) => {
  const displayDuration = prepTime || duration;
  const isRecipe = ingredients && ingredients.length > 0;
  
  return (
    <Link 
      to={`/content/${type}/${id}`} 
      className="min-w-[240px] rounded-xl overflow-hidden bg-card shadow-sm flex flex-col hover:shadow-md transition-shadow"
    >
      <div className="relative h-32">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {displayDuration}
        </div>
        {isRecipe && (
          <div className="absolute bottom-2 right-2 bg-primary/80 text-white text-xs px-2 py-1 rounded-full flex items-center">
            <Utensils className="h-3 w-3 mr-1" />
            Recipe
          </div>
        )}
        <Button 
          size="icon" 
          variant="ghost"
          className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/30 hover:bg-black/50 text-white"
          onClick={(e) => {
            e.preventDefault(); // Prevent navigation
            // Bookmark logic would go here
          }}
        >
          <Bookmark className="h-3 w-3" />
        </Button>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-base mb-1">{title}</h3>
        
        {difficulty && (
          <div className="flex justify-between items-center">
            <Badge variant="outline" className="text-xs bg-muted/50">
              {difficulty}
            </Badge>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 w-7 p-0"
              onClick={(e) => {
                e.preventDefault(); // Prevent navigation
                // Like logic would go here
              }}
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        {intensity && (
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Badge variant="outline" className="text-xs bg-muted/50 mr-2">
                {intensity}
              </Badge>
              {equipment && equipment !== "None" && (
                <span className="text-xs text-muted-foreground flex items-center">
                  <Dumbbell className="h-3 w-3 mr-1" />
                  {equipment}
                </span>
              )}
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 w-7 p-0"
              onClick={(e) => {
                e.preventDefault(); // Prevent navigation
                // Like logic would go here
              }}
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        {tags && (
          <div className="flex flex-wrap gap-1 mt-2">
            {tags.map((tag, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        {recommended && (
          <div className="text-xs text-muted-foreground mt-1">
            Recommended: {recommended}
          </div>
        )}
        
        {isRecipe && (
          <div className="text-xs text-primary-foreground mt-1 bg-primary/10 p-1 rounded">
            {ingredients.length} ingredients • Full recipe inside
          </div>
        )}
      </div>
    </Link>
  );
};

export default ContentCard;
