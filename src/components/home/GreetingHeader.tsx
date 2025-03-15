
import { useAuth } from '@/contexts/AuthContext';

type GreetingHeaderProps = {
  greeting: string;
  formattedDate: string;
  dailyQuote: string;
};

const GreetingHeader = ({ greeting, formattedDate, dailyQuote }: GreetingHeaderProps) => {
  const { user } = useAuth();
  const userName = user ? user.name : 'Demo User';

  return (
    <>
      <div className="p-1">
        <h1 className="text-2xl font-medium font-display mb-1">
          {greeting}, {userName}
        </h1>
        <p className="text-muted-foreground">{formattedDate}</p>
      </div>

      <div className="glass-panel p-4 mt-4 rounded-lg bg-background/80 border border-border">
        <p className="text-sm italic">"{dailyQuote}"</p>
      </div>
    </>
  );
};

export default GreetingHeader;
