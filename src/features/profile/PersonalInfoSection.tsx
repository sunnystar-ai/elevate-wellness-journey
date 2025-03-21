
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const PersonalInfoSection = () => {
  return (
    <section>
      <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
      <Card>
        <CardContent className="p-4 space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">Full Name</p>
            <p className="font-medium">Jane Doe</p>
          </div>
          <Separator />
          <div>
            <p className="text-sm text-muted-foreground">Email Address</p>
            <p className="font-medium">jane.doe@example.com</p>
          </div>
          <Separator />
          <div>
            <p className="text-sm text-muted-foreground">Date of Birth</p>
            <p className="font-medium">January 15, 1990</p>
          </div>
          <Separator />
          <div>
            <p className="text-sm text-muted-foreground">Gender</p>
            <p className="font-medium">Female</p>
          </div>
          <Separator />
          <div>
            <p className="text-sm text-muted-foreground">Height & Weight</p>
            <p className="font-medium">5'7" / 140 lbs</p>
          </div>
        </CardContent>
      </Card>
      <Button className="w-full mt-3">Edit Personal Info</Button>
    </section>
  );
};

export default PersonalInfoSection;
