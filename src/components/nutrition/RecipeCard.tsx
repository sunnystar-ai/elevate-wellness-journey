
import { Clock, BookmarkPlus, Utensils, Leaf, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/ui/AnimatedSection';

interface Recipe {
  id: number;
  title: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  calories: number;
  category: string;
  dietaryTags: string[];
  image: string;
  featured?: boolean;
}

interface RecipeCardProps {
  recipe: Recipe;
  index: number;
}

const RecipeCard = ({ recipe, index }: RecipeCardProps) => {
  return (
    <AnimatedSection 
      key={recipe.id} 
      animation="scale-in" 
      delay={index * 100}
      className="group"
    >
      <div className="harmony-card h-full overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute top-4 left-4">
            <span className="bg-harmony-mint/90 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded">
              {recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1)}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 flex items-center text-white space-x-3">
            <div className="flex items-center text-sm">
              <Clock className="h-3 w-3 mr-1" /> 
              <span>{recipe.prepTime} prep</span>
            </div>
            <div className="flex items-center text-sm">
              <Info className="h-3 w-3 mr-1" /> 
              <span>{recipe.calories} kcal</span>
            </div>
          </div>
          <Button 
            size="icon" 
            className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white rounded-full h-8 w-8"
          >
            <BookmarkPlus className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-5">
          <h3 className="font-medium text-lg mb-3 group-hover:text-primary transition-colors">
            {recipe.title}
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {recipe.dietaryTags.map(tag => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded bg-harmony-light-sand">
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center text-sm">
              <Utensils className="h-4 w-4 mr-1 text-harmony-mint" /> 
              <span>{recipe.servings} servings</span>
            </div>
            <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:text-primary/90">
              <Leaf className="h-4 w-4 mr-1" /> View
            </Button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default RecipeCard;
