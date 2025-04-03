
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ForumPostsList from './forums/ForumPostsList';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const ForumsSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; // Number of posts to display per page
  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    // In a real app, you would check if there are more posts
    // For now, we'll limit to 3 pages as an example
    if (currentPage < 3) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="px-4">
      <ForumPostsList page={currentPage} postsPerPage={postsPerPage} />
      
      <div className="flex justify-between mt-6">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Previous
        </Button>
        <span className="text-sm text-muted-foreground self-center">
          Page {currentPage}
        </span>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleNextPage}
          disabled={currentPage === 3} // In a real app, check if there are more posts
          className="flex items-center"
        >
          Next <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default ForumsSection;
