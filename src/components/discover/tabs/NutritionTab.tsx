
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
  // Get recipe data for our meal sections
  const breakfastRecipes = getBreakfastRecipes();
  const lunchRecipes = getLunchRecipes();
  
  return (
    <>
      {articles.map((article, index) => (
        <ArticleCard key={index} article={article} />
      ))}
      
      <ContentSection 
        title="Breakfast Recipes" 
        items={breakfastRecipes.map(recipe => ({
          ...recipe,
          type: 'recipe'
        }))}
      />
      
      <ContentSection 
        title="Lunch & Dinner Ideas" 
        items={lunchRecipes.map(recipe => ({
          ...recipe,
          type: 'recipe'
        }))}
      />
    </>
  );
};

export default NutritionTab;
