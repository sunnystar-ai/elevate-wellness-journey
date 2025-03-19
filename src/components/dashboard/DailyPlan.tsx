import { useState } from 'react';
import { CalendarCheck, Flame, Brain, Footprints, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DailyPlan = () => {
  // Daily plan data - keep track of completed activities
  const [completedActivities, setCompletedActivities] = useState<Record<string, boolean>>({
    "Morning meditation": false,
    "Lunchtime walk": false,
    "Evening workout": false,
    "Sleep preparation": false
  });

  const dailyPlan = [
    { time: "7:00 AM", activity: "Morning meditation", completed: completedActivities["Morning meditation"], icon: <Flame className="h-4 w-4 text-harmony-lavender" /> },
    { time: "12:30 PM", activity: "Lunchtime walk", completed: completedActivities["Lunchtime walk"], icon: <Footprints className="h-4 w-4 text-harmony-blue" /> },
    { time: "6:00 PM", activity: "Evening workout", completed: completedActivities["Evening workout"], icon: <Award className="h-4 w-4 text-harmony-mint" /> },
    { time: "10:00 PM", activity: "Sleep preparation", completed: completedActivities["Sleep preparation"], icon: <Clock className="h-4 w-4 text-harmony-peach" /> }
  ];

  // Function to handle marking activities as done
  const handleMarkDone = (activity: string) => {
    setCompletedActivities(prev => ({
      ...prev,
      [activity]: !prev[activity]
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-baseline mb-4">
        <div className="flex items-center">
          <h2 className="text-lg font-medium mr-2">Today's Plan</h2>
          <CalendarCheck className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      
      <div className="space-y-3">
        {dailyPlan.map((item, index) => (
          <div 
            key={item.time}
            className="flex items-center p-3 rounded-lg bg-white shadow-sm"
            style={{ 
              animationDelay: `${index * 100}ms`, 
              animation: 'fade-in 0.5s ease-out backwards' 
            }}
          >
            <div className="w-16 text-sm font-medium">{item.time}</div>
            <div className="flex items-center mr-3 p-2 rounded-full bg-white shadow-sm">
              {item.icon}
            </div>
            <div className="flex-grow mr-2">
              <div className="font-medium">{item.activity}</div>
            </div>
            <Button 
              size="sm" 
              variant={item.completed ? "outline" : "default"}
              className={item.completed ? "border-harmony-mint text-harmony-mint" : ""}
              onClick={() => handleMarkDone(item.activity)}
            >
              {item.completed ? "Done" : "Mark Done"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyPlan;
