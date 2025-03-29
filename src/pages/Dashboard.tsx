
import { useState, useEffect } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { useIsMobile } from '@/hooks/use-mobile';
import BottomNav from '@/components/my-journey/BottomNav';

// Import the extracted components
import StatusBar from '@/components/dashboard/StatusBar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import UserSnapshot from '@/components/dashboard/UserSnapshot';
import DailyOverview from '@/components/dashboard/DailyOverview';
import QuickStats from '@/components/dashboard/QuickStats';
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

  return (
    <div className={`page-transition ${loaded ? 'opacity-100' : 'opacity-0'} pb-20`}>
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
          <DailyOverview activityDurations={activityDurations} mentalScore={mentalScore} />
        </AnimatedSection>

        {/* Quick Stats Summary */}
        <AnimatedSection className="mb-8">
          <QuickStats />
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
      <BottomNav />
    </div>
  );
};

export default Dashboard;
