
import { useState } from 'react';
import { User, Clock, ThumbsUp } from 'lucide-react';
import { ForumReply } from './types';

interface ForumReplyListProps {
  replies: ForumReply[];
}

const ForumReplyList = ({ replies }: ForumReplyListProps) => {
  const [likedReplies, setLikedReplies] = useState<Record<number, boolean>>({});

  const handleLikeReply = (replyId: number) => {
    setLikedReplies(prev => ({
      ...prev,
      [replyId]: !prev[replyId]
    }));
  };

  return (
    <div className="space-y-3 mt-2">
      {replies.map((reply) => (
        <div key={reply.id} className="pl-4 border-l-2 border-muted">
          <div className="flex items-center mb-2">
            <div className="h-6 w-6 bg-muted rounded-full flex items-center justify-center mr-2">
              <User className="h-3 w-3 text-muted-foreground" />
            </div>
            <span className="text-xs font-medium mr-2">{reply.author}</span>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-2 w-2 mr-1" />
              <span>{reply.timestamp}</span>
            </div>
          </div>
          <p className="text-sm ml-8 mb-2">{reply.content}</p>
          <div className="flex items-center ml-8">
            <button 
              className={`text-xs ${likedReplies[reply.id] ? 'text-primary' : 'text-muted-foreground'} flex items-center hover:text-foreground`}
              onClick={() => handleLikeReply(reply.id)}
            >
              <ThumbsUp className={`h-3 w-3 mr-1 ${likedReplies[reply.id] ? 'fill-primary' : ''}`} /> 
              Like
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForumReplyList;
