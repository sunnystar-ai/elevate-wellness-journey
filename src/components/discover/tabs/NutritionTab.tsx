
import React from 'react';
import ArticleCard from '../articles/ArticleCard';
import ContentSection from '../ContentSection';
import { NutritionContent } from '../utils/articleGenerator';

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
  nutritionContent: NutritionContent[];
}

const NutritionTab = ({ articles, nutritionContent }: NutritionTabProps) => {
  return (
    <>
      {articles.map((article, index) => (
        <ArticleCard key={index} article={article} />
      ))}
      <ContentSection title="Featured Nutrition" items={nutritionContent} />
    </>
  );
};

export default NutritionTab;
