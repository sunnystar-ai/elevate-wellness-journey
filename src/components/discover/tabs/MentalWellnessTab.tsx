
import React, { useState, useEffect } from 'react';
import ArticleCard from '../articles/ArticleCard';
import HorizontalBooksList from '../HorizontalBooksList';
import { Clock } from 'lucide-react';
import { philosophicalBooks } from '../data/booksData';

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
  const [weeklyPhilosophyBooks, setWeeklyPhilosophyBooks] = useState<typeof philosophicalBooks>([]);
  const [nextUpdateDate, setNextUpdateDate] = useState<Date>(new Date());
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  
  // Updated with animated style philosopher images
  const philosopherImages = {
    'Plato': 'https://static.thenounproject.com/png/4728639-200.png',
    'Buddha': 'https://static.thenounproject.com/png/931494-200.png',
    'Marcus Aurelius': 'https://static.thenounproject.com/png/1014836-200.png',
    'Lao Tzu': 'https://static.thenounproject.com/png/192495-200.png',
    'Carl Jung': 'https://static.thenounproject.com/png/1074345-200.png',
    'Socrates': 'https://static.thenounproject.com/png/4707771-200.png',
    'Aristotle': 'https://static.thenounproject.com/png/1014832-200.png',
    'Confucius': 'https://static.thenounproject.com/png/1014852-200.png',
    'Epictetus': 'https://static.thenounproject.com/png/4799205-200.png',
    'Friedrich Nietzsche': 'https://static.thenounproject.com/png/1014855-200.png'
  };

  const selectRandomBooks = () => {
    const shuffled = [...philosophicalBooks].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);
    
    return selected.map(book => {
      return {
        ...book,
        image: philosopherImages[book.author] || book.image
      };
    });
  };

  const calculateNextUpdateDate = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const daysUntilNextMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
    
    const nextMonday = new Date(now);
    nextMonday.setDate(now.getDate() + daysUntilNextMonday);
    nextMonday.setHours(0, 0, 0, 0);
    
    return nextMonday;
  };

  const formatTimeRemaining = (targetDate: Date) => {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();
    
    if (diff <= 0) return "Updating soon";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `${days}d ${hours}h until next update`;
  };

  useEffect(() => {
    const storedUpdateDate = localStorage.getItem('nextMentalWellnessUpdate');
    const storedBooks = localStorage.getItem('weeklyMentalWellnessBooks');
    
    let nextUpdate: Date;
    let weeklyBooks: typeof philosophicalBooks;
    
    if (storedUpdateDate) {
      nextUpdate = new Date(storedUpdateDate);
      
      if (nextUpdate.getTime() < Date.now()) {
        nextUpdate = calculateNextUpdateDate();
        weeklyBooks = selectRandomBooks();
        
        localStorage.setItem('nextMentalWellnessUpdate', nextUpdate.toISOString());
        localStorage.setItem('weeklyMentalWellnessBooks', JSON.stringify(weeklyBooks));
      } else {
        let storedBooksData = storedBooks ? JSON.parse(storedBooks) : selectRandomBooks();
        
        weeklyBooks = storedBooksData.map((book: any) => {
          return {
            ...book,
            image: philosopherImages[book.author] || book.image
          };
        });
      }
    } else {
      nextUpdate = calculateNextUpdateDate();
      weeklyBooks = selectRandomBooks();
      
      localStorage.setItem('nextMentalWellnessUpdate', nextUpdate.toISOString());
      localStorage.setItem('weeklyMentalWellnessBooks', JSON.stringify(weeklyBooks));
    }
    
    setNextUpdateDate(nextUpdate);
    setWeeklyPhilosophyBooks(weeklyBooks);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(formatTimeRemaining(nextUpdateDate));
      
      if (nextUpdateDate.getTime() < Date.now()) {
        window.location.reload();
      }
    }, 60000);
    
    setTimeRemaining(formatTimeRemaining(nextUpdateDate));
    
    return () => clearInterval(interval);
  }, [nextUpdateDate]);

  return (
    <>
      {articles.map((article, index) => (
        <ArticleCard key={index} article={article} />
      ))}

      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-medium">Philosophy & Mind Books</h2>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>{timeRemaining}</span>
          </div>
        </div>
        
        <p className="text-muted-foreground mb-4">
          Discover philosophical works and perspectives that offer profound insights into the human experience.
        </p>
        
        <HorizontalBooksList 
          title="" 
          books={weeklyPhilosophyBooks} 
          delay={0.2}
        />
      </div>

      <HorizontalBooksList 
        title="Mental Wellness Books" 
        books={books} 
        delay={0.4}
      />
    </>
  );
};

export default MentalWellnessTab;
