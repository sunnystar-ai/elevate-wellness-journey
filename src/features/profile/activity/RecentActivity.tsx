
import { Card, CardContent } from '@/components/ui/card';
import { Activity, Clock, Trophy } from 'lucide-react';

const RecentActivity = () => {
  return (
    <section>
      <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>
      <div className="space-y-3">
        <Card>
          <CardContent className="p-3 flex items-center">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Morning Run</span>
                <span className="text-xs text-muted-foreground">5.2 km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Today, 6:30 AM</span>
                <span className="text-xs px-1.5 py-0.5 bg-muted rounded-full">Cardio</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-3 flex items-center">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Meditation</span>
                <span className="text-xs text-muted-foreground">15 min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Today, 7:15 AM</span>
                <span className="text-xs px-1.5 py-0.5 bg-muted rounded-full">Mindfulness</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-3 flex items-center">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <Trophy className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Badge Earned</span>
                <span className="text-xs text-muted-foreground">15 Points</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Yesterday, 8:30 PM</span>
                <span className="text-xs px-1.5 py-0.5 bg-muted rounded-full">Achievement</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RecentActivity;
