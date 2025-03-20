
import { Bot, User } from 'lucide-react';
import { Message } from './types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div 
      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div 
        className={`max-w-[80%] p-3 rounded-lg ${
          message.role === 'user' 
            ? 'bg-primary text-primary-foreground ml-4' 
            : 'bg-muted mr-4'
        }`}
      >
        <div className="flex items-center gap-2 mb-1 text-xs opacity-70">
          {message.role === 'user' ? (
            <>
              <span>You</span>
              <User className="h-3 w-3" />
            </>
          ) : (
            <>
              <Bot className="h-3 w-3" />
              <span>Assistant</span>
            </>
          )}
        </div>
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
