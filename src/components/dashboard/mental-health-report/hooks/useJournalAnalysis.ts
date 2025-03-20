import { useState, useEffect } from 'react';
import { 
  analyzeJournalEntry, 
  generateTimeFrameData 
} from '../utils';
import {
  JournalEntry,
  SentimentData,
  ThemeData,
  BeliefData,
  CognitiveDistortion,
  Recommendation,
  TimeFrame
} from '../types';

export const useJournalAnalysis = (journalEntries: JournalEntry[] = []) => {
  const [loading, setLoading] = useState(true);
  const [apiKey, setApiKey] = useState<string | undefined>(undefined);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [themeData, setThemeData] = useState<ThemeData[]>([]);
  const [beliefData, setBeliefData] = useState<BeliefData[]>([]);
  const [cognitiveDistortions, setCognitiveDistortions] = useState<CognitiveDistortion[]>([]);
  const [sentimentData, setSentimentData] = useState<Record<TimeFrame, SentimentData[]>>({
    day: [],
    week: [],
    month: []
  });
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key);
    setLoading(true);
    // Re-analyze with the new API key
    analyzeJournalEntries(key);
  };

  const analyzeJournalEntries = async (currentApiKey = apiKey) => {
    if (!currentApiKey) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setAnalysisError(null);
    
    if (journalEntries && journalEntries.length > 0) {
      try {
        const latestEntry = journalEntries[journalEntries.length - 1];
        
        // Analyze the journal entry to extract insights
        const { 
          recommendations: newRecommendations, 
          keyThemes, 
          extractedBeliefs, 
          extractedDistortions 
        } = await analyzeJournalEntry(latestEntry, currentApiKey);
        
        // Generate sentiment data based on the entry and all journal entries
        const newSentimentData = generateTimeFrameData(latestEntry, journalEntries);
        
        // Update state with the extracted insights
        setRecommendations(newRecommendations);
        setThemeData(keyThemes.slice(0, 5)); // Top 5 themes
        setSentimentData(newSentimentData);
        setBeliefData(extractedBeliefs);
        setCognitiveDistortions(extractedDistortions);
      } catch (error) {
        console.error('Error analyzing journal entries:', error);
        setAnalysisError('An error occurred during journal analysis. Please check your OpenAI API key or try again later.');
      }
    }
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  };

  // Initialize with API key from env or localStorage
  useEffect(() => {
    // If we already have an API key, use it immediately
    if (apiKey) {
      analyzeJournalEntries();
      return;
    }
    
    // Otherwise check for environment variables first
    const envApiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (envApiKey && envApiKey.trim() !== '') {
      setApiKey(envApiKey);
      analyzeJournalEntries(envApiKey);
      return;
    }
    
    // Finally check localStorage
    const savedKey = localStorage.getItem('openai_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      analyzeJournalEntries(savedKey);
    } else {
      setLoading(false);
    }
  }, [journalEntries]);

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
