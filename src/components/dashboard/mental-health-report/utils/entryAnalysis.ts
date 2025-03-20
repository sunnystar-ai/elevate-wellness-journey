
import React from 'react';
import { 
  JournalEntry, 
  ThemeData, 
  BeliefData, 
  CognitiveDistortion, 
  Recommendation 
} from '../types';
import { getColorForEmotion } from './colorUtils';

// Analyze journal entries and extract insights
export function analyzeJournalEntry(entry: JournalEntry) {
  console.log('Latest journal entry analyzed:', entry);
  
  // Create empty result objects
  const recommendations: Recommendation[] = [];
  const keyThemes: ThemeData[] = [];
  const extractedBeliefs: BeliefData[] = [];
  const extractedDistortions: CognitiveDistortion[] = [];
  
  // Real analysis based on entry content
  const allText = `${entry.feelings} ${entry.thoughtProcess} ${entry.gratitude}`.toLowerCase();
  
  // Extract meaningful words for theme analysis
  const wordCounts: Record<string, number> = {};
  const words = allText.split(/\s+/);
  words.forEach(word => {
    if (word.length > 3) { // Only count words with more than 3 characters
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    }
  });
  
  // Sort words by frequency
  const sortedWords = Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15) // Take top 15 words
    .map(([word]) => word);
  
  // Extract common emotions and themes
  const emotionMapping: Record<string, string[]> = {
    stress: ['stress', 'pressure', 'overwhelm', 'tension', 'anxiety'],
    anxious: ['anxious', 'nervous', 'worry', 'afraid', 'fear'],
    happy: ['happy', 'joy', 'enjoy', 'pleased', 'content', 'excitement'],
    sad: ['sad', 'down', 'upset', 'disappointed', 'unhappy'],
    grateful: ['grateful', 'thankful', 'appreciate', 'blessing', 'budget'],
    work: ['work', 'job', 'career', 'project', 'task', 'outcome'],
    learning: ['learn', 'skill', 'knowledge', 'understand', 'education'],
    technology: ['computer', 'technology', 'tech', 'digital', 'software'],
    relationships: ['friend', 'family', 'relationship', 'connection', 'social']
  };
  
  // Check for themes in the entry
  Object.entries(emotionMapping).forEach(([theme, relatedWords]) => {
    let count = 0;
    relatedWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = allText.match(regex);
      if (matches) {
        count += matches.length;
      }
    });
    
    if (count > 0) {
      keyThemes.push({
        theme: theme.charAt(0).toUpperCase() + theme.slice(1),
        count: count,
        color: getColorForEmotion(theme)
      });
    }
  });
  
  // Add any frequently occurring words that weren't mapped to emotions
  sortedWords.forEach(word => {
    // Check if word is already covered by a theme
    const isAlreadyThemed = keyThemes.some(theme => {
      const themeLower = theme.theme.toLowerCase();
      return emotionMapping[themeLower] && emotionMapping[themeLower].includes(word);
    });
    
    if (!isAlreadyThemed && wordCounts[word] > 1) {
      keyThemes.push({
        theme: word.charAt(0).toUpperCase() + word.slice(1),
        count: wordCounts[word],
        color: getColorForEmotion(word)
      });
    }
  });
  
  // Sort themes by count
  keyThemes.sort((a, b) => b.count - a.count);
  const limitedThemes = keyThemes.slice(0, 7); // Limit to top 7 themes
  
  // Create personalized recommendations
  if (allText.includes('stress') || allText.includes('anxious') || allText.includes('worry')) {
    recommendations.push({
      title: 'Practice mindfulness',
      description: `Your entry shows feelings of ${keyThemes.find(t => ['Stress', 'Anxious', 'Worry'].includes(t.theme))?.theme.toLowerCase() || 'stress'}. Try a 5-minute breathing exercise.`,
      icon: React.createElement("div", { className: "h-4 w-4 text-harmony-lavender" }),
      type: 'short-term'
    });
  }
  
  if (allText.includes('work') && (allText.includes('stress') || allText.includes('overwhelm'))) {
    recommendations.push({
      title: 'Work-life balance',
      description: 'You mentioned stress about work outcomes. Try setting clear boundaries between work and personal time.',
      icon: React.createElement("div", { className: "h-4 w-4 text-harmony-blue" }),
      type: 'short-term'
    });
  }
  
  if (allText.includes('friend') || allText.includes('social') || allText.includes('connection')) {
    recommendations.push({
      title: 'Nurture social connections',
      description: 'Your entry references relationships. Schedule time to connect with a friend or family member.',
      icon: React.createElement("div", { className: "h-4 w-4 text-harmony-blue" }),
      type: 'short-term'
    });
  }
  
  if (allText.includes('grateful') || allText.includes('thankful') || allText.includes('appreciation') || allText.includes('budget')) {
    recommendations.push({
      title: 'Daily gratitude practice',
      description: 'Continue expressing gratitude in your journal. Your entry shows appreciation for your resources.',
      icon: React.createElement("div", { className: "h-4 w-4 text-harmony-mint" }),
      type: 'short-term'
    });
  }

  if (allText.includes('learn') || allText.includes('skill') || allText.includes('new')) {
    recommendations.push({
      title: 'Skill development',
      description: 'Your entry mentions learning new skills. Consider setting specific learning goals for the week.',
      icon: React.createElement("div", { className: "h-4 w-4 text-harmony-lavender" }),
      type: 'long-term'
    });
  }

  // Add at least one long-term recommendation
  if (allText.includes('technology') || allText.includes('computer')) {
    recommendations.push({
      title: 'Technology balance',
      description: 'Work on establishing healthy boundaries with technology use.',
      icon: React.createElement("div", { className: "h-4 w-4 text-harmony-peach" }),
      type: 'long-term'
    });
  } else {
    recommendations.push({
      title: 'Develop self-reflection practice',
      description: 'Continue your journaling to build self-awareness around your emotional patterns.',
      icon: React.createElement("div", { className: "h-4 w-4 text-harmony-peach" }),
      type: 'long-term'
    });
  }
  
  // Extract beliefs from latest entry
  if (allText.includes('skill') && allText.includes('learn')) {
    extractedBeliefs.push({
      belief: 'I am capable of learning new skills',
      confidence: 0.75,
      isPositive: true
    });
  }
  
  if (allText.includes('work') && allText.includes('stress')) {
    extractedBeliefs.push({
      belief: 'Work outcomes should be perfect',
      confidence: 0.65,
      isPositive: false
    });
  }

  if (allText.includes('grateful') && allText.includes('budget')) {
    extractedBeliefs.push({
      belief: 'I have enough resources for my needs',
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

  // Create cognitive distortions based on entry text
  if (allText.includes('expect') && (allText.includes('stress') || allText.includes('worry'))) {
    extractedDistortions.push({
      type: 'Fortune telling',
      description: 'Predicting negative outcomes without sufficient evidence',
      frequency: 2,
      example: 'Expecting things will go poorly before they happen'
    });
  }

  if (allText.includes('many') && allText.includes('so')) {
    extractedDistortions.push({
      type: 'All-or-nothing thinking',
      description: 'Seeing things in black and white categories',
      frequency: 2,
      example: 'Viewing situations as either completely good or completely bad'
    });
  }

  return {
    recommendations,
    keyThemes: limitedThemes, // Return the limited themes
    extractedBeliefs,
    extractedDistortions
  };
}
