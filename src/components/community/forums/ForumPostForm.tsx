
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/auth/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { NewForumPost } from './types';
import { X } from 'lucide-react';

interface ForumPostFormProps {
  forumId: number;
  forumTitle: string;
  onCancel: () => void;
  onSuccess: () => void;
}

const ForumPostForm = ({ forumId, forumTitle, onCancel, onSuccess }: ForumPostFormProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to post a question",
        variant: "destructive"
      });
      return;
    }
    
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Error",
        description: "Title and content are required",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    const newPost: NewForumPost = {
      title: title.trim(),
      content: content.trim(),
      tags: tags.length > 0 ? tags : ['general']
    };
    
    // In a real app, you would send this to your backend API
    // For now, we'll simulate a successful submission
    setTimeout(() => {
      toast({
        title: "Question posted",
        description: "Your question has been posted successfully",
      });
      setIsSubmitting(false);
      setTitle('');
      setContent('');
      setTags([]);
      onSuccess();
    }, 1000);
  };

  return (
    <div className="bg-card rounded-lg border p-4 mb-4">
      <h3 className="text-lg font-semibold mb-3">Post a Question to {forumTitle}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="post-title" className="block text-sm font-medium mb-1">Title</label>
          <Input
            id="post-title"
            placeholder="What's your question?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="post-content" className="block text-sm font-medium mb-1">Details</label>
          <Textarea
            id="post-content"
            placeholder="Provide details about your question..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[150px]"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="post-tags" className="block text-sm font-medium mb-1">Tags</label>
          <div className="flex mb-2">
            <Input
              id="post-tags"
              placeholder="Add tags (press Enter)"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 mr-2"
            />
            <Button 
              type="button" 
              onClick={handleAddTag}
              variant="outline"
              size="sm"
            >
              Add
            </Button>
          </div>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {tags.map(tag => (
                <div key={tag} className="bg-secondary text-secondary-foreground text-xs rounded-full px-2 py-1 flex items-center">
                  #{tag}
                  <button 
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-secondary-foreground/70 hover:text-secondary-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting || !title.trim() || !content.trim()}
          >
            {isSubmitting ? 'Posting...' : 'Post Question'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForumPostForm;
