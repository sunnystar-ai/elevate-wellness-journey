
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, User, Compass, PenTool, HeartHandshake } from 'lucide-react';
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
              <div className="flex items-center gap-1">
                <User className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Introversion</span>
              </div>
              <span className="text-xs">{traits.introversion}%</span>
            </div>
            <Progress value={traits.introversion} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-1">
                <Compass className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Intuition</span>
              </div>
              <span className="text-xs">{traits.intuition}%</span>
            </div>
            <Progress value={traits.intuition} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-1">
                <HeartHandshake className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Feeling</span>
              </div>
              <span className="text-xs">{traits.feeling}%</span>
            </div>
            <Progress value={traits.feeling} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-1">
                <PenTool className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Judging</span>
              </div>
              <span className="text-xs">{traits.judging}%</span>
            </div>
            <Progress value={traits.judging} className="h-2" />
          </div>
        </div>
        
        <p>Redirecting to your profile...</p>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
