
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutSection = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
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
