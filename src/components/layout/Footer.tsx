
import { Link } from 'react-router-dom';
import { Heart, Twitter, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary/50 dark:bg-secondary/30 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand and social */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 text-foreground mb-4">
              <div className="h-8 w-8 bg-gradient-to-br from-harmony-mint to-harmony-blue rounded-lg"></div>
              <span className="text-xl font-display font-medium tracking-tight">Harmony</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Your holistic wellness companion for mind, body, and soul balance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-medium text-foreground mb-4">Navigation</h3>
            <ul className="space-y-2">
              {['Home', 'Meditation', 'Workouts', 'Nutrition', 'Community'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-medium text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              {['Blog', 'Podcast', 'Events', 'Experts', 'FAQ'].map((item) => (
                <li key={item}>
                  <Link 
                    to="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-medium text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {['About', 'Team', 'Careers', 'Privacy', 'Terms'].map((item) => (
                <li key={item}>
                  <Link 
                    to="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Harmony. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center mt-4 md:mt-0">
            Made with <Heart className="h-4 w-4 text-harmony-peach mx-1" /> for your wellbeing
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
