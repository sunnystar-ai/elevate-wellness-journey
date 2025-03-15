
import { Flame } from 'lucide-react';

const StreakCard = () => {
  return (
    <div className="harmony-card p-4 flex items-center">
      <div className="mr-4 p-3 rounded-full bg-harmony-light-peach">
        <Flame className="h-6 w-6 text-harmony-peach" />
      </div>
      <div className="flex-grow">
        <h3 className="font-medium mb-1">7-Day Streak!</h3>
        <p className="text-sm text-muted-foreground">Keep going, you're building great habits!</p>
      </div>
      
      <div className="w-20 h-12 flex items-end justify-between">
        {[30, 45, 60, 70, 50, 80, 65].map((height, i) => (
          <div 
            key={i} 
            className="w-1.5 bg-primary rounded-full"
            style={{ height: `${height}%` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default StreakCard;
