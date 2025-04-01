
// Define interfaces for the generated content

export interface Article {
  title: string;
  content: string[];
  image: string;
  date: string;
  ingredients?: string[];
  instructions?: string[];
  servingSuggestions?: string[];
}

// Interface for the nutrition content items
export interface NutritionContent {
  id: number;
  title: string;
  prepTime: string;
  tags: string[];
  image: string;
  ingredients: string[];
  instructions: string[];
  servingSuggestions: string[];
}
