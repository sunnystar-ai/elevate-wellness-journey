
import { JournalEntry } from '../types';
import { analyzeEntryWithAI } from './aiAnalysis';
import { useSimplifiedAnalysis } from './simplifiedAnalysis';
import { useToast } from '@/hooks/use-toast';

// Main function to analyze journal entries 
export async function analyzeJournalEntry(entry: JournalEntry, apiKey?: string) {
  console.log('Analyzing journal entry:', entry);
  
  // Try to get API key from environment if not provided
  if (!apiKey) {
    apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  }
  
  // If no API key is provided, use the simplified analysis right away
  if (!apiKey || apiKey.trim() === '') {
    console.log('No API key provided, using simplified analysis');
    return useSimplifiedAnalysis(entry);
  }
  
  try {
    // Attempt to analyze with AI
    console.log('Attempting OpenAI analysis with API key', apiKey.substring(0, 3) + '...');
    const aiResults = await analyzeEntryWithAI(entry, apiKey);
    
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
