
import { Button } from '@/components/ui/button';
import { PenSquare } from 'lucide-react';

interface ForumHeaderProps {
  showPostForm: boolean;
  togglePostForm: () => void;
}

const ForumHeader = ({ showPostForm, togglePostForm }: ForumHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-semibold">Community Forum</h2>
      <Button 
        size="sm" 
        onClick={togglePostForm}
      >
        <PenSquare className="mr-2 h-4 w-4" />
        {showPostForm ? 'Cancel' : 'Create Post'}
      </Button>
    </div>
  );
};

export default ForumHeader;
