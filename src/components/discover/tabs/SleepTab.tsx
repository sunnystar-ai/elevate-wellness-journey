
import React from 'react';
import ContentSection from '../ContentSection';
import HorizontalBooksList from '../HorizontalBooksList';

interface SleepTabProps {
  sleepContent: any[];
  books: any[];
}

const SleepTab = ({ sleepContent, books }: SleepTabProps) => {
  return (
    <>
      <ContentSection title="Featured Sleep" items={sleepContent} />
      <HorizontalBooksList 
        title="Sleep & Relaxation Books" 
        books={books} 
        delay={0.2}
      />
    </>
  );
};

export default SleepTab;
