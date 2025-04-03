import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import EditPersonalInfoForm from './EditPersonalInfoForm';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from './types';

const PersonalInfoSection = () => {
  const { user } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Extract user information properly
  const email = user?.email || '';
  
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  useEffect(() => {
    const loadProfileData = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        
        if (error) {
          console.error("Error loading profile:", error);
          return;
        }
        
        setProfileData(data as Profile);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProfileData();
  }, [user, isDialogOpen]); // Reload when dialog closes

  return (
    <section>
      <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
      <Card>
        <CardContent className="p-4 space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">Email Address</p>
            <p className="font-medium">{email}</p>
          </div>
          
          {!isLoading && profileData && (
            <>
              <Separator />
              {(profileData.first_name || profileData.last_name) && (
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">
                    {[profileData.first_name, profileData.last_name].filter(Boolean).join(' ')}
                  </p>
                </div>
              )}
              
              {profileData.birth_date && (
                <div>
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p className="font-medium">
                    {new Date(profileData.birth_date).toLocaleDateString()}
                  </p>
                </div>
              )}
              
              {(profileData.weight || profileData.height) && (
                <div>
                  <p className="text-sm text-muted-foreground">Physical</p>
                  <p className="font-medium">
                    {profileData.height && `Height: ${profileData.height} cm`}
                    {profileData.weight && profileData.height && ' | '}
                    {profileData.weight && `Weight: ${profileData.weight} kg`}
                  </p>
                </div>
              )}
              
              {profileData.career && (
                <div>
                  <p className="text-sm text-muted-foreground">Career</p>
                  <p className="font-medium">{profileData.career}</p>
                </div>
              )}
              
              {profileData.hobbies && (
                <div>
                  <p className="text-sm text-muted-foreground">Hobbies</p>
                  <p className="font-medium">{profileData.hobbies}</p>
                </div>
              )}
              
              {profileData.interests && (
                <div>
                  <p className="text-sm text-muted-foreground">Interests</p>
                  <p className="font-medium">{profileData.interests}</p>
                </div>
              )}
              
              {profileData.bio && (
                <div>
                  <p className="text-sm text-muted-foreground">About</p>
                  <p className="font-medium">{profileData.bio}</p>
                </div>
              )}
            </>
          )}
          
          <Separator />
          <div>
            <p className="text-sm text-muted-foreground">Profile Completeness</p>
            <p className="font-medium">Basic profile</p>
            <p className="text-xs text-muted-foreground mt-1">
              Complete your profile to unlock more personalized experiences
            </p>
          </div>
        </CardContent>
      </Card>
      <Button className="w-full mt-3" onClick={openDialog}>
        Edit Personal Info
      </Button>

      <EditPersonalInfoForm isOpen={isDialogOpen} onClose={closeDialog} />
    </section>
  );
};

export default PersonalInfoSection;
