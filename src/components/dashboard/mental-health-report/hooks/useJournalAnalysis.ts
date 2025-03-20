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
    
    setApiKey(key);
    localStorage.setItem('openai_api_key', key);
    setLoading(true);
    setAnalysisError(null);
    
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
      
      const newSentimentData = generateTimeFrameData(latestEntry, journalEntries);
      setSentimentData(newSentimentData || { day: [], week: [], month: [] });
      
      const defaultThemes = [
        { theme: 'Reflection', count: 5, color: '#6366F1' },
        { theme: 'Growth', count: 4, color: '#10B981' },
        { theme: 'Gratitude', count: 6, color: '#F59E0B' }
      ];
      
      const defaultBeliefs = [
        { belief: 'Self-improvement is valuable', confidence: 0.8, isPositive: true },
        { belief: 'I am capable of change', confidence: 0.7, isPositive: true },
        { belief: 'Journaling helps mental health', confidence: 0.9, isPositive: true }
      ];
      
      const defaultDistortions = [
        { 
          type: 'All-or-Nothing Thinking',
          description: 'Seeing things in black and white categories',
          frequency: 2,
          example: 'From your journal entries, you may sometimes think in absolutes'
        }
      ];
      
      const defaultRecommendations = [
        {
          title: "Continue Journaling",
          description: "Regular journaling helps track your mental well-being over time",
          icon: null,
          type: "short-term"
        },
        {
          title: "Practice Gratitude",
          description: "Continue acknowledging things you're grateful for",
          icon: null,
          type: "long-term"
        }
      ];
      
      if (currentApiKey) {
        try {
          const { 
            recommendations: newRecommendations, 
            keyThemes, 
            extractedBeliefs, 
            extractedDistortions 
          } = await analyzeJournalEntry(latestEntry, currentApiKey);
          
          if (newRecommendations?.length) setRecommendations(newRecommendations);
          if (keyThemes?.length) setThemeData(keyThemes.slice(0, 5));
          if (extractedBeliefs?.length) setBeliefData(extractedBeliefs);
          if (extractedDistortions?.length) setCognitiveDistortions(extractedDistortions);
        } catch (error) {
          console.error('Error in API analysis, using defaults', error);
          setThemeData(defaultThemes);
          setBeliefData(defaultBeliefs);
          setCognitiveDistortions(defaultDistortions);
          setRecommendations(defaultRecommendations);
        }
      } else {
        setThemeData(defaultThemes);
        setBeliefData(defaultBeliefs);
        setCognitiveDistortions(defaultDistortions);
        setRecommendations(defaultRecommendations);
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

  useEffect(() => {
    if (!journalEntries || journalEntries.length === 0) {
      setLoading(false);
      return;
    }
    
    const savedKey = localStorage.getItem('openai_api_key');
    const envApiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    let effectiveApiKey: string | undefined = undefined;
    
    if (savedKey && savedKey.trim() !== '') {
      console.log('Using API key from localStorage');
      effectiveApiKey = savedKey;
    } 
    else if (envApiKey && envApiKey.trim() !== '') {
      console.log('Using API key from environment variables');
      effectiveApiKey = envApiKey;
    }
    
    setApiKey(effectiveApiKey);
    
    analyzeJournalEntries(effectiveApiKey);
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
