
import { AlertTriangle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

interface InsightContentProps {
  loading: boolean;
  error: string | null;
  insight: string | null;
  navigateToJournalPrompt: () => void;
}

export const InsightContent = ({ loading, error, insight, navigateToJournalPrompt }: InsightContentProps) => {
  if (loading) {
    return (
      <div className="py-6 flex justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-harmony-lavender"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <Alert variant="destructive" className="bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-900">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }
  
  if (insight) {
    return (
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground whitespace-pre-line">{insight}</p>
        <div className="text-xs text-muted-foreground italic mt-2">
          Analyzed using AI advanced pattern recognition
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground italic py-2">
        No insights available for this period and framework. Generate an insight based on your data or log more activities.
      </p>
      <div className="flex flex-col space-y-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={navigateToJournalPrompt}
          className="flex items-center justify-center"
        >
          <Calendar className="h-4 w-4 mr-2" />
          Complete Today's Journal Entry
        </Button>
      </div>
    </div>
  );
};
