
import { useState, useEffect } from 'react';
import EmotionTendenciesTest from './emotion-test/EmotionTendenciesTest';
import TraitButtonsGrid from './emotion-test/TraitButtonsGrid';
import TestButton from './emotion-test/TestButton';
import { EmotionData } from './emotion-test/emotion-tendencies-types';
import { toast } from '@/hooks/use-toast';

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
      try {
        const parsedData = JSON.parse(savedData);
        if (parsedData && typeof parsedData === 'object') {
          // Validate that we have the expected data structure
          setEmotionData(parsedData);
        }
      } catch (error) {
        console.error('Error parsing emotion tendencies data from localStorage:', error);
        // If there's an error parsing, we'll use the default data
      }
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
    
    // Show success toast
    toast({
      title: "Personality Assessment Complete",
      description: "Your Big Five personality traits have been updated.",
    });
  };

  return (
    <section>
      <div className="mb-3">
        <h3 className="text-lg font-semibold">Big Five Personality Traits</h3>
      </div>
      
      <TraitButtonsGrid emotionData={emotionData} />

      <TestButton onClick={() => setIsTestOpen(true)} />

      <EmotionTendenciesTest 
        open={isTestOpen} 
        onOpenChange={setIsTestOpen} 
        onTestComplete={handleTestComplete}
      />
    </section>
  );
};

export default EmotionTendenciesSection;
