
export type JournalEntry = {
  feelings: string;
  thoughtProcess: string;
  gratitude: string;
  date?: string;
};

export type SentimentData = {
  date: string;
  sentimentScore: number;
  gratitudeRatio: number;
  consistencyScore: number;
  overallScore: number;
};

export type ThemeData = {
  theme: string;
  count: number;
  color: string;
};

export type BeliefData = {
  belief: string;
  confidence: number;
  isPositive: boolean;
};

export type CognitiveDistortion = {
  type: string;
  description: string;
  frequency: number;
  example: string;
};

export type Recommendation = {
  title: string;
  description: string;
  icon: React.ReactNode;
  type: 'short-term' | 'long-term';
};

export type TimeFrame = 'day' | 'week' | 'month';

// Import the SentimentResult type from analysisUtils - use export type for re-exporting
import { SentimentResult } from './utils/analysisUtils/types';
export type { SentimentResult };
