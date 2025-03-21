
import { useState, useEffect } from 'react';
import EmotionTendenciesTest from './emotion-test/EmotionTendenciesTest';
import TraitButtonsGrid from './emotion-test/TraitButtonsGrid';
import TestButton from './emotion-test/TestButton';
import { EmotionData } from './emotion-test/emotion-tendencies-types';

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

  return (
    <section>
      <div className="mb-3">
        <h3 className="text-lg font-semibold">Big Five Personality Traits</h3>
      </div>
      
      <div className="flex justify-center mb-4">
        <h4 className="text-base font-medium">Big Five Personality Traits</h4>
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
