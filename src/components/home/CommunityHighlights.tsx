
import { useNavigate } from 'react-router-dom';
import { Users } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const CommunityHighlights = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="harmony-card p-4 mb-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">30-Day Meditation Challenge</h3>
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-1" />
            <span>245 participants</span>
          </div>
        </div>
        <div className="mb-2">
          <Progress value={40} className="h-2" />
        </div>
        <p className="text-sm text-muted-foreground">12 days remaining</p>
      </div>
      
      <div className="flex items-center">
        <div className="flex -space-x-3 mr-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Avatar key={i} className="h-8 w-8 border-2 border-background">
              <AvatarImage src={`https://randomuser.me/api/portraits/men/${i + 10}.jpg`} />
              <AvatarFallback>U{i}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          Recently active in your network
        </span>
      </div>
    </>
  );
};

export default CommunityHighlights;
