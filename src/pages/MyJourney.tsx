
import StatsOverview from '@/components/my-journey/StatsOverview';
import WeeklyCalendar from '@/components/my-journey/WeeklyCalendar';
import AchievementShowcase from '@/components/my-journey/AchievementShowcase';
import HabitTracker from '@/components/my-journey/HabitTracker';
import JournalEntries from '@/components/my-journey/JournalEntries';
import PhotoTimeline from '@/components/my-journey/PhotoTimeline';
import ActivityHistory from '@/components/my-journey/ActivityHistory';
import InsightsPanel from '@/components/my-journey/InsightsPanel';
import GoalsProgress from '@/components/my-journey/GoalsProgress';
import BottomNav from '@/components/my-journey/BottomNav';

const MyJourney = () => {
  return (
    <div className="pb-24 bg-background min-h-screen">
      <WeeklyCalendar />
      
      <div className="p-4 space-y-6">
        <StatsOverview />
        
        <AchievementShowcase />
        
        <HabitTracker />
        
        <JournalEntries />
        
        <PhotoTimeline />
        
        <ActivityHistory />
        
        <InsightsPanel />
        
        <GoalsProgress />
      </div>

      <BottomNav />
    </div>
  );
};

export default MyJourney;
