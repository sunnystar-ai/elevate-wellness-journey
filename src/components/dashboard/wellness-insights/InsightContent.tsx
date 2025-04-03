
import { Smile, RefreshCw, Edit3, Loader2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface InsightContentProps {
  loading: boolean;
  error: string | null;
  insight: string | null;
  navigateToJournalPrompt: () => void;
  currentDate?: string;
}

export const InsightContent = ({ 
  loading, 
  error, 
  insight, 
  navigateToJournalPrompt,
  currentDate
}: InsightContentProps) => {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  if (loading) {
    return (
      <div className="h-44 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-harmony-lavender animate-spin" />
        <span className="ml-2 text-muted-foreground">Analyzing your wellness data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  // Check if we're displaying for today (current date)
  const isToday = currentDate === new Date().toISOString().split('T')[0];

  if (!insight) {
    return (
      <div className="h-44 flex flex-col items-center justify-center text-center px-4 py-8">
        <Smile className="h-10 w-10 text-muted-foreground mb-2" />
        <h3 className="font-medium text-lg mb-2">
          {isToday ? "No insights available for today" : "No insights available for this period"}
        </h3>
        <p className="text-muted-foreground mb-4">
          {isToday 
            ? "Complete your daily activities and journal entry to generate personalized insights."
            : "Ensure you have wellness data recorded for this period to generate insights."
          }
        </p>
        {isToday && (
          <Button 
            variant="outline" 
            className="flex items-center" 
            onClick={navigateToJournalPrompt}
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Add Journal Entry
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="py-4">
      <p className="whitespace-pre-line text-sm mb-4">{insight}</p>
      <div className="text-xs text-muted-foreground flex items-center">
        <RefreshCw className="h-3 w-3 mr-1" />
        <span>Last updated: {today}</span>
      </div>
    </div>
  );
};
