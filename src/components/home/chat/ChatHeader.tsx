
import { Bot } from 'lucide-react';

const ChatHeader = () => {
  return (
    <div className="p-3 border-b border-gray-100 bg-primary/5 rounded-t-lg">
      <h3 className="font-medium flex items-center gap-2">
        <Bot className="h-4 w-4 text-primary" />
        Belief System Reframing Assistant
      </h3>
    </div>
  );
};

export default ChatHeader;
