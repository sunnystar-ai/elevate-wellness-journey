
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Edit } from 'lucide-react';

const ProfileHeader = () => {
  return (
    <>
      {/* Profile Header */}
      <div className="flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">Profile & Settings</h1>
        <Button variant="ghost" size="sm">
          <Edit className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Profile Card */}
      <Card className="mx-4 mb-5">
        <CardContent className="p-6 flex flex-col items-center">
          <Avatar className="h-24 w-24 mb-3">
            <AvatarImage src="/placeholder.svg" alt="Profile picture" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          
          <h2 className="text-xl font-semibold">Jane Doe</h2>
          <p className="text-sm text-muted-foreground mb-1">@janedoe</p>
          <p className="text-xs text-muted-foreground mb-3">Member since January 2024</p>
          
          <div className="w-full mb-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm">Level 7</span>
              <span className="text-sm">2,450 / 3,000 XP</span>
            </div>
            <Progress value={82} className="h-2" />
          </div>
          
          <p className="text-sm text-center">Wellness enthusiast committed to daily mindfulness and active living.</p>
        </CardContent>
      </Card>
      
      {/* Quick Stats */}
      <Card className="mx-4 mb-5">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="flex flex-col">
              <span className="text-2xl font-bold">16</span>
              <span className="text-xs text-muted-foreground">Day Streak</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">1,280</span>
              <span className="text-xs text-muted-foreground">Total Points</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">82%</span>
              <span className="text-xs text-muted-foreground">Weekly Avg</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ProfileHeader;
