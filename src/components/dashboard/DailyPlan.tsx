
import { useState } from 'react';
import { CalendarCheck, Flame, Brain, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const DailyPlan = () => {
  // Daily plan data - track completed activities and durations
  const [completedActivities, setCompletedActivities] = useState<Record<string, boolean>>({
    "Morning meditation": false,
    "Evening workout": false,
    "Sleep preparation": false
  });

  // New state to track duration inputs
  const [activityDurations, setActivityDurations] = useState<Record<string, string>>({
    "Morning meditation": "",
    "Evening workout": "",
    "Sleep preparation": ""
  });

  const dailyPlan = [
    { time: "7:00 AM", activity: "Morning meditation", completed: completedActivities["Morning meditation"], icon: <Flame className="h-4 w-4 text-harmony-lavender" /> },
    { time: "6:00 PM", activity: "Evening workout", completed: completedActivities["Evening workout"], icon: <Award className="h-4 w-4 text-harmony-mint" /> },
    { time: "10:00 PM", activity: "Sleep preparation", completed: completedActivities["Sleep preparation"], icon: <Clock className="h-4 w-4 text-harmony-peach" /> }
  ];

  // Function to handle duration input changes
  const handleDurationChange = (activity: string, value: string) => {
    setActivityDurations(prev => ({
      ...prev,
      [activity]: value
    }));
  };

  // Function to handle submitting activity duration
  const handleSubmitDuration = (activity: string) => {
    if (!activityDurations[activity]) {
      toast({
        title: "Duration required",
        description: "Please enter how long you did this activity in minutes.",
        variant: "destructive"
      });
      return;
    }

    setCompletedActivities(prev => ({
      ...prev,
      [activity]: true
    }));

    toast({
      title: "Activity logged",
      description: `You completed ${activity} for ${activityDurations[activity]} minutes.`,
      variant: "default"
    });
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
            
            {item.completed ? (
              <div className="text-sm text-harmony-mint font-medium">
                Completed ({activityDurations[item.activity]} min)
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-start sm:items-center">
                <div className="flex items-center mb-2 sm:mb-0">
                  <Input
                    type="number"
                    placeholder="Duration"
                    value={activityDurations[item.activity]}
                    onChange={(e) => handleDurationChange(item.activity, e.target.value)}
                    className="w-20 h-8 mr-1"
                  />
                  <span className="text-sm mr-2">minutes</span>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => handleSubmitDuration(item.activity)}
                >
                  Submit
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyPlan;
