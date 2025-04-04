
import { useState, useEffect } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { useIsMobile } from '@/hooks/use-mobile';
import BottomNavigation from '@/components/layout/BottomNavigation';
import SetCurrentUserPersonality from '@/scripts/SetCurrentUserPersonality';

// Import the extracted components
import StatusBar from '@/components/dashboard/StatusBar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import UserSnapshot from '@/components/dashboard/UserSnapshot';
import DailyOverview from '@/components/dashboard/DailyOverview';
import GoalsTracker from '@/components/dashboard/GoalsTracker';
import DailyPlan from '@/components/dashboard/DailyPlan';
import WellnessInsights from '@/components/dashboard/WellnessInsights';
import RecommendedNextSteps from '@/components/dashboard/RecommendedNextSteps';

const Dashboard = () => {
  const [loaded, setLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const isMobile = useIsMobile();
  // Add state to track activity durations
  const [activityDurations, setActivityDurations] = useState<Record<string, string>>({});
  // Add state for mental wellness score
  const [mentalScore, setMentalScore] = useState<number>(0.85); // Default value
  // Add state to track if personality data is being saved
  const [personalityDataSaved, setPersonalityDataSaved] = useState(false);

  useEffect(() => {
    setLoaded(true);
    
    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Date formatting
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });
  
  // Time formatting for status bar
  const formattedTime = currentTime.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });

  // Handler for activity updates
  const handleActivityUpdate = (durations: Record<string, string>) => {
    setActivityDurations(durations);
  };

  // Handler for personality data saved
  const handlePersonalityDataSaved = () => {
    setPersonalityDataSaved(true);
  };

  return (
    <div className={`page-transition ${loaded ? 'opacity-100' : 'opacity-0'} pb-20`}>
      {/* Run personality data setup if not yet saved */}
      {!personalityDataSaved && (
        <div className="hidden">
          <SetCurrentUserPersonality onSaved={handlePersonalityDataSaved} />
        </div>
      )}
      
      {/* Status Bar */}
      <StatusBar formattedTime={formattedTime} />

      {/* Dashboard Header */}
      <DashboardHeader formattedDate={formattedDate} />

      <div className="container px-4 mx-auto relative pt-2">
        {/* User Snapshot */}
        <AnimatedSection animation="fade-in" className="mb-6">
          <UserSnapshot />
        </AnimatedSection>

        {/* Daily Overview Card */}
        <AnimatedSection animation="scale-in" className="mb-8">
          <h2 className="text-lg font-medium mb-4">Today's Progress</h2>
          <DailyOverview activityDurations={activityDurations} mentalScore={mentalScore} />
        </AnimatedSection>

        {/* Goals Tracker */}
        <AnimatedSection className="mb-8">
          <GoalsTracker activityDurations={activityDurations} />
        </AnimatedSection>

        {/* Today's Plan */}
        <AnimatedSection className="mb-8">
          <DailyPlan onActivityUpdate={handleActivityUpdate} />
        </AnimatedSection>

        {/* Personalized Insights */}
        <AnimatedSection className="mb-8">
          <WellnessInsights />
        </AnimatedSection>

        {/* Recommended Next Steps and Trends (now combined) */}
        <AnimatedSection className="mb-8">
          <RecommendedNextSteps />
        </AnimatedSection>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Dashboard;
