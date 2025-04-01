
import React from 'react';
import ArticleCard from '../articles/ArticleCard';
import ContentSection from '../ContentSection';
import { getBreakfastRecipes, getLunchRecipes } from '../utils/articleGenerator';

interface Article {
  title: string;
  content: string[];
  image: string;
  date: string;
  ingredients?: string[];
  instructions?: string[];
  servingSuggestions?: string[];
}

interface NutritionTabProps {
  articles: Article[];
}

const NutritionTab = ({ articles }: NutritionTabProps) => {
  // Create a complete recipe article that shows all content directly
  const fullRecipeArticle: Article = {
    title: "Protein-Packed Mediterranean Bowl",
    date: "June 15, 2023",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    content: [
      "This nutrient-dense Mediterranean bowl is perfect for a satisfying lunch or dinner. Packed with protein and healthy fats, it will keep you energized throughout the day."
    ],
    ingredients: [
      "1 cup cooked quinoa",
      "1 cup chickpeas, rinsed and drained",
      "1/2 cucumber, diced",
      "1 cup cherry tomatoes, halved",
      "1/4 red onion, thinly sliced",
      "1/2 avocado, sliced",
      "1/4 cup kalamata olives",
      "1/4 cup feta cheese, crumbled",
      "2 tbsp extra virgin olive oil",
      "1 tbsp lemon juice",
      "1 clove garlic, minced",
      "1 tsp dried oregano",
      "Salt and pepper to taste",
      "Fresh parsley for garnish"
    ],
    instructions: [
      "In a large bowl, arrange quinoa as the base.",
      "Top with chickpeas, cucumber, cherry tomatoes, red onion, avocado slices, olives, and feta cheese.",
      "In a small bowl, whisk together olive oil, lemon juice, garlic, oregano, salt, and pepper.",
      "Drizzle the dressing over the bowl ingredients.",
      "Garnish with fresh parsley.",
      "Serve immediately or refrigerate for up to 4 hours."
    ],
    servingSuggestions: [
      "Add grilled chicken or salmon for extra protein.",
      "Substitute quinoa with brown rice or couscous if preferred.",
      "Meal prep by storing components separately and assembling when ready to eat.",
      "Pack in a mason jar for an easy on-the-go lunch option."
    ]
  };
  
  return (
    <>
      {articles.map((article, index) => (
        <ArticleCard key={index} article={article} />
      ))}
      
      {/* Add the full recipe article directly in the page */}
      <ArticleCard article={fullRecipeArticle} />
    </>
  );
};

export default NutritionTab;
