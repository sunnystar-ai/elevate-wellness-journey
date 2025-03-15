
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface CommunitySearchProps {
  value: string;
  onChange: (value: string) => void;
}

const CommunitySearch = ({ value, onChange }: CommunitySearchProps) => {
  return (
    <div className="relative max-w-[200px]">
      <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input 
        type="text"
        placeholder="Search communities..."
        className="pl-8 h-8 pr-3 rounded-full text-xs"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default CommunitySearch;
