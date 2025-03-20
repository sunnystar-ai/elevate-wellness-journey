
import { CalendarCheck, TrendingUp, Brain } from 'lucide-react';
import { useState, useEffect } from 'react';

type WellnessInsight = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const wellnessInsights: WellnessInsight[] = [
  {
    title: "Weekly Progress",
    description: "You've completed 4 of 7 daily goals this week. Keep going!",
    icon: <TrendingUp size={20} className="text-harmony-peach" />
  },
  {
    title: "Mindfulness Reminder",
    description: "Take 5 minutes today to practice deep breathing exercises.",
    icon: <Brain size={20} className="text-harmony-peach" />
  },
  {
    title: "Upcoming Session",
    description: "Guided meditation session scheduled for tomorrow at 8 AM.",
    icon: <CalendarCheck size={20} className="text-harmony-peach" />
  }
];

const DailyTip = () => {
  const [insight, setInsight] = useState<WellnessInsight | null>(null);
  
  useEffect(() => {
    // Create a date string in YYYY-MM-DD format to ensure it changes daily
    const today = new Date();
    const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    
    // Simple hash function to get deterministic but changing index
    let hash = 0;
    for (let i = 0; i < dateString.length; i++) {
      hash = ((hash << 5) - hash) + dateString.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }
    
    // Ensure positive index
    hash = Math.abs(hash);
    const index = hash % wellnessInsights.length;
    
    setInsight(wellnessInsights[index]);
  }, []);
  
  if (!insight) return null;
  
  return (
    <div className="glass-panel p-5 rounded-lg bg-background/80 border border-border flex items-start space-x-4">
      <div className="flex-shrink-0 mt-1">
        <div className="bg-harmony-light-peach p-2 rounded-lg">
          {insight.icon}
        </div>
      </div>
      <div>
        <h3 className="font-medium text-lg mb-1">{insight.title}</h3>
        <p className="text-muted-foreground">{insight.description}</p>
      </div>
    </div>
  );
};

export default DailyTip;
