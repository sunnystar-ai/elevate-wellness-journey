
import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';

const AppHeader = () => {
  const { user } = useAuth();
  const userName = user ? user.name : 'Guest';

  return (
    <div className="sticky top-6 z-40 p-4 flex justify-between items-center bg-background">
      <div className="text-lg font-semibold">Daily Wellness</div>
      <div className="flex items-center gap-3">
        <Bell className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" />
          <AvatarFallback>{userName ? userName[0] : 'G'}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default AppHeader;
