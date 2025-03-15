
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, Moon, Sun, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { toast } = useToast();

  const navigation = [
    { name: 'Home', href: '/' },
    ...(isAuthenticated 
      ? [
          { name: 'Dashboard', href: '/dashboard' },
          { name: 'Discover', href: '/discover' },
          { name: 'My Journey', href: '/my-journey' },
          { name: 'Community', href: '/community' },
        ] 
      : [])
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate('/');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-foreground"
          >
            <div className="h-8 w-8 bg-gradient-to-br from-harmony-mint to-harmony-blue rounded-lg"></div>
            <span className="text-xl font-display font-medium tracking-tight">Harmony</span>
          </Link>

          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 relative
                  ${location.pathname === item.href 
                    ? 'text-primary' 
                    : 'text-foreground/80 hover:text-foreground'
                  }`}
              >
                {item.name}
                {location.pathname === item.href && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            {isAuthenticated ? (
              <>
                <Link to="/profile">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full"
                    aria-label="Profile"
                  >
                    <User size={18} />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={handleLogout}
                  aria-label="Log out"
                >
                  <LogOut size={18} />
                </Button>
              </>
            ) : (
              <div className="hidden md:flex md:items-center md:space-x-2">
                <Link to="/sign-in">
                  <Button variant="ghost" size="sm">Sign in</Button>
                </Link>
                <Link to="/sign-up">
                  <Button size="sm">Get started</Button>
                </Link>
              </div>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ease-in-out transform ${
          isOpen 
            ? 'max-h-screen opacity-100 translate-y-0' 
            : 'max-h-0 opacity-0 -translate-y-4 pointer-events-none'
        } overflow-hidden`}
      >
        <div className="px-4 py-3 space-y-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur shadow-md">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                location.pathname === item.href
                  ? 'text-primary bg-primary/5'
                  : 'text-foreground/80 hover:text-foreground hover:bg-muted'
              }`}
            >
              {item.name}
            </Link>
          ))}
          
          {!isAuthenticated && (
            <div className="pt-2 pb-1 border-t border-border/30 mt-2 space-y-1">
              <Link
                to="/sign-in"
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/sign-up"
                className="block px-3 py-2 rounded-md text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Get started
              </Link>
            </div>
          )}
          
          {isAuthenticated && (
            <div className="pt-2 pb-1 border-t border-border/30 mt-2">
              <button
                onClick={handleLogout}
                className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
              >
                <LogOut size={18} className="mr-2" />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
