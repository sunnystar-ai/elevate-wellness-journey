
import { useState, useEffect } from 'react';
import { CalendarCheck, Flame, Brain, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { saveDailyActivity } from '@/services/supabaseService';

interface DailyPlanProps {
  onActivityUpdate?: (activityDurations: Record<string, string>) => void;
}

const DailyPlan = ({ onActivityUpdate }: DailyPlanProps) => {
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
  
  const [submitting, setSubmitting] = useState<Record<string, boolean>>({
    "Morning meditation": false,
    "Evening workout": false,
    "Sleep preparation": false
  });

  const dailyPlan = [
    { time: "7:00 AM", activity: "Morning meditation", completed: completedActivities["Morning meditation"], icon: <Flame className="h-4 w-4 text-harmony-lavender" />, unit: "minutes" },
    { time: "6:00 PM", activity: "Evening workout", completed: completedActivities["Evening workout"], icon: <Award className="h-4 w-4 text-harmony-mint" />, unit: "minutes" },
    { time: "10:00 PM", activity: "Sleep preparation", completed: completedActivities["Sleep preparation"], icon: <Clock className="h-4 w-4 text-harmony-peach" />, unit: "hours" }
  ];

  // Load completed activities from localStorage on mount
  useEffect(() => {
    const savedActivities = localStorage.getItem('completedActivities');
    const savedDurations = localStorage.getItem('activityDurations');
    
    if (savedActivities) {
      try {
        setCompletedActivities(JSON.parse(savedActivities));
      } catch (e) {
        console.error('Error parsing saved activities:', e);
      }
    }
    
    if (savedDurations) {
      try {
        setActivityDurations(JSON.parse(savedDurations));
      } catch (e) {
        console.error('Error parsing saved durations:', e);
      }
    }
  }, []);

  // Notify parent component when activity durations change
  useEffect(() => {
    if (onActivityUpdate) {
      onActivityUpdate(activityDurations);
    }
    
    // Save to localStorage
    localStorage.setItem('activityDurations', JSON.stringify(activityDurations));
  }, [activityDurations, onActivityUpdate]);

  // Save completed activities to localStorage when they change
  useEffect(() => {
    localStorage.setItem('completedActivities', JSON.stringify(completedActivities));
  }, [completedActivities]);

  // Function to handle duration input changes
  const handleDurationChange = (activity: string, value: string) => {
    setActivityDurations(prev => ({
      ...prev,
      [activity]: value
    }));
  };

  // Function to handle submitting activity duration
  const handleSubmitDuration = async (activity: string) => {
    if (!activityDurations[activity]) {
      toast({
        title: "Duration required",
        description: `Please enter how long you did this activity in ${activity === "Sleep preparation" ? "hours" : "minutes"}.`,
        variant: "destructive"
      });
      return;
    }

    const duration = parseFloat(activityDurations[activity]);
    if (isNaN(duration) || duration <= 0) {
      toast({
        title: "Invalid duration",
        description: "Please enter a valid positive number.",
        variant: "destructive"
      });
      return;
    }

    try {
      setSubmitting(prev => ({ ...prev, [activity]: true }));
      
      // Save to Supabase
      await saveDailyActivity({
        activity_name: activity,
        duration: duration,
        duration_unit: activity === "Sleep preparation" ? "hours" : "minutes",
        completed: true
      });

      setCompletedActivities(prev => ({
        ...prev,
        [activity]: true
      }));

      toast({
        title: "Activity logged",
        description: `You completed ${activity} for ${activityDurations[activity]} ${activity === "Sleep preparation" ? "hours" : "minutes"}.`,
        variant: "default"
      });
    } catch (error) {
      console.error('Error saving activity:', error);
      
      toast({
        title: "Save Failed",
        description: "There was an error saving your activity. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(prev => ({ ...prev, [activity]: false }));
    }
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
                Completed ({activityDurations[item.activity]} {item.unit})
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
                  <span className="text-sm mr-2">{item.unit}</span>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => handleSubmitDuration(item.activity)}
                  disabled={submitting[item.activity]}
                >
                  {submitting[item.activity] ? 'Saving...' : 'Submit'}
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
