
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Calendar } from 'lucide-react';

// Import components
import StatusBar from '@/components/community/StatusBar';
import StoriesBar from '@/components/community/StoriesBar';
import CommunityHeader from '@/components/community/CommunityHeader';
import ForumsSection from '@/components/community/ForumsSection';
import EventsCalendar from '@/components/community/EventsCalendar';
import BottomNavigation from '@/components/layout/BottomNavigation';

const Community = () => {
  const [activeTab, setActiveTab] = useState('forums');
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
      
      {/* Community Header with Notifications */}
      <div className="flex items-center justify-between">
        <CommunityHeader />
        <StoriesBar />
      </div>
      
      {/* Content Tabs */}
      <Tabs 
        defaultValue={activeTab} 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="px-4 mt-4"
      >
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="forums" className="flex flex-col items-center py-2">
            <Users className="h-4 w-4 mb-1" />
            <span className="text-xs">Forums</span>
          </TabsTrigger>
          <TabsTrigger value="events" className="flex flex-col items-center py-2">
            <Calendar className="h-4 w-4 mb-1" />
            <span className="text-xs">Events</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="forums">
          <ForumsSection />
        </TabsContent>
        
        <TabsContent value="events">
          <EventsCalendar />
        </TabsContent>
      </Tabs>

      <BottomNavigation />
    </div>
  );
};

export default Community;
