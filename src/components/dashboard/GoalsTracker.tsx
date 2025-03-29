
import { useState, useEffect } from 'react';
import { Flame, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface GoalTrackerProps {
  activityDurations?: Record<string, string>;
}

const GoalsTracker = ({ activityDurations }: GoalTrackerProps) => {
  // Goals data with target values
  const goals = [
    { 
      title: "Meditate 30 minutes daily", 
      activity: "Morning meditation",
      target: 30,
      unit: "minutes",
      completed: false, 
      streak: 8, 
      progress: 0 
    },
    { 
      title: "Walk 60 minutes", 
      activity: "Evening workout",
      target: 60,
      unit: "minutes",
      completed: false, 
      streak: 5, 
      progress: 0 
    },
    { 
      title: "Sleep 7+ hours", 
      activity: "Sleep preparation",
      target: 7,
      unit: "hours",
      completed: false, 
      streak: 3, 
      progress: 0 
    }
  ];

  // State to store the calculated goals with progress
  const [calculatedGoals, setCalculatedGoals] = useState(goals);

  // Effect to update goals based on activity durations from DailyPlan
  useEffect(() => {
    if (activityDurations) {
      const updatedGoals = goals.map(goal => {
        const duration = activityDurations[goal.activity];
        
        if (duration) {
          const durationValue = parseFloat(duration);
          
          if (!isNaN(durationValue)) {
            // Calculate progress as a percentage of target
            const progressValue = Math.min(100, Math.round((durationValue / goal.target) * 100));
            
            return {
              ...goal,
              completed: progressValue >= 100,
              progress: progressValue,
              actualValue: durationValue
            };
          }
        }
        
        return goal;
      });
      
      setCalculatedGoals(updatedGoals);
    }
  }, [activityDurations]);

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-medium">Your Goals</h2>
      </div>
      
      <div className="space-y-3">
        {calculatedGoals.map((goal, index) => (
          <div 
            key={goal.title}
            className="flex items-center p-3 rounded-lg bg-white shadow-sm"
            style={{ 
              animationDelay: `${index * 100}ms`, 
              animation: 'fade-in 0.5s ease-out backwards' 
            }}
          >
            <div className="mr-3">
              {goal.completed ? (
                <CheckCircle className="h-6 w-6 text-harmony-mint" />
              ) : (
                <div className="h-6 w-6 rounded-full border-2 border-muted" />
              )}
            </div>
            <div className="flex-grow mr-2">
              <div className="font-medium">{goal.title}</div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Flame className="h-3 w-3 text-harmony-peach mr-1" />
                  <span>{goal.streak}-day streak</span>
                </div>
                {goal.actualValue !== undefined && (
                  <div className="text-xs font-medium">
                    {goal.actualValue}/{goal.target} {goal.unit}
                  </div>
                )}
              </div>
            </div>
            <Progress value={goal.progress} className="w-16 h-1" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalsTracker;
