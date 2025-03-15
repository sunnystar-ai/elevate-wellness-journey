
import { useNavigate } from 'react-router-dom';
import { ArrowRight as ArrowRightIcon, Moon as MoonIcon, Award as AwardIcon, BookOpen as BookOpenIcon } from 'lucide-react';

const DailyTimeline = () => {
  const navigate = useNavigate();
  
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

  return (
    <div className="space-y-3">
      {timelineItems.map((item, index) => (
        <div 
          key={item.title}
          className="flex items-center p-3 rounded-lg bg-white shadow-sm cursor-pointer hover:shadow-md transition-all duration-300"
          onClick={() => navigate(item.to)}
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
          <ArrowRightIcon className="h-4 w-4 text-muted-foreground" />
        </div>
      ))}
    </div>
  );
};

export default DailyTimeline;
