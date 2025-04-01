
import { useState, useEffect } from 'react';
import EmotionTendenciesTest from './emotion-test/EmotionTendenciesTest';
import TraitButtonsGrid from './emotion-test/TraitButtonsGrid';
import TestButton from './emotion-test/TestButton';
import { EmotionData } from './emotion-test/emotion-tendencies-types';
import { toast } from '@/hooks/use-toast';
import { loadBigFiveResults, saveBigFiveResults } from '@/services/personalityService';

// Default data to use if nothing is in localStorage or database
const defaultEmotionData: EmotionData = {
  openness: 70,
  conscientiousness: 75,
  extraversion: 65,
  agreeableness: 80,
  neuroticism: 40
};

const EmotionTendenciesSection = () => {
  const [isTestOpen, setIsTestOpen] = useState(false);
  const [emotionData, setEmotionData] = useState<EmotionData>(defaultEmotionData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load saved emotion tendencies data from Supabase first, then local storage as fallback
    async function loadData() {
      try {
        setIsLoading(true);
        
        const results = await loadBigFiveResults();
        
        if (results) {
          console.log("Loaded emotion data from database:", results);
          setEmotionData(results);
        } else {
          // Try localStorage as fallback
          const savedData = localStorage.getItem('emotionTendencies');
          
          if (savedData) {
            const parsedData = JSON.parse(savedData);
            if (parsedData && typeof parsedData === 'object') {
              console.log("Loaded emotion data from localStorage:", parsedData);
              setEmotionData(parsedData);
              
              // Try to save the localStorage data to Supabase
              try {
                await saveBigFiveResults(parsedData);
                console.log("Migrated localStorage data to database");
              } catch (error) {
                console.error("Could not migrate localStorage data to database:", error);
              }
            } else {
              console.log("Invalid data format in localStorage, using default data");
              localStorage.setItem('emotionTendencies', JSON.stringify(defaultEmotionData));
            }
          } else {
            console.log("No data in database or localStorage, using default data");
            localStorage.setItem('emotionTendencies', JSON.stringify(defaultEmotionData));
          }
        }
      } catch (error) {
        console.error('Error loading emotion tendencies data:', error);
        
        // If there's an error, use and save the default data
        localStorage.setItem('emotionTendencies', JSON.stringify(defaultEmotionData));
      } finally {
        setIsLoading(false);
      }
    }
    
    loadData();
  }, []);

  const handleTestComplete = async (results: Record<string, number>) => {
    // Map the results to our EmotionData type with fallbacks to current values
    const typedResults: EmotionData = {
      openness: results.openness || emotionData.openness,
      conscientiousness: results.conscientiousness || emotionData.conscientiousness,
      extraversion: results.extraversion || emotionData.extraversion,
      agreeableness: results.agreeableness || emotionData.agreeableness,
      neuroticism: results.neuroticism || emotionData.neuroticism
    };
    
    console.log("Test completed with results:", typedResults);
    
    // Update state first for immediate UI update
    setEmotionData(typedResults);
    
    // Save to localStorage as backup
    localStorage.setItem('emotionTendencies', JSON.stringify(typedResults));
    
    // Save to Supabase
    try {
      await saveBigFiveResults(typedResults);
      
      // Show success toast
      toast({
        title: "Personality Assessment Complete",
        description: "Your Big Five personality traits have been saved to your profile.",
      });
    } catch (error) {
      console.error("Error saving Big Five results to database:", error);
      
      toast({
        title: "Personality Assessment Complete",
        description: "Your results are saved locally but couldn't be stored in your profile.",
        variant: "destructive"
      });
    }
  };

  return (
    <section>
      <div className="mb-3">
        <h3 className="text-lg font-semibold">Big Five Personality Traits</h3>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center p-6">
          <div className="animate-pulse">Loading personality data...</div>
        </div>
      ) : (
        <TraitButtonsGrid emotionData={emotionData} />
      )}

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
