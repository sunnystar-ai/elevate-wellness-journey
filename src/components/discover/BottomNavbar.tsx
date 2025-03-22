
import React from 'react';
import { Link } from 'react-router-dom';

const BottomNavbar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t px-6 py-2 flex justify-between items-center">
      <Link to="/" className="flex flex-col items-center">
        <div className="p-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        </div>
        <span className="text-xs text-muted-foreground">Home</span>
      </Link>
      <Link to="/discover" className="flex flex-col items-center">
        <div className="p-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
        </div>
        <span className="text-xs text-primary">Discover</span>
      </Link>
      <Link to="/dashboard" className="flex flex-col items-center">
        <div className="p-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg>
        </div>
        <span className="text-xs text-muted-foreground">My Journey</span>
      </Link>
      <Link to="/community" className="flex flex-col items-center">
        <div className="p-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M14 19a6 6 0 0 0-12 0"></path><circle cx="8" cy="9" r="4"></circle><path d="M22 19a6 6 0 0 0-6-6 4 4 0 1 0 0-8"></path></svg>
        </div>
        <span className="text-xs text-muted-foreground">Community</span>
      </Link>
      <Link to="/profile" className="flex flex-col items-center">
        <div className="p-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><circle cx="12" cy="8" r="5"></circle><path d="M20 21a8 8 0 1 0-16 0"></path></svg>
        </div>
        <span className="text-xs text-muted-foreground">Profile</span>
      </Link>
    </div>
  );
};

export default BottomNavbar;
