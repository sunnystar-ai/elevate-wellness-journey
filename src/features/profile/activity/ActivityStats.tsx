
import { Card, CardContent } from '@/components/ui/card';
import { BarChart2 } from 'lucide-react';

const ActivityStats = () => {
  return (
    <section>
      <h3 className="text-lg font-semibold mb-3">Activity Stats</h3>
      <Card>
        <CardContent className="p-4">
          <div className="h-40 w-full flex items-center justify-center mb-3">
            <BarChart2 className="h-32 w-32 text-primary/50" />
            <p className="text-xs text-muted-foreground absolute">Weekly Activity Chart</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted p-2 rounded-md">
              <p className="text-xs text-muted-foreground">Activity Types</p>
              <p className="text-sm font-medium">Cardio: 45%</p>
              <p className="text-sm font-medium">Strength: 30%</p>
              <p className="text-sm font-medium">Mind: 25%</p>
            </div>
            <div className="bg-muted p-2 rounded-md">
              <p className="text-xs text-muted-foreground">Consistency</p>
              <p className="text-sm font-medium">Daily: 85%</p>
              <p className="text-sm font-medium">Weekly: 92%</p>
              <p className="text-sm font-medium">Monthly: 78%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ActivityStats;
