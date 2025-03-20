
import { JournalEntry } from '../types';
import { getColorForEmotion } from './colorUtils';
import React from 'react';

// Basic sentiment analysis function to extract positive/negative keywords
const extractSentiment = (text: string) => {
  const positiveWords = ['happy', 'joy', 'grateful', 'excited', 'love', 'enjoy', 'good', 'great', 'positive', 'hope'];
  const negativeWords = ['sad', 'angry', 'stress', 'tired', 'frustrate', 'anxiety', 'fear', 'worry', 'tough', 'bad'];
  
  const words = text.toLowerCase().split(/\s+/);
  const foundPositive = words.filter(word => positiveWords.some(pos => word.includes(pos)));
  const foundNegative = words.filter(word => negativeWords.some(neg => word.includes(neg)));
  
  return { 
    positive: foundPositive,
    negative: foundNegative,
    sentiment: (foundPositive.length > foundNegative.length) ? 'positive' : 'negative'
  };
};

// Simplified analysis for when API is not available
export function useSimplifiedAnalysis(entry: JournalEntry) {
  console.log('Using simplified analysis for entry:', entry);
  
  // Extract basic sentiments from each section
  const feelingsSentiment = extractSentiment(entry.feelings);
  const thoughtsSentiment = extractSentiment(entry.thoughtProcess);
  const gratitudeSentiment = extractSentiment(entry.gratitude);
  
  // Generate basic themes
  const allKeywords = [
    ...feelingsSentiment.positive, 
    ...feelingsSentiment.negative,
    ...thoughtsSentiment.positive,
    ...thoughtsSentiment.negative
  ];
  
  // Count occurrences of keywords to get themes
  const keywordCounts: Record<string, number> = {};
  allKeywords.forEach(keyword => {
    keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
  });
  
  // Convert to themes array
  const keyThemes = Object.entries(keywordCounts)
    .map(([theme, count]) => ({
      theme,
      count,
      color: getColorForEmotion(theme)
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  
  // If no themes were found, add default ones
  if (keyThemes.length === 0) {
    keyThemes.push(
      { theme: 'Reflection', count: 5, color: getColorForEmotion('Reflection') },
      { theme: 'Growth', count: 4, color: getColorForEmotion('Growth') }
    );
  }
  
  // Generate basic beliefs
  const extractedBeliefs = [
    {
      belief: feelingsSentiment.sentiment === 'positive' 
        ? "I can handle my current challenges" 
        : "Things are difficult right now",
      confidence: 0.7,
      isPositive: feelingsSentiment.sentiment === 'positive'
    },
    {
      belief: gratitudeSentiment.positive.length > 0 
        ? "I have things to be grateful for" 
        : "It's hard to find things to be grateful for",
      confidence: 0.8,
      isPositive: gratitudeSentiment.positive.length > 0
    }
  ];
  
  // Generate cognitive distortions
  const extractedDistortions = [
    {
      type: "All-or-Nothing Thinking",
      description: "Seeing things in black-and-white categories",
      frequency: feelingsSentiment.negative.length > feelingsSentiment.positive.length ? 3 : 1,
      example: "Found patterns of extreme thinking in journal entry"
    }
  ];
  
  // Generate recommendations based on sentiment
  const recommendations = [
    {
      title: "Practice Mindfulness",
      description: "Take 5 minutes today to breathe deeply and be present with your emotions",
      type: "short-term",
      icon: React.createElement("div", { className: "h-4 w-4 text-harmony-lavender" })
    },
    {
      title: feelingsSentiment.sentiment === 'positive' ? "Build on Positive Emotions" : "Address Negative Feelings",
      description: feelingsSentiment.sentiment === 'positive' 
        ? "Journal about what's contributing to your positive state" 
        : "Identify one small action to improve your mood today",
      type: "short-term",
      icon: React.createElement("div", { className: "h-4 w-4 text-harmony-lavender" })
    },
    {
      title: "Gratitude Practice",
      description: "Continue noting things you're grateful for each day to build resilience",
      type: "long-term",
      icon: React.createElement("div", { className: "h-4 w-4 text-harmony-lavender" })
    }
  ];
  
  return {
    recommendations,
    keyThemes,
    extractedBeliefs,
    extractedDistortions
  };
}
