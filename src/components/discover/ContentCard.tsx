
import React from 'react';
import { Link } from 'react-router-dom';
import CardTags from './CardTags';
import CardAttributes from './CardAttributes';
import CardImageOverlay from './CardImageOverlay';

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
        <CardImageOverlay 
          prepTime={prepTime}
          duration={duration}
          recommended={recommended}
        />
      </div>
      <div className="p-3">
        <h3 className="mb-2 text-sm font-medium line-clamp-2">{title}</h3>
        <CardTags tags={tags} />
        <CardAttributes 
          difficulty={difficulty}
          intensity={intensity}
          equipment={equipment}
        />
      </div>
    </Link>
  );
};

export default ContentCard;
