
import { Button } from '@/components/ui/button';

interface EmptyPostsStateProps {
  clearSearch: () => void;
}

const EmptyPostsState = ({ clearSearch }: EmptyPostsStateProps) => {
  return (
    <div className="text-center py-10 text-muted-foreground">
      <p>No posts found matching your search criteria.</p>
      <Button 
        variant="link" 
        onClick={clearSearch}
        className="mt-2"
      >
        Clear search
      </Button>
    </div>
  );
};

export default EmptyPostsState;
