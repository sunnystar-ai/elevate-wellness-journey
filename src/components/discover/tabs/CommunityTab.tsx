
import React from 'react';
import CommunitySection from '../CommunitySection';
import HorizontalBooksList from '../HorizontalBooksList';

interface CommunityTabProps {
  communityPicks: any[];
  books: any[];
}

const CommunityTab = ({ communityPicks, books }: CommunityTabProps) => {
  return (
    <>
      <CommunitySection title="Community Picks" picks={communityPicks} />
      <HorizontalBooksList 
        title="Community Recommended Books" 
        books={books} 
        delay={0.2}
      />
    </>
  );
};

export default CommunityTab;
