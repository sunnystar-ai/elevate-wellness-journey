
import { useAuth } from '@/contexts/AuthContext';

type GreetingHeaderProps = {
  greeting: string;
  formattedDate: string;
  dailyQuote: string;
};

const GreetingHeader = ({ greeting, formattedDate, dailyQuote }: GreetingHeaderProps) => {
  const { user } = useAuth();
  const userName = user ? user.name : 'Guest';

  return (
    <>
      <div className="harmony-card p-5">
        <h1 className="text-2xl font-medium font-display mb-1">
          {greeting}, {userName}
        </h1>
        <p className="text-muted-foreground">{formattedDate}</p>
      </div>

      <div className="glass-panel p-4 mt-6">
        <p className="text-sm italic">"{dailyQuote}"</p>
      </div>
    </>
  );
};

export default GreetingHeader;
