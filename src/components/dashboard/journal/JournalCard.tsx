
import { CheckCircle2 } from 'lucide-react';

interface JournalCardProps {
  children: React.ReactNode;
}

const JournalCard = ({ children }: JournalCardProps) => {
  return (
    <div 
      className="rounded-lg bg-white shadow-sm transition-all duration-300"
      style={{ 
        animation: 'fade-in 0.5s ease-out backwards' 
      }}
    >
      <div className="p-3">
        <div className="flex items-center">
          <div className="mr-3 p-2 rounded-full bg-harmony-light-lavender">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div className="flex-grow mr-2">
            <div className="font-medium">Complete Today's Journal Prompt</div>
          </div>
        </div>
      </div>
      
      {children}
    </div>
  );
};

export default JournalCard;
