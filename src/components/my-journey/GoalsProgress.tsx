
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

type Goal = {
  name: string;
  startDate: string;
  targetDate: string;
  progress: number;
  status: 'on track' | 'behind' | 'ahead';
};

const GoalsProgress = () => {
  const goals: Goal[] = [
    { name: 'Meditate 10 minutes daily', startDate: 'Feb 28', targetDate: 'Apr 28', progress: 65, status: 'on track' },
    { name: 'Run 20 miles per week', startDate: 'Mar 1', targetDate: 'May 30', progress: 45, status: 'behind' },
    { name: 'Drink 2L water daily', startDate: 'Mar 5', targetDate: 'Jun 5', progress: 88, status: 'ahead' }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-md font-semibold">Goals Progress</h2>
        <Button variant="outline" size="sm" className="h-8">
          Adjust Goals
        </Button>
      </div>
      <div className="space-y-3">
        {goals.map((goal, index) => (
          <Card key={index}>
            <CardContent className="p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">{goal.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  goal.status === 'on track' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' :
                  goal.status === 'behind' ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' :
                  'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'
                }`}>
                  {goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
                </span>
              </div>
              <Progress value={goal.progress} className="h-2 mb-2" />
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">Started: {goal.startDate}</span>
                <span className="text-xs text-muted-foreground">Target: {goal.targetDate}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GoalsProgress;
