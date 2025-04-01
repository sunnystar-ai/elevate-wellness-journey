
import AnimatedSection from '@/components/ui/AnimatedSection';
import RecipeCard from './RecipeCard';

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

interface RecipesSectionProps {
  recipes: Recipe[];
}

const RecipesSection = ({ recipes }: RecipesSectionProps) => {
  return (
    <section>
      <AnimatedSection>
        <h2 className="subsection-heading">Browse All Recipes</h2>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe, index) => (
          <RecipeCard key={recipe.id} recipe={recipe} index={index} />
        ))}
      </div>
    </section>
  );
};

export default RecipesSection;
