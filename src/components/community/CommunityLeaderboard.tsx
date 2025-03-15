
import { ArrowRight, Trophy, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const leaders = [
  {
    id: 1,
    name: 'Jessica Wong',
    avatar: '/placeholder.svg',
    fallback: 'JW',
    score: 1245,
    trend: 'up'
  },
  {
    id: 2,
    name: 'Michael Stevens',
    avatar: '/placeholder.svg',
    fallback: 'MS',
    score: 1186,
    trend: 'up'
  },
  {
    id: 3,
    name: 'Alex Turner',
    avatar: '/placeholder.svg',
    fallback: 'AT',
    score: 1054,
    trend: 'down'
  },
  {
    id: 4,
    name: 'Sophia Garcia',
    avatar: '/placeholder.svg',
    fallback: 'SG',
    score: 987,
    trend: 'up'
  },
  {
    id: 5,
    name: 'David Kim',
    avatar: '/placeholder.svg',
    fallback: 'DK',
    score: 924,
    trend: 'down'
  }
];

const CommunityLeaderboard = () => {
  return (
    <div className="px-4">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-1">
          <h2 className="text-md font-semibold">This Week's Leaders</h2>
          <Trophy className="h-4 w-4 text-yellow-500" />
        </div>
        <Button variant="ghost" className="h-8 px-2 text-xs text-primary flex items-center">
          View Full <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </div>

      <Card className="overflow-hidden">
        {leaders.map((leader, index) => (
          <div 
            key={leader.id} 
            className={`flex items-center justify-between p-3 ${
              index < leaders.length - 1 ? 'border-b border-border' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="font-medium text-sm w-5">{index + 1}</span>
              <Avatar className="h-8 w-8">
                <AvatarImage src={leader.avatar} alt={leader.name} />
                <AvatarFallback>{leader.fallback}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{leader.name}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="font-medium">{leader.score}</span>
              {leader.trend === 'up' ? (
                <ArrowUp className="h-3 w-3 text-green-500" />
              ) : (
                <ArrowDown className="h-3 w-3 text-red-500" />
              )}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default CommunityLeaderboard;
