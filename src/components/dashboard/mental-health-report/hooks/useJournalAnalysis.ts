
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
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

  const handleApiKeySubmit = (key: string) => {
    if (!key.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key",
        variant: "destructive"
      });
      return;
    }
    
    if (!key.startsWith('sk-')) {
      toast({
        title: "Invalid API Key",
        description: "OpenAI API keys should start with 'sk-'",
        variant: "destructive"
      });
      return;
    }
    
    // Save the API key to state and localStorage
    setApiKey(key);
    localStorage.setItem('openai_api_key', key);
    setLoading(true);
    setAnalysisError(null);
    
    // Re-analyze with the new API key
    analyzeJournalEntries(key);
    
    toast({
      title: "API Key Updated",
      description: "Your OpenAI API key has been saved and will be used for journal analysis.",
    });
  };

  const analyzeJournalEntries = async (currentApiKey = apiKey) => {
    if (!journalEntries || journalEntries.length === 0) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setAnalysisError(null);
    
    try {
      const latestEntry = journalEntries[journalEntries.length - 1];
      console.log('Analyzing latest journal entry:', latestEntry);
      
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
      setRecommendations(newRecommendations || []);
      setThemeData(keyThemes?.slice(0, 5) || []); // Top 5 themes
      setSentimentData(newSentimentData || { day: [], week: [], month: [] });
      setBeliefData(extractedBeliefs || []);
      setCognitiveDistortions(extractedDistortions || []);
      
      // Clear any previous errors
      setAnalysisError(null);
      
      // Show success toast
      toast({
        title: "Analysis Complete",
        description: "Your journal entry has been analyzed successfully.",
      });
    } catch (error) {
      console.error('Error analyzing journal entries:', error);
      let errorMessage = 'An error occurred during journal analysis.';
      
      if (error instanceof Error) {
        // Improved error message with more details
        if (error.message.includes('API key')) {
          errorMessage = 'Please check your OpenAI API key. It may be invalid or expired.';
        } else if (error.message.includes('rate limit')) {
          errorMessage = 'OpenAI API rate limit exceeded. Please try again later.';
        } else if (error.message.includes('parsing')) {
          errorMessage = 'Error processing the AI response. Using simplified analysis instead.';
        } else {
          errorMessage = error.message;
        }
      }
      
      setAnalysisError(errorMessage);
      
      toast({
        title: "Analysis Issue",
        description: "There was a problem with the AI analysis. Using simplified analysis instead.",
        variant: "destructive"
      });
    } finally {
      // Ensure loading state is updated regardless of success/failure
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  };

  // Initialize with API key from localStorage or env
  useEffect(() => {
    // Determine the initial API key in order of priority
    // 1. localStorage (user-provided)
    // 2. environment variable
    
    const savedKey = localStorage.getItem('openai_api_key');
    const envApiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    // First check localStorage since user-provided keys take precedence
    if (savedKey && savedKey.trim() !== '') {
      console.log('Initializing with API key from localStorage');
      setApiKey(savedKey);
      analyzeJournalEntries(savedKey);
      return;
    }
    
    // Then check environment variables
    if (envApiKey && envApiKey.trim() !== '') {
      console.log('Initializing with API key from environment variables');
      setApiKey(envApiKey);
      analyzeJournalEntries(envApiKey);
      return;
    }
    
    // If no API key is found, just set loading to false
    setLoading(false);
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
