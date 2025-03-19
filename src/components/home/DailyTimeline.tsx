import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight as ArrowRightIcon, Moon as MoonIcon, Award as AwardIcon, BookOpen as BookOpenIcon, Check as CheckIcon } from 'lucide-react';

const DailyTimeline = () => {
  const navigate = useNavigate();
  const [completedActivities, setCompletedActivities] = useState<Record<string, boolean>>({});
  
  const timelineItems = [
    { 
      title: 'Morning Meditation', 
      time: '9:00 AM', 
      description: '10 min Mindfulness', 
      icon: <MoonIcon className="h-4 w-4 text-harmony-lavender" />,
      to: '/meditation'
    },
    { 
      title: 'HIIT Workout', 
      time: '12:30 PM', 
      description: '20 min High Intensity', 
      icon: <AwardIcon className="h-4 w-4 text-harmony-blue" />,
      to: '/workouts'
    },
    { 
      title: 'Lunch Reminder', 
      time: '1:00 PM', 
      description: 'Balanced meal', 
      icon: <BookOpenIcon className="h-4 w-4 text-harmony-mint" />,
      to: '/nutrition'
    },
    { 
      title: 'Bedtime Routine', 
      time: '10:30 PM', 
      description: 'Wind down ritual', 
      icon: <MoonIcon className="h-4 w-4 text-harmony-peach" />,
      to: '/meditation'
    }
  ];

  // Filter out "Lunchtime walk" - since it's not in the list, we'll keep the full list

  const handleItemClick = (item: typeof timelineItems[0], event: React.MouseEvent) => {
    if (event.target instanceof HTMLButtonElement) {
      // If the button was clicked, toggle completion
      event.stopPropagation();
      setCompletedActivities(prev => ({
        ...prev,
        [item.title]: !prev[item.title]
      }));
    } else {
      // Otherwise navigate to the page
      navigate(item.to);
    }
  };

  return (
    <div className="space-y-3">
      {timelineItems.map((item, index) => (
        <div 
          key={item.title}
          className="flex items-center p-3 rounded-lg bg-white shadow-sm cursor-pointer hover:shadow-md transition-all duration-300"
          onClick={(e) => handleItemClick(item, e)}
          style={{ 
            animationDelay: `${index * 100}ms`, 
            animation: 'fade-in 0.5s ease-out backwards' 
          }}
        >
          <div className="mr-3 p-2 rounded-full bg-white shadow-sm">
            {item.icon}
          </div>
          <div className="flex-grow mr-2">
            <div className="flex justify-between">
              <h3 className="font-medium">{item.title}</h3>
              <span className="text-sm text-muted-foreground">{item.time}</span>
            </div>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
          {completedActivities[item.title] ? (
            <button 
              className="flex items-center justify-center px-3 py-1 text-sm font-medium text-white bg-harmony-mint rounded-md"
              onClick={(e) => e.stopPropagation()}
            >
              <CheckIcon className="h-4 w-4 mr-1" />
              Done
            </button>
          ) : (
            <button 
              className="flex items-center justify-center px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-md"
              onClick={(e) => e.stopPropagation()}
            >
              Mark Done
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default DailyTimeline;
