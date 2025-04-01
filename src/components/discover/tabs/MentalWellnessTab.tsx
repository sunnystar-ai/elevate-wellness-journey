
import React from 'react';
import ArticleCard from '../articles/ArticleCard';
import HorizontalBooksList from '../HorizontalBooksList';

interface Article {
  title: string;
  content: string[];
  image: string;
  date: string;
}

interface MentalWellnessTabProps {
  articles: Article[];
  books: any[];
}

const MentalWellnessTab = ({ articles, books }: MentalWellnessTabProps) => {
  return (
    <>
      {articles.map((article, index) => (
        <ArticleCard key={index} article={article} />
      ))}
      <HorizontalBooksList 
        title="Mental Wellness Books" 
        books={books} 
        delay={0.2}
      />
    </>
  );
};

export default MentalWellnessTab;
