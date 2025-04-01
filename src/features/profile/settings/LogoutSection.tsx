
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const LogoutSection = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
        description: "You have been signed out of your account"
      });
      navigate('/sign-in');
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: "There was a problem signing you out. Please try again."
      });
    }
  };
  
  return (
    <>
      <Button 
        className="w-full bg-destructive text-destructive-foreground"
        onClick={handleLogout}
      >
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
