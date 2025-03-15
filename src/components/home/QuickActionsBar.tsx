
import { Brain, Heart as HeartIcon, Droplets, BookOpen as BookOpenIcon, Award as AwardIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActionsBar = () => {
  const navigate = useNavigate();

  const quickActions = [
    { name: 'Meditation', icon: <Brain className="h-6 w-6 text-white" />, to: '/meditation', color: 'from-harmony-light-lavender to-harmony-lavender' },
    { name: 'Workout', icon: <AwardIcon className="h-6 w-6 text-white" />, to: '/workouts', color: 'from-harmony-light-blue to-harmony-blue' },
    { name: 'Mood', icon: <HeartIcon className="h-6 w-6 text-white" />, to: '/my-journey', color: 'from-harmony-light-peach to-harmony-peach' },
    { name: 'Water', icon: <Droplets className="h-6 w-6 text-white" />, to: '/nutrition', color: 'from-harmony-light-mint to-harmony-mint' },
    { name: 'Journal', icon: <BookOpenIcon className="h-6 w-6 text-white" />, to: '/my-journey', color: 'from-harmony-light-lavender to-harmony-lavender' }
  ];

  return (
    <div className="flex overflow-x-auto pb-2 gap-4 scrollbar-hide">
      {quickActions.map((action, index) => (
        <div 
          key={action.name}
          className="flex flex-col items-center flex-shrink-0"
          style={{ 
            animationDelay: `${index * 100}ms`, 
            animation: 'scale-in 0.5s ease-out backwards' 
          }}
        >
          <div 
            onClick={() => navigate(action.to)}
            className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 bg-gradient-to-br ${action.color} cursor-pointer hover:shadow-md transition-all duration-300`}
          >
            {action.icon}
          </div>
          <span className="text-xs font-medium">{action.name}</span>
        </div>
      ))}
    </div>
  );
};

export default QuickActionsBar;
