
import { ArrowRight, Users, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const forums = [
  {
    id: 1,
    title: 'Meditation Beginners',
    members: 2843,
    posts: 124,
    latestPost: 'Has anyone tried guided meditation with...',
    timestamp: '2h ago',
    tags: ['meditation', 'mentalhealth'],
    joined: true
  },
  {
    id: 2,
    title: 'Healthy Recipes',
    members: 4521,
    posts: 287,
    latestPost: 'Quick breakfast ideas for busy mornings?',
    timestamp: '4h ago',
    tags: ['nutrition', 'cooking'],
    joined: false
  }
];

const ForumsSection = () => {
  return (
    <div className="px-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-md font-semibold">Popular Forums</h2>
        <Button variant="ghost" className="h-8 px-2 text-xs text-primary flex items-center">
          Browse All <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </div>

      <div className="space-y-3">
        {forums.map((forum) => (
          <Card key={forum.id} className="p-3">
            <div className="flex justify-between mb-2">
              <h3 className="text-sm font-medium">{forum.title}</h3>
              <Button 
                variant={forum.joined ? "outline" : "default"} 
                size="sm" 
                className="h-6 text-xs px-2"
              >
                {forum.joined ? "Joined" : "Join"}
              </Button>
            </div>
            
            <div className="flex items-center text-xs text-muted-foreground mb-2">
              <Users className="h-3 w-3 mr-1" />
              <span className="mr-3">{forum.members} members</span>
              <MessageSquare className="h-3 w-3 mr-1" />
              <span>{forum.posts} posts</span>
            </div>
            
            <Separator className="my-2" />
            
            <div className="text-xs mb-2">
              <div className="mb-1 line-clamp-1">{forum.latestPost}</div>
              <span className="text-muted-foreground">{forum.timestamp}</span>
            </div>
            
            <div className="flex gap-1">
              {forum.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                  #{tag}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ForumsSection;
