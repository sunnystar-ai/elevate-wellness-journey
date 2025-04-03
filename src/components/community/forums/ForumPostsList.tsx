
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import ForumPostCard from './ForumPostCard';
import { ForumPost } from './types';

// Sample data for forum posts
const samplePosts: ForumPost[] = [
  {
    id: 1,
    title: "Has anyone tried guided meditation with binaural beats?",
    content: "I've been struggling with focus during meditation. Has anyone had success using guided meditations with binaural beats? Any recommendations for good apps or YouTube channels?",
    author: "MeditationNewbie",
    timestamp: "2h ago",
    tags: ["meditation", "mentalhealth", "focus"],
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
    replies: []
  }
];

interface ForumPostsListProps {
  forumId?: number;
  forumTitle?: string;
}

const ForumPostsList = ({ forumId, forumTitle }: ForumPostsListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter posts based on search query
  const filteredPosts = samplePosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{forumTitle || "Forum Posts"}</h2>
        <Button size="sm">New Post</Button>
      </div>
      
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search posts..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {filteredPosts.length > 0 ? (
        filteredPosts.map(post => (
          <ForumPostCard key={post.id} post={post} />
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
