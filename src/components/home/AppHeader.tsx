
import { Bell } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AppHeader = () => {
  const { user } = useAuth();
  // Get the user's name from user metadata if available
  const firstName = user?.user_metadata?.first_name || user?.user_metadata?.name?.split(' ')[0];
  const lastName = user?.user_metadata?.last_name;
  const displayName = firstName ? (lastName ? `${firstName} ${lastName}` : firstName) : 'Guest';

  return (
    <div className="sticky top-6 z-40 p-4 flex justify-between items-center bg-background">
      <div className="text-lg font-semibold">Daily Wellness</div>
      <div className="flex items-center">
        <Bell className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
      </div>
    </div>
  );
};

export default AppHeader;
