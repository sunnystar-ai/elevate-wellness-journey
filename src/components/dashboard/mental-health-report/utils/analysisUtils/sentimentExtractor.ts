import { JournalEntry } from '../../types';
import { SentimentResult } from './types';

// Lists of positive and negative words for basic sentiment analysis
const positiveWords = [
  'happy', 'joy', 'grateful', 'excited', 'love', 'enjoy', 'good', 
  'great', 'positive', 'hope', 'appreciate', 'thankful', 'blessed', 
  'optimistic', 'peaceful', 'calm', 'relaxed', 'satisfied', 'content'
];

const negativeWords = [
  'sad', 'angry', 'stress', 'tired', 'frustrate', 'anxiety', 'fear', 
  'worry', 'tough', 'bad', 'difficult', 'overwhelm', 'disappointed', 
  'upset', 'nervous', 'doubt', 'confused', 'annoyed', 'tired'
];

/**
 * Extracts sentiment information from text
 * Returns positive/negative keywords and sentiment score
 */
export const extractSentiment = (text: string): SentimentResult => {
  // Extract words and clean them
  const words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
  
  // Find matching words
  const foundPositive = words.filter(word => 
    positiveWords.some(pos => word.includes(pos) || pos.includes(word))
  );
  
  const foundNegative = words.filter(word => 
    negativeWords.some(neg => word.includes(neg) || neg.includes(word))
  );
  
  // Calculate sentiment ratio
  const positiveRatio = foundPositive.length / (foundPositive.length + foundNegative.length || 1);
  
  return { 
    positive: foundPositive,
    negative: foundNegative,
    sentiment: positiveRatio > 0.5 ? 'positive' : 'negative',
    positiveRatio: positiveRatio
  };
};
