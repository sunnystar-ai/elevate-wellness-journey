
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Users, Calendar, Newspaper, User, Trophy, HelpCircle } from 'lucide-react';

// Import components
import StatusBar from '@/components/community/StatusBar';
import StoriesBar from '@/components/community/StoriesBar';
import ProfileSnapshot from '@/components/community/ProfileSnapshot';
import CommunityHeader from '@/components/community/CommunityHeader';
import CommunitySearch from '@/components/community/CommunitySearch';
import CommunityFeed from '@/components/community/CommunityFeed';
import ForumsSection from '@/components/community/ForumsSection';
import EventsCalendar from '@/components/community/EventsCalendar';
import SuccessStories from '@/components/community/SuccessStories';
import CommunityLeaderboard from '@/components/community/CommunityLeaderboard';
import ActiveChallenges from '@/components/community/ActiveChallenges';
import CommunityGuidelines from '@/components/community/CommunityGuidelines';
import BottomNavigation from '@/components/layout/BottomNavigation';

const Community = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pb-24 bg-background min-h-screen">
      {/* Status Bar */}
      <StatusBar />
      
      {/* User Stories Bar */}
      <StoriesBar />
      
      {/* Profile Snapshot */}
      <ProfileSnapshot />
      
      {/* Community Header */}
      <CommunityHeader />
      
      {/* Search Bar */}
      <div className="px-4 mb-4">
        <CommunitySearch />
      </div>
      
      {/* Content Tabs */}
      <Tabs 
        defaultValue={activeTab} 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="px-4"
      >
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="feed" className="flex flex-col items-center py-2">
            <Heart className="h-4 w-4 mb-1" />
            <span className="text-xs">Feed</span>
          </TabsTrigger>
          <TabsTrigger value="forums" className="flex flex-col items-center py-2">
            <Users className="h-4 w-4 mb-1" />
            <span className="text-xs">Forums</span>
          </TabsTrigger>
          <TabsTrigger value="events" className="flex flex-col items-center py-2">
            <Calendar className="h-4 w-4 mb-1" />
            <span className="text-xs">Events</span>
          </TabsTrigger>
          <TabsTrigger value="more" className="flex flex-col items-center py-2">
            <Newspaper className="h-4 w-4 mb-1" />
            <span className="text-xs">More</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="feed">
          <CommunityFeed isLoading={isLoading} />
        </TabsContent>
        
        <TabsContent value="forums">
          <ForumsSection isLoading={isLoading} />
        </TabsContent>
        
        <TabsContent value="events">
          <EventsCalendar isLoading={isLoading} />
        </TabsContent>
        
        <TabsContent value="more">
          <div className="space-y-6">
            <SuccessStories />
            <CommunityLeaderboard />
            <ActiveChallenges />
            <CommunityGuidelines />
          </div>
        </TabsContent>
      </Tabs>

      <BottomNavigation />
    </div>
  );
};

export default Community;
