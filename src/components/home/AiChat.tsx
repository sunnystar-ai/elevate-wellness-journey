
import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Message } from './chat/types';
import ChatHeader from './chat/ChatHeader';
import MessageList from './chat/MessageList';
import ChatInput from './chat/ChatInput';
import { sendChatMessage } from './chat/ChatService';

const AiChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi there! I can help you reframe your beliefs and thought patterns. What would you like to discuss today?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Only scroll to bottom when new messages are added or when loading state changes
  useEffect(() => {
    if (messages.length > 0 || isLoading === false) {
      scrollToBottom();
    }
  }, [messages.length, isLoading]);

  const handleSendMessage = async (input: string) => {
    // Get API key from localStorage or environment variable
    const apiKey = localStorage.getItem('openai_api_key') || import.meta.env.VITE_OPENAI_API_KEY;
    
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please add your OpenAI API key in the dashboard settings.",
        variant: "destructive"
      });
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Make API request to OpenAI
      const assistantResponse = await sendChatMessage(messages, input, apiKey);
      
      // Add assistant response
      setMessages(prev => [
        ...prev, 
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: assistantResponse
        }
      ]);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please check your API key or try again later.",
        variant: "destructive"
      });
      
      // Add error message
      setMessages(prev => [
        ...prev, 
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: "I'm sorry, I encountered an error. Please check your API key or try again later."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-lg bg-white shadow-md h-[400px] flex flex-col overflow-hidden">
      <ChatHeader />
      <div className="flex-1 overflow-hidden relative flex flex-col">
        <MessageList 
          messages={messages}
          isLoading={isLoading}
          messagesEndRef={messagesEndRef}
          scrollAreaRef={scrollAreaRef}
        />
      </div>
      <ChatInput 
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AiChat;
