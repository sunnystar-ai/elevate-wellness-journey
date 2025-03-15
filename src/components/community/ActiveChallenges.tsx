
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';

const challenges = [
  {
    id: 1,
    title: '7-Day Meditation',
    participants: 843,
    timeRemaining: '3 days',
    progress: 57,
    image: '/placeholder.svg',
    joined: true
  },
  {
    id: 2,
    title: '10K Steps Challenge',
    participants: 1254,
    timeRemaining: '5 days',
    progress: 30,
    image: '/placeholder.svg',
    joined: false
  },
  {
    id: 3,
    title: 'Water Tracking',
    participants: 652,
    timeRemaining: '2 days',
    progress: 80,
    image: '/placeholder.svg',
    joined: true
  }
];

const ActiveChallenges = () => {
  return (
    <div className="px-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-md font-semibold">Active Challenges</h2>
        <Button variant="ghost" className="h-8 px-2 text-xs text-primary flex items-center">
          See All <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </div>

      <ScrollArea className="w-full">
        <div className="flex gap-3 pb-4">
          {challenges.map((challenge) => (
            <Card key={challenge.id} className="min-w-[250px] max-w-[250px] overflow-hidden">
              <div className="h-24 bg-muted">
                <img 
                  src={challenge.image} 
                  alt={challenge.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 space-y-2">
                <h3 className="text-sm font-medium">{challenge.title}</h3>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{challenge.participants} participants</span>
                  <span>{challenge.timeRemaining} left</span>
                </div>
                
                <div className="space-y-1">
                  <Progress value={challenge.progress} className="h-1.5" />
                  <div className="text-[10px] text-right text-muted-foreground">
                    {challenge.progress}% complete
                  </div>
                </div>
                
                <Button 
                  size="sm" 
                  className="w-full text-xs"
                  variant={challenge.joined ? "outline" : "default"}
                >
                  {challenge.joined ? "Continue" : "Join"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ActiveChallenges;
