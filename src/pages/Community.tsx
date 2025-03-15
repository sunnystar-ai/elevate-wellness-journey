
import { useState } from 'react';
import StatusBar from '@/components/community/StatusBar';
import CommunityHeader from '@/components/community/CommunityHeader';
import ProfileSnapshot from '@/components/community/ProfileSnapshot';
import CommunitySearch from '@/components/community/CommunitySearch';
import StoriesBar from '@/components/community/StoriesBar';
import ActiveChallenges from '@/components/community/ActiveChallenges';
import ForumsSection from '@/components/community/ForumsSection';
import InterestGroups from '@/components/community/InterestGroups';
import CommunityFeed from '@/components/community/CommunityFeed';
import EventsCalendar from '@/components/community/EventsCalendar';
import CommunityLeaderboard from '@/components/community/CommunityLeaderboard';
import SuccessStories from '@/components/community/SuccessStories';
import CommunityGuidelines from '@/components/community/CommunityGuidelines';
import BottomNav from '@/components/my-journey/BottomNav';

const Community = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="pb-24 bg-background min-h-screen">
      <StatusBar />
      <CommunityHeader />
      <div className="px-4 pt-2 pb-4 flex items-center justify-between">
        <ProfileSnapshot />
        <CommunitySearch value={searchQuery} onChange={setSearchQuery} />
      </div>
      
      <div className="space-y-6">
        <StoriesBar />
        
        <ActiveChallenges />
        
        <ForumsSection />
        
        <InterestGroups />
        
        <CommunityFeed />
        
        <EventsCalendar />
        
        <CommunityLeaderboard />
        
        <SuccessStories />
        
        <CommunityGuidelines />
      </div>

      <BottomNav />
    </div>
  );
};

export default Community;
