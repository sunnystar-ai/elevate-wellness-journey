
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain } from 'lucide-react';
import { mbtiDescriptions } from './mbti-data';

interface ResultCardProps {
  mbtiResult: string;
}

const ResultCard = ({ mbtiResult }: ResultCardProps) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Your Result: {mbtiResult}</h2>
        <Badge className="mb-4 text-lg px-3 py-1">{mbtiResult}</Badge>
        <p className="text-muted-foreground mb-4">{mbtiDescriptions[mbtiResult]}</p>
        <Brain className="h-16 w-16 mx-auto text-primary mb-4" />
        <p>Redirecting to your profile...</p>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
