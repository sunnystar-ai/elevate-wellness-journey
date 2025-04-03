
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ForumSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ForumSearch = ({ searchQuery, setSearchQuery }: ForumSearchProps) => {
  return (
    <div className="relative mb-4">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search posts..."
        className="pl-10"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default ForumSearch;
