
import { useState, useEffect } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import BottomNav from '@/components/my-journey/BottomNav';
import { getGreeting, getFormattedDate, getFormattedTime, getDailyQuote } from '@/util/dateUtils';

// Import components
import StatusBar from '@/components/home/StatusBar';
import AppHeader from '@/components/home/AppHeader';
import GreetingHeader from '@/components/home/GreetingHeader';
import QuickActionsBar from '@/components/home/QuickActionsBar';
import ProgressCircle from '@/components/home/ProgressCircle';
import AiChat from '@/components/home/AiChat';
import RecommendationCards from '@/components/home/RecommendationCards';
import DailyTip from '@/components/home/DailyTip';

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setLoaded(true);
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = getFormattedTime(currentTime);
  const greeting = getGreeting();
  const formattedDate = getFormattedDate();
  const dailyQuote = getDailyQuote();

  return (
    <div className="relative pb-24 bg-background">
      <StatusBar formattedTime={formattedTime} />
      <AppHeader />

      <div className="container px-4 mx-auto relative pt-4">
        <AnimatedSection animation="fade-in" className="mb-6">
          <GreetingHeader 
            greeting={greeting} 
            formattedDate={formattedDate} 
            dailyQuote={dailyQuote}
          />
        </AnimatedSection>

        <AnimatedSection className="mb-10">
          <QuickActionsBar />
        </AnimatedSection>

        <AnimatedSection animation="scale-in" className="mb-10">
          <h2 className="text-lg font-medium mb-4">Today's Progress</h2>
          <ProgressCircle />
        </AnimatedSection>

        <AnimatedSection className="mb-10">
          <div className="flex justify-between items-baseline mb-4">
            <h2 className="text-lg font-medium">Belief System Reframing</h2>
          </div>
          <AiChat />
        </AnimatedSection>

        <AnimatedSection className="mb-10">
          <DailyTip />
        </AnimatedSection>

        <AnimatedSection className="mb-10">
          <div className="flex justify-between items-baseline mb-4">
            <h2 className="text-lg font-medium">Recommended For You</h2>
          </div>
          <RecommendationCards />
        </AnimatedSection>
      </div>

      <BottomNav />
    </div>
  );
};

export default Index;
