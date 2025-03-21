
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Brain, Heart, Users, Sparkle, AlertTriangle } from 'lucide-react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from '@/components/ui/popover';
import EmotionTendenciesTest from './emotion-test/EmotionTendenciesTest';

interface EmotionData {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

const EmotionTendenciesSection = () => {
  const [isTestOpen, setIsTestOpen] = useState(false);
  const [emotionData, setEmotionData] = useState<EmotionData>({
    openness: 70,
    conscientiousness: 75,
    extraversion: 65,
    agreeableness: 80,
    neuroticism: 40
  });

  useEffect(() => {
    // Load saved emotion tendencies data from local storage
    const savedData = localStorage.getItem('emotionTendencies');
    if (savedData) {
      setEmotionData(JSON.parse(savedData));
    }
  }, []);

  const handleTestComplete = (results: Record<string, number>) => {
    // Map the results to our EmotionData type
    const typedResults: EmotionData = {
      openness: results.openness || emotionData.openness,
      conscientiousness: results.conscientiousness || emotionData.conscientiousness,
      extraversion: results.extraversion || emotionData.extraversion,
      agreeableness: results.agreeableness || emotionData.agreeableness,
      neuroticism: results.neuroticism || emotionData.neuroticism
    };
    
    // Save to localStorage
    localStorage.setItem('emotionTendencies', JSON.stringify(typedResults));
    
    // Update state
    setEmotionData(typedResults);
  };

  const traitDescriptions = {
    openness: {
      title: "Openness",
      description: "Curious, imaginative, and appreciative of art/emotion. Creative, adventurous, open to abstract ideas.",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10"
    },
    conscientiousness: {
      title: "Conscientiousness",
      description: "Self-disciplined, goal-oriented behavior, and impulse control. Organized, reliable, deliberate.",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    extraversion: {
      title: "Extraversion",
      description: "Sociable, assertive, and tendency to experience positive emotions. Outgoing, energetic, excitement-seeking.",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    agreeableness: {
      title: "Empathy/Agreeableness",
      description: "Empathetic, compassionate, and trusting of others. Cooperative, kind, conflict-averse.",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    neuroticism: {
      title: "Neuroticism",
      description: "Emotional stability vs. tendency toward negative emotions (anxiety, sadness). Worrying, mood swings, stress sensitivity.",
      color: "text-red-500",
      bgColor: "bg-red-500/10"
    }
  };

  return (
    <section>
      <div className="mb-3">
        <h3 className="text-lg font-semibold">Big Five Personality Traits</h3>
      </div>
      
      <div className="flex justify-center mb-4">
        <h4 className="text-base font-medium">Big Five Personality Traits</h4>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-5">
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex flex-col items-center cursor-pointer">
              <div className={`h-16 w-16 rounded-full ${traitDescriptions.openness.bgColor} flex items-center justify-center mb-1`}>
                <Sparkle className={`h-8 w-8 ${traitDescriptions.openness.color}`} />
              </div>
              <p className="text-xs font-medium">Openness</p>
              <p className="text-sm font-medium">{emotionData.openness}%</p>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <div className="space-y-2">
              <h4 className="font-medium">{traitDescriptions.openness.title}</h4>
              <p className="text-sm text-muted-foreground">{traitDescriptions.openness.description}</p>
            </div>
          </PopoverContent>
        </Popover>
        
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex flex-col items-center cursor-pointer">
              <div className={`h-16 w-16 rounded-full ${traitDescriptions.conscientiousness.bgColor} flex items-center justify-center mb-1`}>
                <Brain className={`h-8 w-8 ${traitDescriptions.conscientiousness.color}`} />
              </div>
              <p className="text-xs font-medium">Conscientiousness</p>
              <p className="text-sm font-medium">{emotionData.conscientiousness}%</p>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <div className="space-y-2">
              <h4 className="font-medium">{traitDescriptions.conscientiousness.title}</h4>
              <p className="text-sm text-muted-foreground">{traitDescriptions.conscientiousness.description}</p>
            </div>
          </PopoverContent>
        </Popover>
        
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex flex-col items-center cursor-pointer">
              <div className={`h-16 w-16 rounded-full ${traitDescriptions.extraversion.bgColor} flex items-center justify-center mb-1`}>
                <Users className={`h-8 w-8 ${traitDescriptions.extraversion.color}`} />
              </div>
              <p className="text-xs font-medium">Extraversion</p>
              <p className="text-sm font-medium">{emotionData.extraversion}%</p>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <div className="space-y-2">
              <h4 className="font-medium">{traitDescriptions.extraversion.title}</h4>
              <p className="text-sm text-muted-foreground">{traitDescriptions.extraversion.description}</p>
            </div>
          </PopoverContent>
        </Popover>
        
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex flex-col items-center cursor-pointer">
              <div className={`h-16 w-16 rounded-full ${traitDescriptions.agreeableness.bgColor} flex items-center justify-center mb-1`}>
                <Heart className={`h-8 w-8 ${traitDescriptions.agreeableness.color}`} />
              </div>
              <p className="text-xs font-medium">Empathy</p>
              <p className="text-sm font-medium">{emotionData.agreeableness}%</p>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <div className="space-y-2">
              <h4 className="font-medium">{traitDescriptions.agreeableness.title}</h4>
              <p className="text-sm text-muted-foreground">{traitDescriptions.agreeableness.description}</p>
            </div>
          </PopoverContent>
        </Popover>
        
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex flex-col items-center cursor-pointer">
              <div className={`h-16 w-16 rounded-full ${traitDescriptions.neuroticism.bgColor} flex items-center justify-center mb-1`}>
                <AlertTriangle className={`h-8 w-8 ${traitDescriptions.neuroticism.color}`} />
              </div>
              <p className="text-xs font-medium">Neuroticism</p>
              <p className="text-sm font-medium">{emotionData.neuroticism}%</p>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <div className="space-y-2">
              <h4 className="font-medium">{traitDescriptions.neuroticism.title}</h4>
              <p className="text-sm text-muted-foreground">{traitDescriptions.neuroticism.description}</p>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Full Width Button similar to the Personality Test */}
      <Button className="w-full" onClick={() => setIsTestOpen(true)}>
        Take Big Five Assessment
      </Button>

      {/* Emotion Tendencies Test Dialog */}
      <EmotionTendenciesTest 
        open={isTestOpen} 
        onOpenChange={setIsTestOpen} 
        onTestComplete={handleTestComplete}
      />
    </section>
  );
};

export default EmotionTendenciesSection;
