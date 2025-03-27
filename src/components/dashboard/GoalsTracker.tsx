
import { useState } from 'react';
import { Flame, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const GoalsTracker = () => {
  // Goals data
  const goals = [
    { title: "Meditate 30 minutes daily", completed: true, streak: 8, progress: 80 },
    { title: "Walk 60 minutes", completed: false, streak: 5, progress: 65 },
    { title: "Sleep 7+ hours", completed: true, streak: 3, progress: 100 }
  ];

  return (
    <div>
      <div className="flex justify-between items-baseline mb-4">
        <h2 className="text-lg font-medium">Your Goals</h2>
        <button className="text-primary hover:underline text-sm font-medium">
          See All
        </button>
      </div>
      
      <div className="space-y-3">
        {goals.map((goal, index) => (
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
              <div className="flex items-center text-xs text-muted-foreground">
                <Flame className="h-3 w-3 text-harmony-peach mr-1" />
                <span>{goal.streak}-day streak</span>
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
