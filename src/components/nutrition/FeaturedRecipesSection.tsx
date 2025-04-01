
import AnimatedSection from '@/components/ui/AnimatedSection';
import FeaturedRecipeCard from './FeaturedRecipeCard';

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

interface FeaturedRecipesSectionProps {
  featuredRecipes: Recipe[];
}

const FeaturedRecipesSection = ({ featuredRecipes }: FeaturedRecipesSectionProps) => {
  if (featuredRecipes.length === 0) return null;
  
  return (
    <section className="mb-16">
      <AnimatedSection>
        <h2 className="subsection-heading">Featured Recipes</h2>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredRecipes.map((recipe, index) => (
          <FeaturedRecipeCard key={recipe.id} recipe={recipe} index={index} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedRecipesSection;
