
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain } from 'lucide-react';
import { mbtiDescriptions, getPersonalityTraits } from './mbti-data';

interface ResultCardProps {
  mbtiResult: string;
}

const ResultCard = ({ mbtiResult }: ResultCardProps) => {
  const traits = getPersonalityTraits(mbtiResult);
  
  return (
    <Card className="mb-6">
      <CardContent className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Your Result: {mbtiResult}</h2>
        <Badge className="mb-4 text-lg px-3 py-1">{mbtiResult}</Badge>
        <p className="text-muted-foreground mb-4">{mbtiDescriptions[mbtiResult]}</p>
        <Brain className="h-16 w-16 mx-auto text-primary mb-4" />
        
        <div className="space-y-4 mb-4 text-left">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Extroversion</span>
              <span className="text-xs">{traits.extroversion}%</span>
            </div>
            <Progress value={traits.extroversion} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Openness</span>
              <span className="text-xs">{traits.openness}%</span>
            </div>
            <Progress value={traits.openness} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Conscientiousness</span>
              <span className="text-xs">{traits.conscientiousness}%</span>
            </div>
            <Progress value={traits.conscientiousness} className="h-2" />
          </div>
        </div>
        
        <p>Redirecting to your profile...</p>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
