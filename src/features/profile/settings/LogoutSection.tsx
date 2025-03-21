
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const LogoutSection = () => {
  return (
    <>
      <Button className="w-full bg-destructive text-destructive-foreground">
        <LogOut className="h-4 w-4 mr-2" />
        Log Out
      </Button>
      
      <p className="text-xs text-center text-muted-foreground mt-2">
        App Version 1.2.4
      </p>
    </>
  );
};

export default LogoutSection;
