
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, PenSquare } from 'lucide-react';
import ForumPostCard from './ForumPostCard';
import ForumPostForm from './ForumPostForm';
import { ForumPost } from './types';
import { useToast } from '@/components/ui/use-toast';

// Sample data for forum posts - in a real app, this would come from an API
const allSamplePosts: ForumPost[] = [
  {
    id: 1,
    title: "Has anyone tried guided meditation with binaural beats?",
    content: "I've been struggling with focus during meditation. Has anyone had success using guided meditations with binaural beats? Any recommendations for good apps or YouTube channels?",
    author: "MeditationNewbie",
    timestamp: "2h ago",
    tags: ["meditation", "mentalhealth", "focus"],
    likes: 5,
    liked: false,
    replies: [
      {
        id: 101,
        postId: 1,
        author: "ZenMaster",
        content: "I've had great results with the Insight Timer app. They have many guided meditations with binaural beats for different purposes.",
        timestamp: "1h ago"
      },
      {
        id: 102,
        postId: 1,
        author: "MindfulnessCoach",
        content: "Try starting with a lower frequency and gradually work your way up. 432Hz has been particularly effective for me when I'm having trouble focusing.",
        timestamp: "30m ago"
      }
    ]
  },
  {
    id: 2,
    title: "Quick breakfast ideas for busy mornings?",
    content: "I only have about 15 minutes in the morning to prepare and eat breakfast. Looking for healthy options that are quick to make but still nutritious!",
    author: "BusyParent",
    timestamp: "4h ago",
    tags: ["nutrition", "cooking", "breakfast"],
    likes: 8,
    liked: false,
    replies: [
      {
        id: 201,
        postId: 2,
        author: "NutritionExpert",
        content: "Overnight oats are perfect for this situation! Prepare them the night before with some yogurt, fruit, and nuts.",
        timestamp: "3h ago"
      }
    ]
  },
  {
    id: 3,
    title: "How to stay consistent with daily meditation?",
    content: "I keep starting a meditation practice but can't seem to make it stick. Any advice on building a consistent habit?",
    author: "InconsistentMeditator",
    timestamp: "1d ago",
    tags: ["meditation", "habits", "consistency"],
    likes: 3,
    liked: false,
    replies: []
  },
  {
    id: 4,
    title: "Favorite healthy lunch prep ideas?",
    content: "Looking for some healthy lunch ideas that I can meal prep on Sundays for the week. Any favorites?",
    author: "MealPrepNewbie",
    timestamp: "2d ago",
    tags: ["nutrition", "mealprep", "lunch"],
    likes: 7,
    liked: false,
    replies: []
  },
  {
    id: 5,
    title: "Dealing with anxiety before meditation",
    content: "I often feel anxious before meditating which makes it hard to start. Any tips for overcoming this initial resistance?",
    author: "AnxiousMeditator",
    timestamp: "3d ago",
    tags: ["meditation", "anxiety", "mentalhealth"],
    likes: 12,
    liked: false,
    replies: []
  },
  {
    id: 6,
    title: "Recommendations for sleep meditation practices?",
    content: "I've been having trouble falling asleep. Has anyone had success with sleep meditation? Any specific techniques or resources to recommend?",
    author: "InsomniacMeditator",
    timestamp: "4d ago",
    tags: ["meditation", "sleep", "wellness"],
    likes: 9,
    liked: false,
    replies: []
  },
  {
    id: 7,
    title: "Plant-based protein sources",
    content: "I'm trying to reduce my meat consumption and looking for good plant-based protein sources. What are your favorites?",
    author: "PlantBasedBeginnerNZ",
    timestamp: "5d ago",
    tags: ["nutrition", "plantbased", "protein"],
    likes: 15,
    liked: false,
    replies: []
  }
];

interface ForumPostsListProps {
  page?: number;
  postsPerPage?: number;
}

const ForumPostsList = ({ page = 1, postsPerPage = 5 }: ForumPostsListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showPostForm, setShowPostForm] = useState(false);
  const [posts, setPosts] = useState<ForumPost[]>(allSamplePosts);
  const { toast } = useToast();
  
  // Filter posts based on search query
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Calculate pagination
  const startIndex = (page - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const handleNewPostSuccess = () => {
    setShowPostForm(false);
    // In a real app, you would fetch the updated posts
    // For now, we'll just simulate adding a new post
    const newPost: ForumPost = {
      id: posts.length + 1,
      title: "New Question",
      content: "This is a placeholder for your new question that would normally come from the server.",
      author: "You",
      timestamp: "Just now",
      tags: ["general"],
      likes: 0,
      liked: false,
      replies: []
    };
    setPosts([newPost, ...posts]);
    
    toast({
      title: "Post created!",
      description: "Your post has been successfully published.",
    });
  };

  const handleLike = (postId: number, liked: boolean) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, liked: liked, likes: liked ? (post.likes || 0) + 1 : (post.likes || 0) - 1 }
          : post
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Community Forum</h2>
        <Button 
          size="sm" 
          onClick={() => setShowPostForm(!showPostForm)}
        >
          <PenSquare className="mr-2 h-4 w-4" />
          {showPostForm ? 'Cancel' : 'Create Post'}
        </Button>
      </div>
      
      {showPostForm && (
        <ForumPostForm 
          forumId={0}
          forumTitle="Community Forum"
          onCancel={() => setShowPostForm(false)}
          onSuccess={handleNewPostSuccess}
        />
      )}
      
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search posts..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {paginatedPosts.length > 0 ? (
        paginatedPosts.map(post => (
          <ForumPostCard 
            key={post.id} 
            post={post} 
            onLike={handleLike}
          />
        ))
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          <p>No posts found matching your search criteria.</p>
          <Button 
            variant="link" 
            onClick={() => setSearchQuery('')}
            className="mt-2"
          >
            Clear search
          </Button>
        </div>
      )}
    </div>
  );
};

export default ForumPostsList;
