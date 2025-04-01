
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Map, Users, UserCircle, LayoutDashboard } from 'lucide-react';

const BottomNavigation = () => {
  const location = useLocation();

  const getActiveClass = (path: string) => {
    return location.pathname === path 
      ? 'text-primary' 
      : 'text-muted-foreground hover:text-foreground transition-colors';
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border flex justify-around p-3 z-50">
      <Link to="/" className={`flex flex-col items-center justify-center ${getActiveClass('/')}`}>
        <Home className="h-6 w-6" />
        <span className="text-xs mt-1">Home</span>
      </Link>
      
      <Link to="/dashboard" className={`flex flex-col items-center justify-center ${getActiveClass('/dashboard')}`}>
        <LayoutDashboard className="h-6 w-6" />
        <span className="text-xs mt-1">Dashboard</span>
      </Link>
      
      <Link to="/discover" className={`flex flex-col items-center justify-center ${getActiveClass('/discover')}`}>
        <Compass className="h-6 w-6" />
        <span className="text-xs mt-1">Discover</span>
      </Link>
      
      <Link to="/my-journey" className={`flex flex-col items-center justify-center ${getActiveClass('/my-journey')}`}>
        <Map className="h-6 w-6" />
        <span className="text-xs mt-1">My Journey</span>
      </Link>
      
      <Link to="/community" className={`flex flex-col items-center justify-center ${getActiveClass('/community')}`}>
        <Users className="h-6 w-6" />
        <span className="text-xs mt-1">Community</span>
      </Link>
      
      <Link to="/profile" className={`flex flex-col items-center justify-center ${getActiveClass('/profile')}`}>
        <UserCircle className="h-6 w-6" />
        <span className="text-xs mt-1">Profile</span>
      </Link>
    </div>
  );
};

export default BottomNavigation;
