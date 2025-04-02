
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GenerateButtonProps {
  period: 'day' | 'week' | 'month' | 'year';
  generating: boolean;
  onClick: () => void;
}

export const GenerateButton = ({ period, generating, onClick }: GenerateButtonProps) => {
  return (
    <Button 
      className="w-full" 
      variant="outline"
      onClick={onClick}
      disabled={generating}
    >
      {generating ? (
        <>
          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          Generating Advanced Insight...
        </>
      ) : (
        <>
          <RefreshCw className="h-4 w-4 mr-2" />
          Generate New {period === 'day' ? 'Daily' : period === 'week' ? 'Weekly' : period === 'month' ? 'Monthly' : 'Yearly'} Insight
        </>
      )}
    </Button>
  );
};
