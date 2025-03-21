
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Lock, Bell, Eye, Link, ChevronRight, UserCircle
} from 'lucide-react';

const AccountSettings = () => {
  return (
    <section>
      <h3 className="text-lg font-semibold mb-3">Account Settings</h3>
      <Card>
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-4 hover:bg-accent rounded-t-md">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-muted-foreground" />
              <span>Change Password</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
          <Separator />
          <div className="flex items-center justify-between p-4 hover:bg-accent">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span>Email Preferences</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
          <Separator />
          <div className="flex items-center justify-between p-4 hover:bg-accent">
            <div className="flex items-center gap-3">
              <Eye className="h-5 w-5 text-muted-foreground" />
              <span>Privacy Settings</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
          <Separator />
          <div className="flex items-center justify-between p-4 hover:bg-accent">
            <div className="flex items-center gap-3">
              <Link className="h-5 w-5 text-muted-foreground" />
              <span>Connected Accounts</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
          <Separator />
          <div className="flex items-center justify-between p-4 hover:bg-accent rounded-b-md">
            <div className="flex items-center gap-3">
              <UserCircle className="h-5 w-5 text-destructive" />
              <span className="text-destructive">Delete Account</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default AccountSettings;
