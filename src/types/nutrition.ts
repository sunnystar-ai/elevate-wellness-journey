
export interface Recipe {
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

export interface Meal {
  type: string;
  name: string;
}

export interface DayPlan {
  day: string;
  meals: Meal[];
}
