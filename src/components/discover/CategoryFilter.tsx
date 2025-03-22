
import React from 'react';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  categories: { id: string; name: string }[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CategoryFilter = ({ categories, activeCategory, setActiveCategory }: CategoryFilterProps) => {
  return (
    <div className="overflow-x-auto pb-2 mb-6">
      <div className="flex space-x-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            className="rounded-full whitespace-nowrap"
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
