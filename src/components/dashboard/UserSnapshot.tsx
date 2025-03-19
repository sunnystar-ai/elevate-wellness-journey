
import { Flame } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const UserSnapshot = () => {
  return (
    <div className="flex items-center">
      <Avatar className="h-12 w-12 mr-3">
        <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" />
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
      <div>
        <div className="flex items-center">
          <Flame className="h-4 w-4 text-harmony-peach mr-1" />
          <span className="text-sm font-medium">12 day streak</span>
        </div>
        <div className="text-sm text-muted-foreground">Level 8: Wellness Warrior</div>
      </div>
    </div>
  );
};

export default UserSnapshot;
