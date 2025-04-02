
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { philosophicalBooks } from './data/booksData';
import HorizontalBooksList from './HorizontalBooksList';

const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

const WeeklyPhilosophicalBooks = () => {
  const [selectedBooks, setSelectedBooks] = useState<typeof philosophicalBooks>([]);
  const [nextUpdateDate, setNextUpdateDate] = useState<Date>(new Date());
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  // Function to select 5 random books
  const selectRandomBooks = () => {
    const shuffled = [...philosophicalBooks].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
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
    const storedUpdateDate = localStorage.getItem('nextPhilosophyBooksUpdate');
    const storedBooks = localStorage.getItem('weeklyPhilosophyBooks');
    
    let nextUpdate: Date;
    let books: typeof philosophicalBooks;
    
    if (storedUpdateDate) {
      nextUpdate = new Date(storedUpdateDate);
      
      // If the stored date is in the past, calculate a new date and select new books
      if (nextUpdate.getTime() < Date.now()) {
        nextUpdate = calculateNextUpdateDate();
        books = selectRandomBooks();
        
        // Store the new values
        localStorage.setItem('nextPhilosophyBooksUpdate', nextUpdate.toISOString());
        localStorage.setItem('weeklyPhilosophyBooks', JSON.stringify(books));
      } else {
        // Use the stored books if the date is still in the future
        books = storedBooks ? JSON.parse(storedBooks) : selectRandomBooks();
      }
    } else {
      // First time setup
      nextUpdate = calculateNextUpdateDate();
      books = selectRandomBooks();
      
      // Store the values
      localStorage.setItem('nextPhilosophyBooksUpdate', nextUpdate.toISOString());
      localStorage.setItem('weeklyPhilosophyBooks', JSON.stringify(books));
    }
    
    setNextUpdateDate(nextUpdate);
    setSelectedBooks(books);
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

  if (selectedBooks.length === 0) {
    return null;
  }

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">Weekly Philosopher's Picks</h2>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          <span>{timeRemaining}</span>
        </div>
      </div>
      
      <p className="text-muted-foreground mb-4">
        Discover timeless wisdom with our weekly selection of philosophical works that explore the depths of human existence.
      </p>
      
      <HorizontalBooksList
        title=""
        books={selectedBooks}
        delay={0.2}
      />
    </div>
  );
};

export default WeeklyPhilosophicalBooks;
