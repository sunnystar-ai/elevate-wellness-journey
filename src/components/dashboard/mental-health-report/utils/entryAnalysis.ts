
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
  
  // If no API key is provided, use the simplified analysis
  if (!apiKey) {
    console.log('No API key provided, using simplified analysis');
    return useSimplifiedAnalysis(entry);
  }
  
  try {
    // Analyze with AI
    return await analyzeEntryWithAI(entry, apiKey);
  } catch (error) {
    console.error('Error analyzing journal entry with OpenAI:', error);
    
    // Log detailed error information
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
    
    // Fallback to simplified analysis if API fails
    console.log('Falling back to simplified analysis due to API error');
    return useSimplifiedAnalysis(entry);
  }
}
