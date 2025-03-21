
import { Progress } from '@/components/ui/progress';

interface ProgressIndicatorProps {
  currentQuestion: number;
  totalQuestions: number;
}

const ProgressIndicator = ({ currentQuestion, totalQuestions }: ProgressIndicatorProps) => {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-muted-foreground">Question {currentQuestion + 1} of {totalQuestions}</span>
        <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default ProgressIndicator;
