
import { Progress } from '@/components/ui/progress';

const ProgressCircle = () => {
  return (
    <div className="flex flex-col items-center text-center mb-6">
      <div className="relative w-40 h-40 mb-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-3xl font-bold">72%</div>
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
            strokeDashoffset="70.336" 
            transform="rotate(-90 50 50)"
          />
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full">
        <div className="p-3 rounded-lg bg-white shadow-sm">
          <div className="text-sm font-medium mb-1 flex justify-between">
            <span>Mental</span>
            <span>2/3</span>
          </div>
          <Progress value={66} className="h-2" />
        </div>
        
        <div className="p-3 rounded-lg bg-white shadow-sm">
          <div className="text-sm font-medium mb-1 flex justify-between">
            <span>Physical</span>
            <span>1/2</span>
          </div>
          <Progress value={50} className="h-2" />
        </div>
        
        <div className="p-3 rounded-lg bg-white shadow-sm">
          <div className="text-sm font-medium mb-1 flex justify-between">
            <span>Nutrition</span>
            <span>2/3</span>
          </div>
          <Progress value={66} className="h-2" />
        </div>
        
        <div className="p-3 rounded-lg bg-white shadow-sm">
          <div className="text-sm font-medium mb-1 flex justify-between">
            <span>Sleep</span>
            <span>1/1</span>
          </div>
          <Progress value={100} className="h-2" />
        </div>
      </div>
    </div>
  );
};

export default ProgressCircle;
