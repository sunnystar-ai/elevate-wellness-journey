
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, User, Compass, HeartHandshake, PenTool } from 'lucide-react';
import { getPersonalityTraits } from '@/features/personality-test/mbti-data';

interface PersonalitySectionProps {
  mbtiType: string | null;
  mbtiDescription: string | null;
}

const PersonalitySection = ({ mbtiType, mbtiDescription }: PersonalitySectionProps) => {
  const navigate = useNavigate();
  
  // Calculate personality trait percentages based on MBTI type
  const getTraitValues = () => {
    if (!mbtiType) {
      return {
        introversion: 65,
        intuition: 78,
        feeling: 82,
        judging: 75
      };
    }
    
    return getPersonalityTraits(mbtiType);
  };

  const traits = getTraitValues();

  const handleTakeTest = () => {
    navigate('/personality-test');
  };

  return (
    <section>
      <h3 className="text-lg font-semibold mb-3">Personality Type</h3>
      {mbtiType ? (
        <>
          <Card className="mb-3">
            <CardContent className="p-4 text-center">
              <div className="flex flex-col items-center mb-3">
                <Brain className="h-12 w-12 text-primary mb-2" />
                <Badge className="mb-1 text-lg px-3 py-1">{mbtiType}</Badge>
                <p className="text-sm text-muted-foreground">{mbtiDescription}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-3">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">Introversion</h4>
                  <p className="text-xs text-muted-foreground">How you interact with others</p>
                </div>
                <Badge variant="outline">{traits.introversion}%</Badge>
              </div>
              <Progress value={traits.introversion} className="h-1.5" />
            </CardContent>
          </Card>
          
          <Card className="mb-3">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">Intuition</h4>
                  <p className="text-xs text-muted-foreground">How you process information</p>
                </div>
                <Badge variant="outline">{traits.intuition}%</Badge>
              </div>
              <Progress value={traits.intuition} className="h-1.5" />
            </CardContent>
          </Card>
          
          <Card className="mb-3">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">Feeling</h4>
                  <p className="text-xs text-muted-foreground">How you make decisions</p>
                </div>
                <Badge variant="outline">{traits.feeling}%</Badge>
              </div>
              <Progress value={traits.feeling} className="h-1.5" />
            </CardContent>
          </Card>

          <Card className="mb-3">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">Judging</h4>
                  <p className="text-xs text-muted-foreground">How you organize your life</p>
                </div>
                <Badge variant="outline">{traits.judging}%</Badge>
              </div>
              <Progress value={traits.judging} className="h-1.5" />
            </CardContent>
          </Card>
          
          <Button className="w-full" onClick={handleTakeTest}>Retake Personality Test</Button>
        </>
      ) : (
        <>
          <Card className="mb-3">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">Introversion</h4>
                  <p className="text-xs text-muted-foreground">How you interact with others</p>
                </div>
                <Badge variant="outline">65%</Badge>
              </div>
              <Progress value={65} className="h-1.5" />
            </CardContent>
          </Card>
          
          <Card className="mb-3">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">Intuition</h4>
                  <p className="text-xs text-muted-foreground">How you process information</p>
                </div>
                <Badge variant="outline">78%</Badge>
              </div>
              <Progress value={78} className="h-1.5" />
            </CardContent>
          </Card>
          
          <Card className="mb-3">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">Feeling</h4>
                  <p className="text-xs text-muted-foreground">How you make decisions</p>
                </div>
                <Badge variant="outline">82%</Badge>
              </div>
              <Progress value={82} className="h-1.5" />
            </CardContent>
          </Card>

          <Card className="mb-3">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">Judging</h4>
                  <p className="text-xs text-muted-foreground">How you organize your life</p>
                </div>
                <Badge variant="outline">75%</Badge>
              </div>
              <Progress value={75} className="h-1.5" />
            </CardContent>
          </Card>
          
          <Button className="w-full" onClick={handleTakeTest}>Take Full Personality Test</Button>
        </>
      )}
    </section>
  );
};

export default PersonalitySection;
