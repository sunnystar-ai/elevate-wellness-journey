
import { useState } from 'react';
import { Footprints, Droplet, Clock, Trash2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const QuickStats = () => {
  const { toast } = useToast();
  const [statsVisible, setStatsVisible] = useState({
    steps: true,
    water: true,
    activeTime: true
  });

  const handleDelete = (statType: 'steps' | 'water' | 'activeTime') => {
    setStatsVisible(prev => ({ ...prev, [statType]: false }));
    
    // Show toast confirmation
    toast({
      title: "Stat removed",
      description: `The ${statType} metric has been removed from your dashboard`,
      action: (
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            setStatsVisible(prev => ({ ...prev, [statType]: true }));
            toast({
              title: "Stat restored",
              description: `The ${statType} metric has been restored to your dashboard`,
            });
          }}
        >
          Undo
        </Button>
      ),
    });
  };

  // Determine how many columns to show based on visible stats
  const activeStats = Object.values(statsVisible).filter(Boolean).length;
  const gridCols = activeStats === 3 ? 'grid-cols-3' : 
                   activeStats === 2 ? 'grid-cols-2' : 
                   activeStats === 1 ? 'grid-cols-1' : '';

  if (activeStats === 0) {
    return (
      <div className="bg-white rounded-lg p-4 shadow-sm text-center text-muted-foreground">
        <p>All quick stats have been removed</p>
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-2"
          onClick={() => setStatsVisible({ steps: true, water: true, activeTime: true })}
        >
          Restore All
        </Button>
      </div>
    );
  }

  return (
    <div className={`grid ${gridCols} gap-3`}>
      {statsVisible.steps && (
        <div className="bg-white rounded-lg p-3 shadow-sm relative group">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7"
            onClick={() => handleDelete('steps')}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
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
      )}

      {statsVisible.water && (
        <div className="bg-white rounded-lg p-3 shadow-sm relative group">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7"
            onClick={() => handleDelete('water')}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
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
      )}

      {statsVisible.activeTime && (
        <div className="bg-white rounded-lg p-3 shadow-sm relative group">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7"
            onClick={() => handleDelete('activeTime')}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
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
      )}
    </div>
  );
};

export default QuickStats;
