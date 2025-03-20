import { JournalEntry, BeliefData } from '../../types';
import { SentimentResult } from './types';

/**
 * Generates belief data based on sentiment analysis results
 */
export const generateBeliefs = (
  feelingsSentiment: SentimentResult,
  thoughtsSentiment: SentimentResult,
  gratitudeSentiment: SentimentResult
): BeliefData[] => {
  // Calculate overall positivity score
  const overallPositivity = (
    feelingsSentiment.positiveRatio + 
    thoughtsSentiment.positiveRatio + 
    gratitudeSentiment.positiveRatio
  ) / 3;
  
  // Generate beliefs based on sentiment analysis
  return [
    {
      belief: overallPositivity > 0.6 
        ? "I have the ability to overcome challenges" 
        : "I'm facing significant obstacles right now",
      confidence: 0.7,
      isPositive: overallPositivity > 0.6
    },
    {
      belief: gratitudeSentiment.positiveRatio > 0.5 
        ? "I have things to be grateful for in my life" 
        : "It's difficult to find things to be grateful for currently",
      confidence: 0.8,
      isPositive: gratitudeSentiment.positiveRatio > 0.5
    },
    {
      belief: thoughtsSentiment.positiveRatio > 0.5
        ? "I can find solutions to my problems"
        : "My problems seem overwhelming at times",
      confidence: 0.65,
      isPositive: thoughtsSentiment.positiveRatio > 0.5
    }
  ];
};
