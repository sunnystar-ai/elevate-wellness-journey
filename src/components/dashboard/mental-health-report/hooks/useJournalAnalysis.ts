
import { useEffect } from 'react';
import { JournalEntry, TimeFrame } from '../types';
import { useApiKey } from './useApiKey';
import { useAnalysisState } from './useAnalysisState';
import { useAnalyzeEntries } from './useAnalyzeEntries';
import { 
  getDefaultThemeData, 
  getDefaultBeliefData, 
  getDefaultDistortions, 
  getDefaultRecommendations 
} from '../utils/defaultAnalysisData';

export const useJournalAnalysis = (journalEntries: JournalEntry[] = []) => {
  const { apiKey, handleApiKeySubmit } = useApiKey();
  
  const {
    loading,
    setLoading,
    recommendations,
    setRecommendations,
    themeData,
    setThemeData,
    beliefData,
    setBeliefData,
    cognitiveDistortions,
    setCognitiveDistortions,
    sentimentData,
    setSentimentData,
    analysisError,
    setAnalysisError
  } = useAnalysisState();

  const setDefaultData = () => {
    setThemeData(getDefaultThemeData());
    setBeliefData(getDefaultBeliefData());
    setCognitiveDistortions(getDefaultDistortions());
    setRecommendations(getDefaultRecommendations());
  };

  const { analyzeJournalEntries } = useAnalyzeEntries(
    setLoading,
    setSentimentData,
    setThemeData,
    setBeliefData,
    setCognitiveDistortions,
    setRecommendations,
    setAnalysisError,
    setDefaultData
  );

  useEffect(() => {
    if (!journalEntries || journalEntries.length === 0) {
      setLoading(false);
      return;
    }
    
    analyzeJournalEntries(journalEntries, apiKey);
  }, [journalEntries, apiKey]);

  return {
    loading,
    apiKey,
    analysisError,
    recommendations,
    themeData,
    beliefData,
    cognitiveDistortions,
    sentimentData,
    handleApiKeySubmit
  };
};
