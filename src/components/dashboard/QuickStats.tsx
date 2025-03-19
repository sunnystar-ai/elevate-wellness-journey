
import { Footprints, Droplet, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const QuickStats = () => {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="bg-white rounded-lg p-3 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center">
            <Footprints className="h-4 w-4 text-harmony-blue mr-1" />
            <span className="text-sm font-medium">Steps</span>
          </div>
        </div>
        <div className="text-lg font-bold">6,842</div>
        <div className="text-xs text-muted-foreground">of 10,000 goal</div>
        <Progress value={68} className="h-1 mt-1" />
      </div>

      <div className="bg-white rounded-lg p-3 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center">
            <Droplet className="h-4 w-4 text-harmony-mint mr-1" />
            <span className="text-sm font-medium">Water</span>
          </div>
        </div>
        <div className="text-lg font-bold">5</div>
        <div className="text-xs text-muted-foreground">of 8 glasses</div>
        <Progress value={62} className="h-1 mt-1" />
      </div>

      <div className="bg-white rounded-lg p-3 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-harmony-peach mr-1" />
            <span className="text-sm font-medium">Active</span>
          </div>
        </div>
        <div className="text-lg font-bold">34</div>
        <div className="text-xs text-muted-foreground">of 45 minutes</div>
        <Progress value={75} className="h-1 mt-1" />
      </div>
    </div>
  );
};

export default QuickStats;
