
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Sun, Bell, Activity, Link } from 'lucide-react';

const AppPreferences = () => {
  return (
    <section>
      <h3 className="text-lg font-semibold mb-3">App Preferences</h3>
      <Card>
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-4 hover:bg-accent rounded-t-md">
            <div className="flex items-center gap-3">
              <Sun className="h-5 w-5 text-muted-foreground" />
              <span>Dark/Light Mode</span>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between p-4 hover:bg-accent">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span>Sound Effects</span>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between p-4 hover:bg-accent">
            <div className="flex items-center gap-3">
              <Activity className="h-5 w-5 text-muted-foreground" />
              <span>Haptic Feedback</span>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between p-4 hover:bg-accent rounded-b-md">
            <div className="flex items-center gap-3">
              <Link className="h-5 w-5 text-muted-foreground" />
              <span>Offline Mode</span>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default AppPreferences;
