
import { TrendingUp, CheckCircle2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const WellnessInsights = () => {
  return (
    <Card className="p-4 border border-harmony-light-lavender bg-harmony-light-lavender/20">
      <h3 className="font-medium text-lg mb-3">Your Wellness Insights</h3>
      
      <div className="mb-4 p-3 bg-white rounded-lg shadow-sm">
        <div className="flex items-center mb-2">
          <TrendingUp className="h-5 w-5 text-harmony-mint mr-2" />
          <h4 className="font-medium">Sleep quality improved 20% this week</h4>
        </div>
        <Progress value={20} className="h-1 mb-2" />
        <p className="text-sm text-muted-foreground">Your consistent bedtime routine is showing results</p>
      </div>
      
      <ul className="text-sm space-y-2 mb-4">
        <li className="flex items-start">
          <span className="bg-harmony-light-mint rounded-full p-1 mr-2 mt-0.5">
            <CheckCircle2 className="h-3 w-3 text-harmony-mint" />
          </span>
          <span>Meditation sessions increased by 30% this month</span>
        </li>
        <li className="flex items-start">
          <span className="bg-harmony-light-peach rounded-full p-1 mr-2 mt-0.5">
            <CheckCircle2 className="h-3 w-3 text-harmony-peach" />
          </span>
          <span>You're most active between 12-2pm on weekdays</span>
        </li>
      </ul>
      
      <Button className="w-full" variant="outline">See Full Analysis</Button>
    </Card>
  );
};

export default WellnessInsights;
