
import { JournalEntry } from '../types';
import { 
  analyzeJournalEntry, 
  generateTimeFrameData 
} from '../utils';
import { useToast } from '@/hooks/use-toast';

export const useAnalyzeEntries = (
  setLoading: (loading: boolean) => void,
  setSentimentData: (data: any) => void,
  setThemeData: (data: any) => void,
  setBeliefData: (data: any) => void,
  setCognitiveDistortions: (data: any) => void,
  setRecommendations: (data: any) => void,
  setAnalysisError: (error: string | null) => void,
  getDefaultData: () => void
) => {
  const { toast } = useToast();

  const analyzeJournalEntries = async (
    journalEntries: JournalEntry[],
    apiKey?: string
  ) => {
    if (!journalEntries || journalEntries.length === 0) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setAnalysisError(null);
    
    try {
      const latestEntry = journalEntries[journalEntries.length - 1];
      console.log('Analyzing latest journal entry:', latestEntry);
      
      const newSentimentData = generateTimeFrameData(latestEntry, journalEntries);
      setSentimentData(newSentimentData || { day: [], week: [], month: [] });
      
      if (apiKey) {
        try {
          const { 
            recommendations: newRecommendations, 
            keyThemes, 
            extractedBeliefs, 
            extractedDistortions 
          } = await analyzeJournalEntry(latestEntry, apiKey);
          
          if (newRecommendations?.length) setRecommendations(newRecommendations);
          if (keyThemes?.length) setThemeData(keyThemes.slice(0, 5));
          if (extractedBeliefs?.length) setBeliefData(extractedBeliefs);
          if (extractedDistortions?.length) setCognitiveDistortions(extractedDistortions);
        } catch (error) {
          console.error('Error in API analysis, using defaults', error);
          getDefaultData();
        }
      } else {
        getDefaultData();
      }
      
      setAnalysisError(null);
    } catch (error) {
      console.error('Error analyzing journal entries:', error);
      let errorMessage = 'An error occurred during journal analysis.';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setAnalysisError(errorMessage);
      
      toast({
        title: "Analysis Issue",
        description: "There was a problem with the analysis. Using simplified data instead.",
        variant: "destructive"
      });
    } finally {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  };

  return { analyzeJournalEntries };
};
