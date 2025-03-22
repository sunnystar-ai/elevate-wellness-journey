
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import BookCard from './BookCard';

interface Book {
  id: number;
  title: string;
  author: string;
  rating: number;
  reviewCount: number;
  image: string;
}

interface BooksSectionProps {
  title: string;
  books: Book[];
  linkTo?: string;
  delay?: number;
}

const BooksSection = ({ title, books, linkTo, delay = 0 }: BooksSectionProps) => {
  return (
    <AnimatedSection delay={delay} className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">{title}</h2>
        {linkTo && (
          <Link to={linkTo} className="text-primary text-sm flex items-center">
            See All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        )}
      </div>
      
      <div className="space-y-4">
        {books.map((book) => (
          <BookCard 
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            rating={book.rating}
            reviewCount={book.reviewCount}
            image={book.image}
          />
        ))}
      </div>
    </AnimatedSection>
  );
};

export default BooksSection;
