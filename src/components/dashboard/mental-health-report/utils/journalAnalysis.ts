
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
    motivate: '#C3E6CB', // Mint green
    enjoy: '#C3E6CB', // Mint green
    learn: '#A7C7E7', // Light blue
    budget: '#D6C6E1', // Lavender
    computer: '#A7C7E7', // Light blue
    technology: '#A7C7E7', // Light blue
    skill: '#C3E6CB', // Mint green
    work: '#FFB347' // Orange
  };
  
  return colorMap[emotion.toLowerCase()] || '#A7C7E7'; // Default to light blue
}

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
    const isAlreadyThemed = keyThemes.some(theme => 
      emotionMapping[theme.theme.toLowerCase()].includes(word)
    );
    
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
  keyThemes.slice(0, 7); // Limit to top 7 themes
  
  // Create personalized recommendations based on journal content
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
    keyThemes,
    extractedBeliefs,
    extractedDistortions
  };
}

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

// Generate data for the time frames (day, week, month)
export function generateTimeFrameData(entry: JournalEntry, journalEntries: JournalEntry[] = []) {
  const { sentimentScore, gratitudeRatio } = generateSentimentScores(entry);
  
  // Calculate consistency based on actual journal entries
  const totalDays = 7; // Assuming we're tracking weekly consistency
  const consistencyScore = journalEntries.length > 0 ? Math.min(1.0, journalEntries.length / totalDays) : 0.14;
  
  // Generate sentiment data for day view
  const daySentiment: SentimentData[] = [{
    date: 'Today',
    sentimentScore: sentimentScore,
    gratitudeRatio: gratitudeRatio,
    consistencyScore: consistencyScore,
    overallScore: (sentimentScore + gratitudeRatio + consistencyScore) / 3
  }];
  
  // Generate week view
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
  const todayIndex = today === 0 ? 6 : today - 1; // Convert to 0 = Monday, 6 = Sunday
  
  const weekSentiment: SentimentData[] = Array(7).fill(0).map((_, i) => {
    if (i === todayIndex) {
      return {
        date: dayNames[i],
        sentimentScore: sentimentScore,
        gratitudeRatio: gratitudeRatio,
        consistencyScore: 1.0, // Today's entry exists
        overallScore: (sentimentScore + gratitudeRatio + 1.0) / 3
      };
    } else {
      // For other days, check if we have entries in our journalEntries array
      // This is a simplification - in a real app, you'd match dates properly
      const hasEntryForThisDay = journalEntries.length > (6 - i);
      return {
        date: dayNames[i],
        sentimentScore: hasEntryForThisDay ? 0.6 + Math.random() * 0.2 : 0,
        gratitudeRatio: hasEntryForThisDay ? 0.5 + Math.random() * 0.3 : 0,
        consistencyScore: hasEntryForThisDay ? 1 : 0,
        overallScore: hasEntryForThisDay ? (0.6 + Math.random() * 0.2 + 0.5 + Math.random() * 0.3 + 1) / 3 : 0
      };
    }
  });
  
  // Generate month view
  const monthSentiment: SentimentData[] = Array(4).fill(0).map((_, i) => {
    const isCurrentWeek = i === 3;
    
    // For current week, use actual data; for past weeks, simulate some data if we have entries
    const hasEntriesForThisWeek = journalEntries.length > (3 - i) * 2;
    
    return {
      date: `Week ${i+1}`,
      sentimentScore: isCurrentWeek ? sentimentScore : (hasEntriesForThisWeek ? 0.5 + Math.random() * 0.3 : 0),
      gratitudeRatio: isCurrentWeek ? gratitudeRatio : (hasEntriesForThisWeek ? 0.4 + Math.random() * 0.4 : 0),
      consistencyScore: isCurrentWeek ? consistencyScore : (hasEntriesForThisWeek ? 0.3 + Math.random() * 0.6 : 0),
      overallScore: isCurrentWeek ? (sentimentScore + gratitudeRatio + consistencyScore) / 3 : 
        (hasEntriesForThisWeek ? (0.5 + Math.random() * 0.3 + 0.4 + Math.random() * 0.4 + 0.3 + Math.random() * 0.6) / 3 : 0)
    };
  });

  return {
    day: daySentiment,
    week: weekSentiment,
    month: monthSentiment
  };
}
