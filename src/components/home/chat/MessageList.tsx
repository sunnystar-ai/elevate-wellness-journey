import { RefObject, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Message } from './types';
import ChatMessage from './ChatMessage';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: RefObject<HTMLDivElement>;
  scrollAreaRef: RefObject<HTMLDivElement>;
}

const MessageList = ({ messages, isLoading, messagesEndRef, scrollAreaRef }: MessageListProps) => {
  useEffect(() => {
    const handleScroll = () => {
      if (scrollAreaRef.current) {
        scrollAreaRef.current.dataset.userScrolled = 'true';
      }
    };

    const scrollElement = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    scrollElement?.addEventListener('scroll', handleScroll);
    
    return () => {
      scrollElement?.removeEventListener('scroll', handleScroll);
    };
  }, [scrollAreaRef]);

  return (
    <ScrollArea className="h-full p-3 flex-1 relative" ref={scrollAreaRef}>
      <div className="space-y-3 pb-2">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-lg bg-muted mr-4">
              <div className="flex items-center gap-2 mb-1 text-xs opacity-70">
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>Assistant</span>
              </div>
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default MessageList;
