
import { NutritionContent } from '../../types';

export interface Recipe extends NutritionContent {
  id: number;
  title: string;
  prepTime: string;
  tags: string[];
  image: string;
  ingredients: string[];
  instructions: string[];
  servingSuggestions: string[];
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export type RecipeCollection = Recipe[];
