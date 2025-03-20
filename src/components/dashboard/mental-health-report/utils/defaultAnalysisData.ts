
import { ThemeData, BeliefData, CognitiveDistortion, Recommendation } from '../types';

export const getDefaultThemeData = (): ThemeData[] => [
  { theme: 'Reflection', count: 5, color: '#6366F1' },
  { theme: 'Growth', count: 4, color: '#10B981' },
  { theme: 'Gratitude', count: 6, color: '#F59E0B' }
];

export const getDefaultBeliefData = (): BeliefData[] => [
  { belief: 'Self-improvement is valuable', confidence: 0.8, isPositive: true },
  { belief: 'I am capable of change', confidence: 0.7, isPositive: true },
  { belief: 'Journaling helps mental health', confidence: 0.9, isPositive: true }
];

export const getDefaultDistortions = (): CognitiveDistortion[] => [
  { 
    type: 'All-or-Nothing Thinking',
    description: 'Seeing things in black and white categories',
    frequency: 2,
    example: 'From your journal entries, you may sometimes think in absolutes'
  }
];

export const getDefaultRecommendations = (): Recommendation[] => [
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
