
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const PhotoTimeline = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-md font-semibold">Your Wellness Journey</h2>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Camera className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex space-x-3 p-1">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="relative">
              <div className="h-24 w-24 bg-muted rounded-md"></div>
              <span className="absolute bottom-1 left-1 text-[10px] bg-black/50 text-white px-1 rounded">Mar {10 + item}</span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default PhotoTimeline;
