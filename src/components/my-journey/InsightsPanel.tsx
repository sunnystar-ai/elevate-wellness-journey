
import { Activity } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const InsightsPanel = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-md font-semibold">Your Insights</h2>
      </div>
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start space-x-3">
            <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
              <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-sm">You're most active on Tuesdays, completing 86% of your daily goals.</p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center flex-shrink-0">
              <Activity className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <p className="text-sm">Morning meditation improves your daily mood score by 15%.</p>
          </div>
          
          <Button variant="secondary" className="w-full mt-2">View Full Analysis</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsightsPanel;
