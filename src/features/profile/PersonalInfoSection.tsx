
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const PersonalInfoSection = () => {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Extract user information properly
  const email = user?.email || '';
  
  useEffect(() => {
    const loadProfileData = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        // Try to get profile data from database
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', user.id)
          .maybeSingle();
        
        if (error) {
          console.error("Error fetching profile:", error);
          // Fallback to metadata if database fetch fails
          setFirstName(user.user_metadata?.first_name || '');
          setLastName(user.user_metadata?.last_name || '');
        } else if (profile) {
          // Use database profile data if available
          setFirstName(profile.first_name || '');
          setLastName(profile.last_name || '');
        } else {
          // Fallback to metadata if no profile found
          setFirstName(user.user_metadata?.first_name || '');
          setLastName(user.user_metadata?.last_name || '');
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        // Fallback to metadata
        setFirstName(user.user_metadata?.first_name || '');
        setLastName(user.user_metadata?.last_name || '');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProfileData();
  }, [user]);
  
  // Use full name if both parts exist, otherwise show individual parts
  const fullName = (firstName || lastName) 
    ? `${firstName} ${lastName}`.trim() 
    : '';

  return (
    <section>
      <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
      <Card>
        <CardContent className="p-4 space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">Full Name</p>
            {isLoading ? (
              <div className="h-6 w-32 bg-muted animate-pulse rounded" />
            ) : (
              <p className="font-medium">{fullName || 'Not provided'}</p>
            )}
          </div>
          <Separator />
          <div>
            <p className="text-sm text-muted-foreground">Email Address</p>
            <p className="font-medium">{email}</p>
          </div>
        </CardContent>
      </Card>
      <Button className="w-full mt-3">Edit Personal Info</Button>
    </section>
  );
};

export default PersonalInfoSection;
