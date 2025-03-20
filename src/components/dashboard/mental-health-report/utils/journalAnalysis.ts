
import { 
  JournalEntry, 
  SentimentData, 
  ThemeData, 
  BeliefData, 
  CognitiveDistortion, 
  Recommendation 
} from '../types';
import React from 'react';

// Helper function to assign colors to emotions
export function getColorForEmotion(emotion: string): string {
  const colorMap: Record<string, string> = {
    happy: '#C3E6CB', // Mint green
    sad: '#F5C6CB', // Light red
    anxious: '#FFB347', // Orange
    stress: '#FFB347', // Orange
    worry: '#FFB347', // Orange
    grateful: '#A7C7E7', // Light blue
    thankful: '#A7C7E7', // Light blue
    friend: '#D6C6E1', // Lavender
    value: '#C3E6CB', // Mint green
    motivate: '#C3E6CB' // Mint green
  };
  
  return colorMap[emotion] || '#A7C7E7'; // Default to light blue
}

// Analyze journal entries and extract insights
export function analyzeJournalEntry(entry: JournalEntry) {
  console.log('Latest journal entry analyzed:', entry);
  
  // Create empty result objects
  const recommendations: Recommendation[] = [];
  const keyThemes: ThemeData[] = [];
  const extractedBeliefs: BeliefData[] = [];
  const extractedDistortions: CognitiveDistortion[] = [];
  
  // Very simple analysis (in a real app this would use NLP/LLM)
  // For demonstration purposes only
  const wordsMap: Record<string, number> = {};
  const allText = `${entry.feelings} ${entry.thoughtProcess} ${entry.gratitude}`.toLowerCase();
  
  // Count word frequencies
  const words = allText.split(/\s+/);
  words.forEach(word => {
    if (word.length > 3) { // Only count words with more than 3 characters
      wordsMap[word] = (wordsMap[word] || 0) + 1;
    }
  });
  
  // Check for frequent emotion words
  const emotionWords = ["happy", "sad", "anxious", "stress", "worry", "grateful", "thankful", "motivate", "friend", "value"];
  
  emotionWords.forEach(emotion => {
    const count = (allText.match(new RegExp(`${emotion}`, 'gi')) || []).length;
    if (count > 0) {
      keyThemes.push({
        theme: emotion.charAt(0).toUpperCase() + emotion.slice(1),
        count: count,
        color: getColorForEmotion(emotion)
      });
    }
  });
  
  // Sort themes by count
  keyThemes.sort((a, b) => b.count - a.count);
  
  // Create recommendations based on journal content
  if (allText.includes('stress') || allText.includes('anxious') || allText.includes('worry')) {
    recommendations.push({
      title: 'Practice mindfulness',
      description: `Your latest entry mentions feelings of ${keyThemes.find(t => ['Stress', 'Anxious', 'Worry'].includes(t.theme))?.theme.toLowerCase() || 'stress'}. Try a 5-minute breathing exercise.`,
      icon: React.createElement("div", { className: "h-4 w-4 text-harmony-lavender" }),
      type: 'short-term'
    });
  }
  
  if (allText.includes('friend') || allText.includes('collaboration') || allText.includes('social')) {
    recommendations.push({
      title: 'Nurture social connections',
      description: 'Your entry highlights the importance of relationships. Schedule time to connect with a friend.',
      icon: React.createElement("div", { className: "h-4 w-4 text-harmony-blue" }),
      type: 'short-term'
    });
  }
  
  if (allText.includes('grateful') || allText.includes('thankful') || allText.includes('appreciation')) {
    recommendations.push({
      title: 'Daily gratitude practice',
      description: 'Continue expressing gratitude in your journal. Consider noting 3 specific things each morning.',
      icon: React.createElement("div", { className: "h-4 w-4 text-harmony-mint" }),
      type: 'short-term'
    });
  }

  // Add at least one long-term recommendation
  if (allText.includes('value') || allText.includes('worth') || allText.includes('contribute')) {
    recommendations.push({
      title: 'Recognize your contributions',
      description: 'Work on acknowledging the value you bring to your collaborations and projects.',
      icon: React.createElement("div", { className: "h-4 w-4 text-harmony-peach" }),
      type: 'long-term'
    });
  } else {
    recommendations.push({
      title: 'Develop self-reflection practice',
      description: 'Set aside time weekly to reflect on your personal growth and learning experiences.',
      icon: React.createElement("div", { className: "h-4 w-4 text-harmony-peach" }),
      type: 'long-term'
    });
  }
  
  // Extract beliefs from latest entry
  if (allText.includes('value') && allText.includes('contribute')) {
    extractedBeliefs.push({
      belief: 'My contributions are valuable',
      confidence: 0.75,
      isPositive: true
    });
  }
  
  if (allText.includes('learn') || allText.includes('growth')) {
    extractedBeliefs.push({
      belief: 'I can grow through challenges',
      confidence: 0.82,
      isPositive: true
    });
  }
  
  if (extractedBeliefs.length === 0) {
    // Default beliefs if none detected
    extractedBeliefs.push({
      belief: 'I can grow through journaling',
      confidence: 0.70,
      isPositive: true
    });
  }

  // Create cognitive distortions
  extractedDistortions.push({
    type: 'All-or-nothing thinking',
    description: 'Seeing things in black and white categories',
    frequency: 2,
    example: '"Either I contribute perfectly or I\'m not valuable."'
  });

  return {
    recommendations,
    keyThemes,
    extractedBeliefs,
    extractedDistortions
  };
}

// Generate sentiment scores based on journal entry
export function generateSentimentScores(entry: JournalEntry) {
  const allText = `${entry.feelings} ${entry.thoughtProcess} ${entry.gratitude}`.toLowerCase();
  
  // Create simple sentiment scores based on the entry
  const positiveWords = ['happy', 'grateful', 'thankful', 'motivated', 'value', 'growth', 'learn'];
  const negativeWords = ['sad', 'anxious', 'stress', 'worry', 'fear', 'doubt'];
  
  let positiveCount = 0;
  let negativeCount = 0;
  
  positiveWords.forEach(word => {
    positiveCount += (allText.match(new RegExp(word, 'gi')) || []).length;
  });
  
  negativeWords.forEach(word => {
    negativeCount += (allText.match(new RegExp(word, 'gi')) || []).length;
  });
  
  const totalEmotionWords = positiveCount + negativeCount;
  const sentimentScore = totalEmotionWords > 0 ? 
    (0.5 + 0.5 * (positiveCount - negativeCount) / totalEmotionWords) : 0.5;
  
  const gratitudeRatio = allText.includes('grateful') || allText.includes('thankful') ? 0.7 : 0.3;
  
  return {
    sentimentScore,
    gratitudeRatio
  };
}

// Generate data for the time frames (day, week, month)
export function generateTimeFrameData(entry: JournalEntry) {
  const { sentimentScore, gratitudeRatio } = generateSentimentScores(entry);
  
  // Generate sentiment data for day view
  const daySentiment: SentimentData[] = [{
    date: 'Today',
    sentimentScore: sentimentScore,
    gratitudeRatio: gratitudeRatio,
    consistencyScore: 1.0,
    overallScore: (sentimentScore + gratitudeRatio + 1.0) / 3
  }];
  
  // Generate week view
  const weekSentiment: SentimentData[] = Array(7).fill(0).map((_, i) => ({
    date: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i],
    sentimentScore: i === 6 ? sentimentScore : 0,
    gratitudeRatio: i === 6 ? gratitudeRatio : 0,
    consistencyScore: i === 6 ? 1.0 : 0,
    overallScore: i === 6 ? (sentimentScore + gratitudeRatio + 1.0) / 3 : 0
  }));
  
  // Generate month view
  const monthSentiment: SentimentData[] = Array(4).fill(0).map((_, i) => ({
    date: `Week ${i+1}`,
    sentimentScore: i === 3 ? sentimentScore : 0,
    gratitudeRatio: i === 3 ? gratitudeRatio : 0,
    consistencyScore: i === 3 ? 0.25 : 0,
    overallScore: i === 3 ? (sentimentScore + gratitudeRatio + 0.25) / 3 : 0
  }));

  return {
    day: daySentiment,
    week: weekSentiment,
    month: monthSentiment
  };
}
