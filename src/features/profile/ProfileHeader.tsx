
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Edit } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const ProfileHeader = () => {
  const { user } = useAuth();
  
  // Extract user information from email if metadata is not available
  const email = user?.email || '';
  const username = email ? email.split('@')[0] : '';
  
  // Get name from metadata if available, otherwise use username from email
  const firstName = user?.user_metadata?.first_name || '';
  const lastName = user?.user_metadata?.last_name || '';
  
  // Use full name if both parts exist, otherwise fallback to username from email
  const displayName = (firstName || lastName) 
    ? `${firstName} ${lastName}`.trim() 
    : username;
  
  // Generate avatar initial based on actual name or email
  const initial = displayName ? displayName[0].toUpperCase() : (email ? email[0].toUpperCase() : '');
  
  // Calculate membership date
  const memberSince = user?.created_at 
    ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : '';

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
            <AvatarImage src={user?.user_metadata?.avatar_url || "/placeholder.svg"} alt="Profile picture" />
            <AvatarFallback>{initial}</AvatarFallback>
          </Avatar>
          
          <h2 className="text-xl font-semibold">{displayName || 'User'}</h2>
          {email && <p className="text-sm text-muted-foreground mb-1">@{username}</p>}
          {memberSince && <p className="text-xs text-muted-foreground mb-3">Member since {memberSince}</p>}
          
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
    </>
  );
};

export default ProfileHeader;
