
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, Activity, DumbBell, Tag, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ContentCardProps {
  id: number;
  title: string;
  image: string;
  duration?: string;
  prepTime?: string;
  difficulty?: string;
  intensity?: string;
  equipment?: string;
  tags?: string[];
  recommended?: string;
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
  prepTime,
  difficulty,
  intensity,
  equipment,
  tags,
  recommended,
  type,
  ingredients,
  instructions,
  servingSuggestions
}: ContentCardProps) => {
  // Create a unique content path based on type
  let contentPath = "content";
  if (type === "recipe") {
    contentPath = "nutrition/recipe";
  } else if (type === "workout") {
    contentPath = "workout";
  } else if (type === "meditation") {
    contentPath = "meditation";
  }

  // Forward all recipe data through state params
  const recipeData = type === "recipe" ? {
    id,
    title,
    image,
    prepTime,
    tags,
    ingredients,
    instructions,
    servingSuggestions
  } : null;

  return (
    <Link 
      to={`/${contentPath}/${id}`} 
      state={{ recipeData }}
      className="block min-w-[240px] max-w-[240px] overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative h-36 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {prepTime && (
          <div className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
            <span className="flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              {prepTime}
            </span>
          </div>
        )}
        {duration && !prepTime && (
          <div className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
            <span className="flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              {duration}
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
      </div>
      <div className="p-3">
        <h3 className="mb-2 text-sm font-medium line-clamp-2">{title}</h3>
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="inline-block rounded-full bg-muted px-2 py-0.5 text-xs">
                {tag}
              </span>
            ))}
            {tags.length > 2 && (
              <span className="inline-block rounded-full bg-muted px-2 py-0.5 text-xs">
                +{tags.length - 2} more
              </span>
            )}
          </div>
        )}
        
        <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
          {difficulty && (
            <div className="flex items-center">
              <Activity className="mr-1 h-3 w-3" />
              {difficulty}
            </div>
          )}
          {intensity && (
            <div className="flex items-center">
              <DumbBell className="mr-1 h-3 w-3" />
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
      </div>
    </Link>
  );
};

export default ContentCard;
