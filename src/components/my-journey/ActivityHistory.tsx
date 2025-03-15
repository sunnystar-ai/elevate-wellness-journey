
import { Activity } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type ActivityItem = {
  icon: string;
  name: string;
  dateTime: string;
  duration: string;
  category: string;
};

const ActivityHistory = () => {
  const activities: ActivityItem[] = [
    { icon: 'meditation', name: 'Morning Meditation', dateTime: 'Today, 7:30 AM', duration: '15 minutes', category: 'Mental' },
    { icon: 'run', name: 'Outdoor Run', dateTime: 'Today, 6:15 PM', duration: '3.2 miles', category: 'Cardio' },
    { icon: 'yoga', name: 'Evening Yoga', dateTime: 'Yesterday, 8:00 PM', duration: '30 minutes', category: 'Flexibility' },
    { icon: 'weights', name: 'Strength Training', dateTime: 'March 13, 10:00 AM', duration: '45 minutes', category: 'Strength' }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-md font-semibold">Recent Activities</h2>
        <Button variant="link" size="sm" className="h-8 px-0">
          See All
        </Button>
      </div>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <Card key={index}>
            <CardContent className="p-3 flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{activity.name}</span>
                  <span className="text-xs text-muted-foreground">{activity.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">{activity.dateTime}</span>
                  <span className="text-xs px-1.5 py-0.5 bg-muted rounded-full">{activity.category}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ActivityHistory;
