
import { Link } from 'react-router-dom';
import { Heart, Brain, Dumbbell, Utensils, Users } from 'lucide-react';

const QuickAccess = () => {
  const buttons = [
    { 
      name: 'Meditation', 
      icon: <Brain className="h-6 w-6 text-white" />, 
      to: '/meditation',
      color: 'from-harmony-light-lavender to-harmony-lavender',
      delay: 100
    },
    { 
      name: 'Workouts', 
      icon: <Dumbbell className="h-6 w-6 text-white" />, 
      to: '/workouts',
      color: 'from-harmony-light-blue to-harmony-blue',
      delay: 200
    },
    { 
      name: 'Nutrition', 
      icon: <Utensils className="h-6 w-6 text-white" />, 
      to: '/nutrition',
      color: 'from-harmony-light-mint to-harmony-mint',
      delay: 300
    },
    { 
      name: 'Community', 
      icon: <Users className="h-6 w-6 text-white" />, 
      to: '/community',
      color: 'from-harmony-light-peach to-harmony-peach',
      delay: 400
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {buttons.map((button, index) => (
        <Link 
          key={button.name} 
          to={button.to}
          className="flex flex-col items-center p-4 rounded-xl bg-white dark:bg-card shadow-card hover:shadow-hover transition-all duration-300 transform hover:-translate-y-1"
          style={{ 
            animationDelay: `${button.delay}ms`, 
            animation: 'scale-in 0.5s ease-out backwards' 
          }}
        >
          <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 bg-gradient-to-br ${button.color}`}>
            {button.icon}
          </div>
          <span className="text-sm font-medium">{button.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default QuickAccess;
