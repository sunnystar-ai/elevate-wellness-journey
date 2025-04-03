
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/auth/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface ForumReplyFormProps {
  postId: number;
  onCancel: () => void;
  onSuccess: () => void;
}

const ForumReplyForm = ({ postId, onCancel, onSuccess }: ForumReplyFormProps) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to reply to this post",
        variant: "destructive"
      });
      return;
    }
    
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Reply cannot be empty",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, you would send this to your backend API
    // For now, we'll simulate a successful submission
    setTimeout(() => {
      toast({
        title: "Reply submitted",
        description: "Your reply has been posted successfully",
      });
      setIsSubmitting(false);
      setContent('');
      onSuccess();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <Textarea
        placeholder="Write your reply..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="mb-3 min-h-[100px]"
      />
      <div className="flex justify-end gap-2">
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          size="sm"
          disabled={isSubmitting || !content.trim()}
        >
          {isSubmitting ? 'Submitting...' : 'Post Reply'}
        </Button>
      </div>
    </form>
  );
};

export default ForumReplyForm;
