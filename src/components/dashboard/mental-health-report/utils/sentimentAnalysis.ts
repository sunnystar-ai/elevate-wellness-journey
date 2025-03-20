
import { JournalEntry } from '../types';

// Generate sentiment scores based on journal entry
export function generateSentimentScores(entry: JournalEntry) {
  const allText = `${entry.feelings} ${entry.thoughtProcess} ${entry.gratitude}`.toLowerCase();
  
  // Create sentiment scores based on actual entry content
  const positiveWords = ['happy', 'enjoy', 'grateful', 'thankful', 'motivated', 'value', 'growth', 'learn', 'good', 'enough', 'budget'];
  const negativeWords = ['sad', 'anxious', 'stress', 'worry', 'fear', 'doubt', 'slow', 'difficult'];
  
  let positiveCount = 0;
  let negativeCount = 0;
  
  positiveWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = allText.match(regex);
    if (matches) {
      positiveCount += matches.length;
    }
  });
  
  negativeWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = allText.match(regex);
    if (matches) {
      negativeCount += matches.length;
    }
  });
  
  const totalEmotionWords = positiveCount + negativeCount;
  // Calculate sentiment score (0-1 scale where 1 is positive)
  const sentimentScore = totalEmotionWords > 0 ? 
    (0.5 + 0.5 * (positiveCount - negativeCount) / totalEmotionWords) : 0.5;
  
  // Calculate gratitude ratio based on actual mentions
  const gratitudeWords = ['grateful', 'thankful', 'appreciate', 'blessing', 'budget', 'enough'];
  let gratitudeCount = 0;
  
  gratitudeWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = allText.match(regex);
    if (matches) {
      gratitudeCount += matches.length;
    }
  });
  
  const gratitudeRatio = totalEmotionWords > 0 ? 
    Math.min(0.9, Math.max(0.1, gratitudeCount / Math.max(5, totalEmotionWords) * 2)) : 0.5;
  
  return {
    sentimentScore,
    gratitudeRatio
  };
}
