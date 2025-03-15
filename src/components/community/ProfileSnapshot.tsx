
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ProfileSnapshot = () => {
  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src="/placeholder.svg" alt="Your profile" />
        <AvatarFallback>YP</AvatarFallback>
      </Avatar>
      <div>
        <h3 className="text-sm font-medium">Sarah</h3>
        <p className="text-xs text-muted-foreground">12 connections</p>
      </div>
    </div>
  );
};

export default ProfileSnapshot;
