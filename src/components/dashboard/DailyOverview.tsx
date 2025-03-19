
import { Progress } from '@/components/ui/progress';

const DailyOverview = () => {
  return (
    <div className="flex flex-col items-center text-center mb-6">
      <div className="relative w-40 h-40 mb-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-3xl font-bold">70%</div>
        </div>
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle 
            cx="50" cy="50" r="40" 
            fill="none" 
            stroke="hsl(var(--muted))" 
            strokeWidth="8"
          />
          <circle 
            cx="50" cy="50" r="40" 
            fill="none" 
            stroke="hsl(var(--primary))" 
            strokeWidth="8"
            strokeDasharray="251.2"
            strokeDashoffset="75.36" 
            transform="rotate(-90 50 50)"
          />
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full">
        <div className="p-3 rounded-lg bg-white shadow-sm">
          <div className="text-sm font-medium mb-1 flex justify-between">
            <span>Mental</span>
            <span>3/4</span>
          </div>
          <Progress value={75} className="h-2" />
        </div>
        
        <div className="p-3 rounded-lg bg-white shadow-sm">
          <div className="text-sm font-medium mb-1 flex justify-between">
            <span>Physical</span>
            <span>2/3</span>
          </div>
          <Progress value={66} className="h-2" />
        </div>
        
        <div className="p-3 rounded-lg bg-white shadow-sm">
          <div className="text-sm font-medium mb-1 flex justify-between">
            <span>Nutrition</span>
            <span>4/5</span>
          </div>
          <Progress value={80} className="h-2" />
        </div>
        
        <div className="p-3 rounded-lg bg-white shadow-sm">
          <div className="text-sm font-medium mb-1 flex justify-between">
            <span>Sleep</span>
            <span>7.5hrs</span>
          </div>
          <Progress value={85} className="h-2" />
        </div>
      </div>
    </div>
  );
};

export default DailyOverview;
