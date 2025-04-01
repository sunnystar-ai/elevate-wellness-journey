
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@/components/layout/BottomNavigation';

interface ContentNotFoundProps {
  goBack: () => void;
}

const ContentNotFound = ({ goBack }: ContentNotFoundProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6" onClick={goBack}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h2 className="mb-2 text-xl font-semibold">Content Not Found</h2>
        <p className="mb-6 text-muted-foreground">
          The content you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate('/discover')}>
          Discover More Content
        </Button>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default ContentNotFound;
