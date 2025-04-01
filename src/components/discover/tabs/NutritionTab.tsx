
import React from 'react';
import ArticleCard from '../articles/ArticleCard';

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
  return (
    <>
      {articles.map((article, index) => (
        <ArticleCard key={index} article={article} />
      ))}
    </>
  );
};

export default NutritionTab;
