
import { Edit, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

type Habit = {
  name: string;
  completionDays: boolean[];
  rate: number;
};

const HabitTracker = () => {
  const habits: Habit[] = [
    { name: 'Meditation', completionDays: [true, true, false, true, true, false, true], rate: 72 },
    { name: 'Exercise', completionDays: [true, false, true, true, false, true, true], rate: 68 },
    { name: 'Water Intake', completionDays: [true, true, true, true, true, false, false], rate: 86 },
    { name: 'Sleep 8hrs', completionDays: [false, true, true, false, true, true, false], rate: 57 },
    { name: 'Healthy Meals', completionDays: [true, true, false, true, true, true, true], rate: 92 }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-md font-semibold">Your Habits</h2>
        <Button variant="ghost" size="sm" className="h-8">
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Button>
      </div>
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            {habits.map((habit, habitIndex) => (
              <div key={habitIndex}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">{habit.name}</span>
                  <span className="text-xs text-muted-foreground">{habit.rate}%</span>
                </div>
                <div className="flex justify-between mb-1">
                  {habit.completionDays.map((completed, dayIndex) => (
                    <div 
                      key={dayIndex} 
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        completed ? 'bg-primary/20 text-primary' : 'bg-gray-100 text-muted-foreground'
                      }`}
                    >
                      {completed && <Check className="h-4 w-4" />}
                    </div>
                  ))}
                </div>
                <Progress value={habit.rate} className="h-1.5 mb-3" />
                {habitIndex < habits.length - 1 && <Separator className="mt-2" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HabitTracker;
