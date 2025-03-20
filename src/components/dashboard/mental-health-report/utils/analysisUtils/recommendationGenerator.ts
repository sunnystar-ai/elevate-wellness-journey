import { JournalEntry, Recommendation } from '../../types';
import { SentimentResult } from './types';

export function generateRecommendations(entry: JournalEntry, sentimentResult: SentimentResult): Recommendation[] {
  const recommendations: Recommendation[] = [];

  if (sentimentResult.sentiment === 'negative') {
    recommendations.push({
      text: "Consider practicing mindfulness or meditation to help manage negative feelings.",
      type: "coping_strategy"
    });
  } else {
    recommendations.push({
      text: "Continue to focus on the positive aspects of your day to maintain a positive mood.",
      type: "mood_maintenance"
    });
  }

  if (entry.thoughtProcess.length > 100) {
    recommendations.push({
      text: "Try breaking down overwhelming thoughts into smaller, manageable steps.",
      type: "thought_restructuring"
    });
  }

  if (entry.gratitude.length > 50) {
    recommendations.push({
      text: "Keep a gratitude journal to regularly acknowledge the good things in your life.",
      type: "gratitude_practice"
    });
  }

  return recommendations;
}
