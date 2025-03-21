
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Smile, Brain, TrendingUp, TrendingDown } from 'lucide-react';
import EmotionTendenciesTest from './emotion-test/EmotionTendenciesTest';

interface EmotionData {
  happiness: number;
  empathy: number;
  optimism: number;
  calmness: number;
  stress: number;
  resilience: number;
}

const EmotionTendenciesSection = () => {
  const [isTestOpen, setIsTestOpen] = useState(false);
  const [emotionData, setEmotionData] = useState<EmotionData>({
    happiness: 75,
    empathy: 82,
    optimism: 68,
    calmness: 61,
    stress: 42,
    resilience: 79
  });

  useEffect(() => {
    // Load saved emotion tendencies data from local storage
    const savedData = localStorage.getItem('emotionTendencies');
    if (savedData) {
      setEmotionData(JSON.parse(savedData));
    }
  }, []);

  const handleTestComplete = (results: Record<string, number>) => {
    // Make sure we're setting a value that matches our EmotionData type
    const typedResults: EmotionData = {
      happiness: results.happiness || emotionData.happiness,
      empathy: results.empathy || emotionData.empathy,
      optimism: results.optimism || emotionData.optimism,
      calmness: results.calmness || emotionData.calmness,
      stress: results.stress || emotionData.stress,
      resilience: results.resilience || emotionData.resilience
    };
    
    // Save to localStorage
    localStorage.setItem('emotionTendencies', JSON.stringify(typedResults));
    
    // Update state
    setEmotionData(typedResults);
  };

  return (
    <section>
      <div className="mb-3">
        <h3 className="text-lg font-semibold">Emotion Tendencies</h3>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-1">
            <Smile className="h-8 w-8 text-primary" />
          </div>
          <p className="text-xs font-medium">Happiness</p>
          <p className="text-[10px] text-muted-foreground">{emotionData.happiness}%</p>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-1">
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <p className="text-xs font-medium">Empathy</p>
          <p className="text-[10px] text-muted-foreground">{emotionData.empathy}%</p>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-yellow-500/10 flex items-center justify-center mb-1">
            <TrendingUp className="h-8 w-8 text-yellow-500" />
          </div>
          <p className="text-xs font-medium">Optimism</p>
          <p className="text-[10px] text-muted-foreground">{emotionData.optimism}%</p>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-1">
            <Smile className="h-8 w-8 text-blue-500" />
          </div>
          <p className="text-xs font-medium">Calmness</p>
          <p className="text-[10px] text-muted-foreground">{emotionData.calmness}%</p>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center mb-1">
            <TrendingDown className="h-8 w-8 text-red-500" />
          </div>
          <p className="text-xs font-medium">Stress</p>
          <p className="text-[10px] text-muted-foreground">{emotionData.stress}%</p>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-1">
            <Brain className="h-8 w-8 text-purple-500" />
          </div>
          <p className="text-xs font-medium">Resilience</p>
          <p className="text-[10px] text-muted-foreground">{emotionData.resilience}%</p>
        </div>
      </div>

      {/* Full Width Button similar to the Personality Test */}
      <Button className="w-full" onClick={() => setIsTestOpen(true)}>
        Take Emotion Tendencies Test
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
