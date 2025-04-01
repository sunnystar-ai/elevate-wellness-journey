
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const PersonalInfoSection = () => {
  const { user } = useAuth();
  
  // Get user data without adding fallback last names
  const firstName = user?.user_metadata?.first_name || user?.user_metadata?.name?.split(' ')[0] || '';
  const lastName = user?.user_metadata?.last_name || '';
  const fullName = firstName && lastName ? `${firstName} ${lastName}` : firstName;
  const email = user?.email || '';

  return (
    <section>
      <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
      <Card>
        <CardContent className="p-4 space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">Full Name</p>
            <p className="font-medium">{fullName}</p>
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
