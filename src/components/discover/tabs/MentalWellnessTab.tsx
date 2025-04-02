
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
  
  // Updated philosopher images that match their actual portraits
  const philosopherImages = {
    'Plato': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Plato_Silanion_Musei_Capitolini_MC1377.jpg/800px-Plato_Silanion_Musei_Capitolini_MC1377.jpg',
    'Buddha': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Buddha_in_Sarnath_Museum_%28Dhammajak_Mutra%29.jpg/800px-Buddha_in_Sarnath_Museum_%28Dhammajak_Mutra%29.jpg',
    'Marcus Aurelius': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marcus_Aurelius_Louvre_MR561.jpg/800px-Marcus_Aurelius_Louvre_MR561.jpg',
    'Lao Tzu': 'public/lovable-uploads/ba8892ba-5c54-4807-a110-5d98ac93865d.png',
    'Carl Jung': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/CGJung.jpg/800px-CGJung.jpg',
    'Socrates': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Socrate_du_Louvre.jpg/800px-Socrate_du_Louvre.jpg',
    'Aristotle': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Aristotle_Altemps_Inv8575.jpg/800px-Aristotle_Altemps_Inv8575.jpg',
    'Confucius': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Confucius_Tang_Dynasty.jpg/800px-Confucius_Tang_Dynasty.jpg',
    'Epictetus': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Epicteti_Enchiridion_Latinis_versibus_adumbratum_%28Oxford_1715%29_frontispiece.jpg/800px-Epicteti_Enchiridion_Latinis_versibus_adumbratum_%28Oxford_1715%29_frontispiece.jpg',
    'Friedrich Nietzsche': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Nietzsche187a.jpg/800px-Nietzsche187a.jpg'
  };
  
  // Function to select 5 random books from philosophical books
  const selectRandomBooks = () => {
    const shuffled = [...philosophicalBooks].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);
    
    // Update book images to use philosopher portraits
    return selected.map(book => {
      return {
        ...book,
        image: philosopherImages[book.author] || book.image // Use philosopher image or fallback to original image
      };
    });
  };

  // Function to calculate next update date (next Monday)
  const calculateNextUpdateDate = () => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 is Sunday, 1 is Monday, etc.
    const daysUntilNextMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
    
    const nextMonday = new Date(now);
    nextMonday.setDate(now.getDate() + daysUntilNextMonday);
    nextMonday.setHours(0, 0, 0, 0);
    
    return nextMonday;
  };

  // Format the time remaining until next update
  const formatTimeRemaining = (targetDate: Date) => {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();
    
    if (diff <= 0) return "Updating soon";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `${days}d ${hours}h until next update`;
  };

  // Initialize books and update date when component mounts
  useEffect(() => {
    // Use local storage to store the selected books and next update date
    const storedUpdateDate = localStorage.getItem('nextMentalWellnessUpdate');
    const storedBooks = localStorage.getItem('weeklyMentalWellnessBooks');
    
    let nextUpdate: Date;
    let weeklyBooks: typeof philosophicalBooks;
    
    if (storedUpdateDate) {
      nextUpdate = new Date(storedUpdateDate);
      
      // If the stored date is in the past, calculate a new date and select new books
      if (nextUpdate.getTime() < Date.now()) {
        nextUpdate = calculateNextUpdateDate();
        weeklyBooks = selectRandomBooks();
        
        // Store the new values
        localStorage.setItem('nextMentalWellnessUpdate', nextUpdate.toISOString());
        localStorage.setItem('weeklyMentalWellnessBooks', JSON.stringify(weeklyBooks));
      } else {
        // Use the stored books if the date is still in the future
        let storedBooksData = storedBooks ? JSON.parse(storedBooks) : selectRandomBooks();
        
        // Update images to use philosopher portraits (in case we're updating an older format)
        weeklyBooks = storedBooksData.map((book: any) => {
          return {
            ...book,
            image: philosopherImages[book.author] || book.image
          };
        });
      }
    } else {
      // First time setup
      nextUpdate = calculateNextUpdateDate();
      weeklyBooks = selectRandomBooks();
      
      // Store the values
      localStorage.setItem('nextMentalWellnessUpdate', nextUpdate.toISOString());
      localStorage.setItem('weeklyMentalWellnessBooks', JSON.stringify(weeklyBooks));
    }
    
    setNextUpdateDate(nextUpdate);
    setWeeklyPhilosophyBooks(weeklyBooks);
  }, []);

  // Update the countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(formatTimeRemaining(nextUpdateDate));
      
      // If we've passed the update date, refresh the page to get new books
      if (nextUpdateDate.getTime() < Date.now()) {
        window.location.reload();
      }
    }, 60000); // Update every minute
    
    // Initial time remaining calculation
    setTimeRemaining(formatTimeRemaining(nextUpdateDate));
    
    return () => clearInterval(interval);
  }, [nextUpdateDate]);

  return (
    <>
      {articles.map((article, index) => (
        <ArticleCard key={index} article={article} />
      ))}

      {/* Weekly Philosophy Books Section */}
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
