
import { recipes } from './recipeData';
import { additionalRecipes } from './recipeDataPart2';
import { NutritionContent } from '../../types';

// Combine all recipes
const allRecipes = [...recipes, ...additionalRecipes];

// Generate featured nutrition content with meal recipes
export const generateFeaturedNutrition = (): NutritionContent[] => {
  // Use the current date to determine which recipes to show
  const today = new Date();
  const offset = today.getDate() % allRecipes.length;
  
  // Create a rotating selection of recipes based on the day
  const result = [];
  for (let i = 0; i < 5; i++) {
    const index = (offset + i) % allRecipes.length;
    result.push(allRecipes[index]);
  }
  
  return result;
};
