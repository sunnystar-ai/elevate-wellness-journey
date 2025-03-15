
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CommunityHeader = () => {
  return (
    <div className="flex justify-between items-center pt-4 px-4 pb-2">
      <h1 className="text-xl font-semibold">Community</h1>
      <Button variant="ghost" size="icon" className="relative h-8 w-8">
        <Bell className="h-5 w-5" />
        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
      </Button>
    </div>
  );
};

export default CommunityHeader;
