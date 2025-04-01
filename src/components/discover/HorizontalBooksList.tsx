
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import HorizontalBookCard from './HorizontalBookCard';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Book {
  id: number;
  title: string;
  author: string;
  rating: number;
  reviewCount: number;
  image: string;
  audioSample?: string;
}

interface HorizontalBooksListProps {
  title: string;
  books: Book[];
  linkTo?: string;
  delay?: number;
}

const HorizontalBooksList = ({ title, books, linkTo, delay = 0 }: HorizontalBooksListProps) => {
  if (!books || books.length === 0) {
    return null;
  }

  // Always display a fixed number of books per row to ensure consistent layout
  const booksPerRow = 5; // Fixed number of books per row
  
  // Create two rows with exactly booksPerRow books each
  const firstRowBooks = books.slice(0, booksPerRow);
  
  // For the second row, take the next set of books or wrap around if not enough
  let secondRowBooks = books.slice(booksPerRow, booksPerRow * 2);
  
  // If we don't have enough books for the second row, repeat some from the beginning
  if (secondRowBooks.length < booksPerRow) {
    const neededBooks = booksPerRow - secondRowBooks.length;
    const additionalBooks = books.slice(0, neededBooks);
    secondRowBooks = [...secondRowBooks, ...additionalBooks];
  }

  return (
    <AnimatedSection delay={delay} className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-primary" />
          <h2 className="text-lg font-medium">{title}</h2>
        </div>
        {linkTo && (
          <Link to={linkTo} className="text-primary text-sm flex items-center">
            See All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        )}
      </div>
      
      <div className="space-y-4">
        {/* First Row */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {firstRowBooks.map((book) => (
              <CarouselItem key={book.id} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                <HorizontalBookCard
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  rating={book.rating}
                  reviewCount={book.reviewCount}
                  image={book.image}
                  audioSample={book.audioSample}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4" />
          <CarouselNext className="hidden md:flex -right-4" />
        </Carousel>

        {/* Second Row - Always show a complete row */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {secondRowBooks.map((book) => (
              <CarouselItem key={`second-${book.id}`} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                <HorizontalBookCard
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  rating={book.rating}
                  reviewCount={book.reviewCount}
                  image={book.image}
                  audioSample={book.audioSample}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4" />
          <CarouselNext className="hidden md:flex -right-4" />
        </Carousel>
      </div>
    </AnimatedSection>
  );
};

export default HorizontalBooksList;
