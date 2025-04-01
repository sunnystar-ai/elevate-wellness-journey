
import React from 'react';

interface CardTagsProps {
  tags: string[];
}

const CardTags = ({ tags }: CardTagsProps) => {
  if (!tags || tags.length === 0) return null;
  
  return (
    <div className="flex flex-wrap gap-1 mb-2">
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
  );
};

export default CardTags;
