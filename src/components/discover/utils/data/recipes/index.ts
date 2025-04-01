
import { breakfastRecipes } from './breakfastRecipes';
import { lunchRecipes } from './lunchRecipes';
import { dinnerRecipes } from './dinnerRecipes';
import { snackRecipes } from './snackRecipes';
import { NutritionContent } from '../../types';
import { Recipe } from './types';

// Combine all recipes
const allRecipes = [
  ...breakfastRecipes,
  ...lunchRecipes,
  ...dinnerRecipes,
  ...snackRecipes
];

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

// Helper functions to get recipes by meal type
export const getBreakfastRecipes = (): Recipe[] => breakfastRecipes;
export const getLunchRecipes = (): Recipe[] => lunchRecipes;
export const getDinnerRecipes = (): Recipe[] => dinnerRecipes;
export const getSnackRecipes = (): Recipe[] => snackRecipes;
export const getAllRecipes = (): Recipe[] => allRecipes;
