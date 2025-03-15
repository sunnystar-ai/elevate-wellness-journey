
import { useState } from 'react';
import { Heart, MessageSquare, Share2, MoreHorizontal } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const posts = [
  {
    id: 1,
    user: {
      name: 'Emily Chen',
      avatar: '/placeholder.svg',
      fallback: 'EC'
    },
    time: '35 minutes ago',
    visibility: 'Public',
    content: 'Just completed my first 10-day meditation challenge! It was surprisingly difficult to sit still for 20 minutes, but I'm already feeling more centered and focused.',
    image: '/placeholder.svg',
    likes: 24,
    comments: 8,
    liked: false
  },
  {
    id: 2,
    user: {
      name: 'Marcus Johnson',
      avatar: '/placeholder.svg',
      fallback: 'MJ'
    },
    time: '2 hours ago',
    visibility: 'Runner\'s Group',
    content: 'Hit a new personal record today! 5K in 22 minutes. Thanks to everyone in this community for the motivation and support.',
    image: null,
    likes: 42,
    comments: 15,
    liked: true
  }
];

const CommunityFeed = () => {
  const [feedPosts, setFeedPosts] = useState(posts);
  const [activeFilter, setActiveFilter] = useState('Latest');

  const toggleLike = (postId: number) => {
    setFeedPosts(feedPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  return (
    <div className="px-4">
      <div className="mb-3">
        <h2 className="text-md font-semibold mb-2">Community Feed</h2>
        <div className="flex gap-2">
          {['Latest', 'Trending', 'Following'].map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              size="sm"
              className="text-xs h-7"
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {feedPosts.map((post) => (
          <Card key={post.id} className="p-4">
            <div className="flex justify-between mb-3">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={post.user.avatar} alt={post.user.name} />
                  <AvatarFallback>{post.user.fallback}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-sm font-medium">{post.user.name}</h3>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>{post.time}</span>
                    <span className="mx-1">•</span>
                    <span>{post.visibility}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="mb-3 text-sm">{post.content}</div>
            
            {post.image && (
              <div className="mb-3 rounded-md overflow-hidden">
                <img src={post.image} alt="Post content" className="w-full h-44 object-cover" />
              </div>
            )}
            
            <div className="flex justify-between items-center text-xs text-muted-foreground mb-3">
              <span>{post.likes} likes</span>
              <span>{post.comments} comments</span>
            </div>
            
            <Separator className="mb-3" />
            
            <div className="flex justify-around">
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => toggleLike(post.id)}
              >
                <Heart className={`h-4 w-4 ${post.liked ? 'fill-red-500 text-red-500' : ''}`} />
                <span>Like</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>Comment</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommunityFeed;
