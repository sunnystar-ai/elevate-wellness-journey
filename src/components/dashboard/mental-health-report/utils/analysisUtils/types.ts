
// Export types for use in the simplified analysis modules
export interface SentimentResult {
  positive: string[];
  negative: string[];
  sentiment: 'positive' | 'negative';
  positiveRatio: number;
}

// Re-export types from the parent types file
// Using 'export type' for re-exports when 'isolatedModules' is enabled
export type { 
  JournalEntry, 
  ThemeData, 
  BeliefData, 
  CognitiveDistortion, 
  Recommendation 
} from '../../types';
