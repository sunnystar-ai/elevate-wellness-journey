
import { JournalEntry } from '../types';
import { analyzeEntryWithAI } from './aiAnalysis';
import { useSimplifiedAnalysis } from './simplifiedAnalysis';
import { useToast } from '@/hooks/use-toast';

// Main function to analyze journal entries 
export async function analyzeJournalEntry(entry: JournalEntry, apiKey?: string) {
  console.log('Analyzing journal entry:', entry);
  
  // Check for valid API key in the following order:
  // 1. Explicitly provided API key (from the function parameter)
  // 2. localStorage API key
  // 3. Environment variable API key
  
  let effectiveApiKey = apiKey;
  
  // If no explicit API key is provided, check localStorage
  if (!effectiveApiKey || effectiveApiKey.trim() === '') {
    const localStorageKey = localStorage.getItem('openai_api_key');
    if (localStorageKey && localStorageKey.trim() !== '') {
      console.log('Using API key from localStorage');
      effectiveApiKey = localStorageKey;
    }
  }
  
  // If still no API key, check environment variables
  if (!effectiveApiKey || effectiveApiKey.trim() === '') {
    const envApiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (envApiKey && envApiKey.trim() !== '') {
      console.log('Using API key from environment variables');
      effectiveApiKey = envApiKey;
    }
  }
  
  // If no API key is found anywhere, use the simplified analysis
  if (!effectiveApiKey || effectiveApiKey.trim() === '') {
    console.log('No API key found anywhere, using simplified analysis');
    return useSimplifiedAnalysis(entry);
  }
  
  try {
    // Attempt to analyze with AI using the effective API key
    console.log('Attempting OpenAI analysis with API key', effectiveApiKey.substring(0, 3) + '...');
    const aiResults = await analyzeEntryWithAI(entry, effectiveApiKey);
    
    // Validate the results structure to ensure it has all required properties
    if (!aiResults.recommendations || !aiResults.keyThemes || 
        !aiResults.extractedBeliefs || !aiResults.extractedDistortions) {
      console.error('Invalid OpenAI analysis result structure', aiResults);
      throw new Error('Invalid analysis structure returned from API');
    }
    
    return aiResults;
  } catch (error) {
    console.error('Error analyzing journal entry with OpenAI:', error);
    
    // Log detailed error information
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
    
    // Log the fallback to simplified analysis
    console.log('Falling back to simplified analysis due to API error');
    
    // Return simplified analysis instead of throwing
    return useSimplifiedAnalysis(entry);
  }
}
