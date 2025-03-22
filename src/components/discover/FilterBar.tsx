
import React from 'react';
import { Filter, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FilterBar = () => {
  return (
    <div className="flex justify-between items-center">
      <Button variant="outline" size="sm" className="rounded-full">
        <Filter className="h-4 w-4 mr-2" />
        Filters
      </Button>
      
      <div className="flex items-center space-x-4">
        <select className="bg-transparent text-sm border-none focus:outline-none text-muted-foreground">
          <option>Latest</option>
          <option>Popular</option>
          <option>Recommended</option>
        </select>
        
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <Heart className="h-4 w-4" />
          <span>Favorites</span>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
