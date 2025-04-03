
import { useState } from 'react';
import { MessageSquare, User, Clock, ThumbsUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ForumPost } from './types';
import ForumReplyForm from './ForumReplyForm';
import ForumReplyList from './ForumReplyList';
import { useToast } from '@/components/ui/use-toast';

interface ForumPostCardProps {
  post: ForumPost;
  onLike?: (postId: number, liked: boolean) => void;
}

const ForumPostCard = ({ post, onLike }: ForumPostCardProps) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [liked, setLiked] = useState(post.liked || false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const { toast } = useToast();
  
  const replyCount = post.replies?.length || 0;

  const handleLike = () => {
    const newLikedState = !liked;
    setLiked(newLikedState);
    setLikeCount(prevCount => newLikedState ? prevCount + 1 : prevCount - 1);
    
    if (onLike) {
      onLike(post.id, newLikedState);
    }
    
    toast({
      description: newLikedState ? "Post liked!" : "Post unliked",
      duration: 1500,
    });
  };

  return (
    <Card className="p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center mr-2">
            <User className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <h4 className="text-sm font-medium">{post.author}</h4>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              <span>{post.timestamp}</span>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-base font-semibold mb-2">{post.title}</h3>
      <p className="text-sm mb-3">{post.content}</p>

      <div className="flex flex-wrap gap-1 mb-3">
        {post.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
            #{tag}
          </Badge>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-2 text-muted-foreground"
            onClick={handleLike}
          >
            <ThumbsUp className={`h-4 w-4 mr-1 ${liked ? 'fill-primary text-primary' : ''}`} />
            <span>{likeCount > 0 ? `${likeCount} Like${likeCount !== 1 ? 's' : ''}` : 'Like'}</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-2 text-muted-foreground"
            onClick={() => {
              setShowReplyForm(!showReplyForm);
              if (!showReplies && replyCount > 0) {
                setShowReplies(true);
              }
            }}
          >
            <MessageSquare className="h-4 w-4 mr-1" /> Reply
          </Button>
        </div>

        {replyCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-2 text-xs text-muted-foreground"
            onClick={() => setShowReplies(!showReplies)}
          >
            <MessageSquare className="h-3 w-3 mr-1" />
            {showReplies ? 'Hide replies' : `View ${replyCount} ${replyCount === 1 ? 'reply' : 'replies'}`}
          </Button>
        )}
      </div>

      {(showReplyForm || showReplies) && <Separator className="my-3" />}

      {showReplyForm && (
        <ForumReplyForm 
          postId={post.id}
          onCancel={() => setShowReplyForm(false)}
          onSuccess={() => {
            setShowReplyForm(false);
            setShowReplies(true);
          }}
        />
      )}

      {showReplies && post.replies && post.replies.length > 0 && (
        <ForumReplyList replies={post.replies} />
      )}
    </Card>
  );
};

export default ForumPostCard;
