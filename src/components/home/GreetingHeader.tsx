
import { useAuth } from '@/contexts/AuthContext';

type GreetingHeaderProps = {
  greeting: string;
  formattedDate: string;
  dailyQuote: string;
};

const GreetingHeader = ({ greeting, formattedDate, dailyQuote }: GreetingHeaderProps) => {
  const { user } = useAuth();
  // Get the user's name from user metadata if available
  const firstName = user?.user_metadata?.first_name || user?.user_metadata?.name?.split(' ')[0];
  const lastName = user?.user_metadata?.last_name;
  const displayName = firstName ? (lastName ? `${firstName} ${lastName}` : firstName) : 'Demo User';

  return (
    <>
      <div className="p-1">
        <h1 className="text-2xl font-medium font-display mb-1">
          {greeting}, {displayName}
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
