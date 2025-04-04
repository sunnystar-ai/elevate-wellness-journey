
// Main index file that re-exports all content generators
import { Article, NutritionContent } from './types';
import { generateNutritionArticles } from './data/nutritionArticles';
import { generateMentalWellnessArticles } from './data/mentalWellnessArticles';
import { 
  generateFeaturedNutrition,
  getBreakfastRecipes,
  getLunchRecipes,
  getDinnerRecipes,
  getSnackRecipes,
  getAllRecipes
} from './data/recipes/index';

// Re-export types and generators
export type { Article, NutritionContent };
export { 
  generateNutritionArticles, 
  generateMentalWellnessArticles,
  generateFeaturedNutrition,
  getBreakfastRecipes,
  getLunchRecipes,
  getDinnerRecipes,
  getSnackRecipes,
  getAllRecipes
};
