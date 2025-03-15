
import { Users, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const groups = [
  { id: 1, name: 'Yoga', icon: '/placeholder.svg', hasNewPosts: true },
  { id: 2, name: 'Runners', icon: '/placeholder.svg', hasNewPosts: false },
  { id: 3, name: 'Mindfulness', icon: '/placeholder.svg', hasNewPosts: true },
  { id: 4, name: 'Nutrition', icon: '/placeholder.svg', hasNewPosts: false },
  { id: 5, name: 'Sleep', icon: '/placeholder.svg', hasNewPosts: false },
];

const InterestGroups = () => {
  return (
    <div className="px-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-md font-semibold">Your Groups</h2>
        <Button variant="ghost" size="sm" className="h-8 text-xs text-primary">
          Find Groups
        </Button>
      </div>

      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-4">
          {groups.map((group) => (
            <div key={group.id} className="flex flex-col items-center">
              <div className="relative mb-1">
                <Avatar className="h-14 w-14 bg-muted">
                  <AvatarImage src={group.icon} alt={group.name} />
                  <AvatarFallback>
                    {group.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                {group.hasNewPosts && (
                  <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-red-500"></span>
                )}
              </div>
              <span className="text-xs">{group.name}</span>
            </div>
          ))}
          
          <div className="flex flex-col items-center">
            <div className="relative mb-1">
              <Avatar className="h-14 w-14 border-2 border-dashed border-border flex items-center justify-center bg-background">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </Avatar>
            </div>
            <span className="text-xs">Create</span>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default InterestGroups;
