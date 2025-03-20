
import { JournalEntry } from '../types';
import { getColorForEmotion } from './colorUtils';
import React from 'react';

// Basic sentiment analysis function to extract positive/negative keywords
const extractSentiment = (text: string) => {
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

// Extract key themes from text
const extractThemes = (text: string) => {
  const themeKeywords = {
    'Reflection': ['think', 'reflect', 'consider', 'wonder', 'ponder'],
    'Growth': ['learn', 'grow', 'improve', 'progress', 'develop'],
    'Challenge': ['difficult', 'challenge', 'tough', 'hard', 'struggle'],
    'Achievement': ['accomplish', 'achieve', 'complete', 'finish', 'succeed'],
    'Stress': ['stress', 'pressure', 'tension', 'overwhelm', 'burden'],
    'Enjoyment': ['enjoy', 'fun', 'happy', 'pleasure', 'delight'],
    'Gratitude': ['grateful', 'thankful', 'appreciate', 'blessed', 'lucky'],
    'Frustration': ['frustrate', 'annoy', 'irritate', 'bother', 'upset'],
    'Excitement': ['excited', 'thrilled', 'eager', 'anticipate', 'look forward'],
    'Worry': ['worry', 'concern', 'anxious', 'fear', 'dread'],
    'Self-doubt': ['doubt', 'uncertain', 'unsure', 'hesitant', 'question']
  };
  
  const words = text.toLowerCase().split(/\s+/);
  const foundThemes: Record<string, number> = {};
  
  // Check each word against theme keywords
  Object.entries(themeKeywords).forEach(([theme, keywords]) => {
    const count = words.filter(word => 
      keywords.some(keyword => word.includes(keyword) || keyword.includes(word))
    ).length;
    
    if (count > 0) {
      foundThemes[theme] = count;
    }
  });
  
  return foundThemes;
};

// Simplified analysis for when API is not available
export function useSimplifiedAnalysis(entry: JournalEntry) {
  console.log('Using simplified analysis for entry:', entry);
  
  // Extract basic sentiments from each section
  const feelingsSentiment = extractSentiment(entry.feelings);
  const thoughtsSentiment = extractSentiment(entry.thoughtProcess);
  const gratitudeSentiment = extractSentiment(entry.gratitude);
  
  // Extract themes from each section and combine
  const feelingsThemes = extractThemes(entry.feelings);
  const thoughtsThemes = extractThemes(entry.thoughtProcess);
  const gratitudeThemes = extractThemes(entry.gratitude);
  
  // Combine all themes
  const allThemes: Record<string, number> = {};
  [feelingsThemes, thoughtsThemes, gratitudeThemes].forEach(themesObj => {
    Object.entries(themesObj).forEach(([theme, count]) => {
      allThemes[theme] = (allThemes[theme] || 0) + count;
    });
  });
  
  // Create themes array
  const keyThemes = Object.entries(allThemes)
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
      { theme: 'Growth', count: 4, color: getColorForEmotion('Growth') },
      { theme: 'Gratitude', count: 6, color: getColorForEmotion('Gratitude') }
    );
  }
  
  // Generate beliefs based on sentiment analysis
  const overallPositivity = (feelingsSentiment.positiveRatio + 
    thoughtsSentiment.positiveRatio + 
    gratitudeSentiment.positiveRatio) / 3;
  
  const extractedBeliefs = [
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
  
  // Generate cognitive distortions based on sentiment
  const extractedDistortions = [
    {
      type: "All-or-Nothing Thinking",
      description: "Seeing things in black-and-white categories",
      frequency: feelingsSentiment.negative.length > feelingsSentiment.positive.length ? 3 : 1,
      example: "Found patterns of extreme thinking in your journal entry"
    },
    {
      type: overallPositivity < 0.4 ? "Filtering" : "Personalization",
      description: overallPositivity < 0.4 
        ? "Focusing on negatives while ignoring positives" 
        : "Taking excessive responsibility for external events",
      frequency: overallPositivity < 0.4 ? 3 : 2,
      example: overallPositivity < 0.4 
        ? "Tendency to focus on challenges more than achievements" 
        : "Taking ownership of situations that may be outside your control"
    },
    {
      type: "Jumping to Conclusions",
      description: "Making negative interpretations without evidence",
      frequency: 2,
      example: "Making assumptions about outcomes before they happen"
    }
  ];
  
  // Generate recommendations based on sentiment and themes
  const recommendations = [
    {
      title: "Practice Mindfulness",
      description: "Take 5 minutes today to breathe deeply and be present with your emotions",
      type: "short-term",
      icon: React.createElement("div", { className: "h-4 w-4 text-harmony-lavender" })
    },
    {
      title: overallPositivity > 0.6 ? "Build on Positive Emotions" : "Address Challenging Feelings",
      description: overallPositivity > 0.6 
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
    },
    {
      title: "Self-Compassion",
      description: "Treat yourself with the same kindness you would offer to a good friend",
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
