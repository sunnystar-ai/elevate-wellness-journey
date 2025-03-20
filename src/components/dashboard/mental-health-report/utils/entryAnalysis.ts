
import { JournalEntry } from '../types';
import { analyzeEntryWithAI } from './aiAnalysis';
import { useSimplifiedAnalysis } from './simplifiedAnalysis';

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
    // Fallback to simplified analysis if API fails
    return useSimplifiedAnalysis(entry);
  }
}
