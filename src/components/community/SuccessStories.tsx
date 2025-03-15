
import { Lightbulb, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const stories = [
  {
    id: 1,
    user: {
      name: 'Robert Chen',
      avatar: '/placeholder.svg',
      fallback: 'RC'
    },
    achievement: 'Lost 20lbs',
    quote: '"The community challenges kept me accountable and motivated to reach my fitness goals."',
  },
  {
    id: 2,
    user: {
      name: 'Amara Wilson',
      avatar: '/placeholder.svg',
      fallback: 'AW'
    },
    achievement: 'Reduced Stress',
    quote: '"Daily meditation practice has completely transformed how I handle work pressure."',
  },
  {
    id: 3,
    user: {
      name: 'Thomas Reed',
      avatar: '/placeholder.svg',
      fallback: 'TR'
    },
    achievement: 'Better Sleep',
    quote: '"Following the sleep hygiene tips from this community has given me back my nights."',
  }
];

const SuccessStories = () => {
  return (
    <div className="px-4">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-1">
          <h2 className="text-md font-semibold">Success Stories</h2>
          <Lightbulb className="h-4 w-4 text-yellow-500" />
        </div>
        <Button variant="ghost" className="h-8 px-2 text-xs text-primary flex items-center">
          More Stories <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </div>

      <ScrollArea className="w-full">
        <div className="flex gap-3 pb-4">
          {stories.map((story) => (
            <Card key={story.id} className="min-w-[240px] p-3">
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={story.user.avatar} alt={story.user.name} />
                  <AvatarFallback>{story.user.fallback}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium">{story.user.name}</div>
                  <Badge variant="secondary" className="text-xs px-1.5 py-0">
                    {story.achievement}
                  </Badge>
                </div>
              </div>
              
              <p className="text-sm italic mb-2">{story.quote}</p>
              
              <Button 
                variant="ghost" 
                className="text-xs text-primary px-0 h-auto"
              >
                Read Full Story
              </Button>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default SuccessStories;
