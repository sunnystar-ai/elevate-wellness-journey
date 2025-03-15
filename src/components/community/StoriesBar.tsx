
import { Plus } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const stories = [
  { id: 1, username: 'Featured', image: '/placeholder.svg', isFeatured: true },
  { id: 2, username: 'Emma', image: '/placeholder.svg', isActive: true },
  { id: 3, username: 'James', image: '/placeholder.svg', isActive: true },
  { id: 4, username: 'Sofia', image: '/placeholder.svg', isActive: true },
  { id: 5, username: 'Marcus', image: '/placeholder.svg', isActive: false },
  { id: 6, username: 'Lisa', image: '/placeholder.svg', isActive: true },
  { id: 7, username: 'Alex', image: '/placeholder.svg', isActive: false },
];

const StoriesBar = () => {
  return (
    <div className="pb-2 pt-1">
      <ScrollArea className="w-full pb-4">
        <div className="flex gap-4 pl-4">
          <div className="flex flex-col items-center">
            <div className="relative mb-1">
              <Avatar className="h-16 w-16 border-2 border-dashed border-primary flex items-center justify-center">
                <Plus className="h-6 w-6 text-primary" />
              </Avatar>
            </div>
            <span className="text-xs">Add</span>
          </div>
          
          {stories.map((story) => (
            <div key={story.id} className="flex flex-col items-center">
              <div className="relative mb-1">
                <div className={`rounded-full p-[2px] ${
                  story.isFeatured ? 'bg-gradient-to-tr from-primary to-accent' : 
                  story.isActive ? 'bg-gradient-to-tr from-green-400 to-blue-500' : 'bg-transparent'
                }`}>
                  <Avatar className="h-16 w-16 border-2 border-background">
                    <AvatarImage src={story.image} alt={story.username} />
                    <AvatarFallback>{story.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <span className="text-xs">{story.username}</span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default StoriesBar;
