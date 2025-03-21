
import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { User, Settings, Activity } from 'lucide-react';
import StatusBar from '@/components/community/StatusBar';
import BottomNav from '@/components/my-journey/BottomNav';
import ProfileHeader from '@/features/profile/ProfileHeader';
import ProfileTab from '@/features/profile/tabs/ProfileTab';
import ActivityTab from '@/features/profile/tabs/ActivityTab';
import SettingsTab from '@/features/profile/tabs/SettingsTab';

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [mbtiType, setMbtiType] = useState<string | null>(null);
  const [mbtiDescription, setMbtiDescription] = useState<string | null>(null);

  useEffect(() => {
    // Get MBTI results from local storage if available
    const storedType = localStorage.getItem('mbtiType');
    const storedDescription = localStorage.getItem('mbtiDescription');
    
    if (storedType) {
      setMbtiType(storedType);
    }
    
    if (storedDescription) {
      setMbtiDescription(storedDescription);
    }
  }, []);

  return (
    <div className="pb-24 bg-background min-h-screen">
      {/* Status Bar */}
      <StatusBar />
      
      {/* Profile Header with Stats */}
      <ProfileHeader />
      
      {/* Tabs Navigation */}
      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="mx-4">
        <TabsList className="grid grid-cols-3 w-full mb-4">
          <TabsTrigger value="profile" className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-1">
            <Activity className="h-4 w-4" />
            <span>Activity</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Profile Tab Content */}
        <TabsContent value="profile">
          <ProfileTab mbtiType={mbtiType} mbtiDescription={mbtiDescription} />
        </TabsContent>
        
        {/* Activity Tab Content */}
        <TabsContent value="activity">
          <ActivityTab />
        </TabsContent>
        
        {/* Settings Tab Content */}
        <TabsContent value="settings">
          <SettingsTab />
        </TabsContent>
      </Tabs>
      
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Profile;
