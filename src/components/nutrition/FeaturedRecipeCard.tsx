
import { Clock, BookmarkPlus, ChefHat, Utensils, Info } from 'lucide-react';
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

interface FeaturedRecipeCardProps {
  recipe: Recipe;
  index: number;
}

const FeaturedRecipeCard = ({ recipe, index }: FeaturedRecipeCardProps) => {
  return (
    <AnimatedSection 
      key={recipe.id} 
      animation="scale-in" 
      delay={index * 100}
      className="group"
    >
      <div className="harmony-card overflow-hidden h-full flex flex-col md:flex-row">
        <div className="relative w-full md:w-2/5 h-48 md:h-auto">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-harmony-mint/90 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded">
              {recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1)}
            </span>
          </div>
        </div>
        <div className="p-6 flex-1">
          <div className="flex flex-wrap gap-2 mb-3">
            {recipe.dietaryTags.map(tag => (
              <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded bg-harmony-light-sand">
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">
            {recipe.title}
          </h3>
          <p className="text-muted-foreground mb-4">
            A nutritious and delicious recipe packed with essential nutrients to fuel your day.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Prep Time</span>
              <div className="flex items-center mt-1">
                <Clock className="h-4 w-4 mr-1 text-harmony-blue" /> 
                <span className="font-medium">{recipe.prepTime}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Cook Time</span>
              <div className="flex items-center mt-1">
                <ChefHat className="h-4 w-4 mr-1 text-harmony-peach" /> 
                <span className="font-medium">{recipe.cookTime}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Servings</span>
              <div className="flex items-center mt-1">
                <Utensils className="h-4 w-4 mr-1 text-harmony-mint" /> 
                <span className="font-medium">{recipe.servings}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Calories</span>
              <div className="flex items-center mt-1">
                <Info className="h-4 w-4 mr-1 text-harmony-lavender" /> 
                <span className="font-medium">{recipe.calories} kcal</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Button>View Recipe</Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <BookmarkPlus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default FeaturedRecipeCard;
