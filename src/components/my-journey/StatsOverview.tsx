
import { Card, CardContent } from '@/components/ui/card';

const StatsOverview = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-4 gap-3">
          <div className="flex flex-col items-center">
            <span className="text-xs text-muted-foreground">Active Days</span>
            <span className="text-lg font-semibold">5/7</span>
            <div className="w-full h-1 bg-primary/20 rounded-full mt-1">
              <div className="h-full w-[71%] bg-primary rounded-full"></div>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-xs text-muted-foreground">Avg Score</span>
            <span className="text-lg font-semibold">82%</span>
            <div className="w-full h-1 bg-primary/20 rounded-full mt-1">
              <div className="h-full w-[82%] bg-primary rounded-full"></div>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-xs text-muted-foreground">Streak</span>
            <span className="text-lg font-semibold">16d</span>
            <div className="w-full h-1 bg-primary/20 rounded-full mt-1">
              <div className="h-full w-[90%] bg-primary rounded-full"></div>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-xs text-muted-foreground">Points</span>
            <span className="text-lg font-semibold">340</span>
            <div className="w-full h-1 bg-primary/20 rounded-full mt-1">
              <div className="h-full w-[65%] bg-primary rounded-full"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsOverview;
