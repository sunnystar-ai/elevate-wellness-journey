
import { JournalEntry, Recommendation } from '../../types';
import { SentimentResult } from './types';

export function generateRecommendations(entry: JournalEntry, sentimentResult: SentimentResult): Recommendation[] {
  const recommendations: Recommendation[] = [];

  if (sentimentResult.sentiment === 'negative') {
    recommendations.push({
      title: "Practice Mindfulness",
      description: "Consider practicing mindfulness or meditation to help manage negative feelings.",
      icon: null,
      type: "short-term" // Fixed: Use literal type instead of string
    });
  } else {
    recommendations.push({
      title: "Maintain Positivity",
      description: "Continue to focus on the positive aspects of your day to maintain a positive mood.",
      icon: null,
      type: "short-term" // Fixed: Use literal type instead of string
    });
  }

  if (entry.thoughtProcess.length > 100) {
    recommendations.push({
      title: "Organize Thoughts",
      description: "Try breaking down overwhelming thoughts into smaller, manageable steps.",
      icon: null,
      type: "long-term" // Fixed: Use literal type instead of string
    });
  }

  if (entry.gratitude.length > 50) {
    recommendations.push({
      title: "Gratitude Journal",
      description: "Keep a gratitude journal to regularly acknowledge the good things in your life.",
      icon: null,
      type: "long-term" // Fixed: Use literal type instead of string
    });
  }

  return recommendations;
}
