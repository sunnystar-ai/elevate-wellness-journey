
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Bell, Trophy, Activity } from 'lucide-react';

const NotificationsSettings = () => {
  return (
    <section>
      <h3 className="text-lg font-semibold mb-3">Notifications</h3>
      <Card>
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-4 hover:bg-accent rounded-t-md">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span>Activity Reminders</span>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between p-4 hover:bg-accent">
            <div className="flex items-center gap-3">
              <Trophy className="h-5 w-5 text-muted-foreground" />
              <span>Goal Updates</span>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between p-4 hover:bg-accent rounded-b-md">
            <div className="flex items-center gap-3">
              <Activity className="h-5 w-5 text-muted-foreground" />
              <span>Challenge Alerts</span>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default NotificationsSettings;
