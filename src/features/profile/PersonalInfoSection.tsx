
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import EditPersonalInfoForm from './EditPersonalInfoForm';

const PersonalInfoSection = () => {
  const { user } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Extract user information properly
  const email = user?.email || '';
  
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <section>
      <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
      <Card>
        <CardContent className="p-4 space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">Email Address</p>
            <p className="font-medium">{email}</p>
          </div>
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
