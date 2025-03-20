
import React from 'react';
import { 
  JournalEntry, 
  ThemeData, 
  BeliefData, 
  CognitiveDistortion, 
  Recommendation 
} from '../types';
import { getColorForEmotion } from './colorUtils';

// Function to analyze journal entries using OpenAI
export async function analyzeJournalEntry(entry: JournalEntry, apiKey?: string) {
  console.log('Analyzing journal entry:', entry);
  
  // Try to get API key from environment if not provided
  if (!apiKey) {
    apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  }
  
  // Create empty result objects with default values
  let recommendations: Recommendation[] = [];
  let keyThemes: ThemeData[] = [];
  let extractedBeliefs: BeliefData[] = [];
  let extractedDistortions: CognitiveDistortion[] = [];
  
  // If no API key is provided, use the simplified analysis
  if (!apiKey) {
    console.log('No API key provided, using simplified analysis');
    return useSimplifiedAnalysis(entry);
  }
  
  try {
    // Prepare the entry content for analysis
    const entryContent = `
      Feelings: ${entry.feelings}
      Thoughts: ${entry.thoughtProcess}
      Gratitude: ${entry.gratitude}
    `;
    
    // Create the API request to OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a mental health analysis assistant. Analyze the journal entry and extract:
            1. Key emotional themes (up to 7) with their intensity scores between 1-10
            2. 2-3 core beliefs expressed in the entry with confidence scores (0.0-1.0) and whether they're positive
            3. Any cognitive distortions present with frequency scores (1-5)
            4. 3-4 tailored recommendations based on the content
            
            Format your response as JSON with these exact keys:
            {
              "themes": [{"theme": "string", "count": number, "color": "string"}],
              "beliefs": [{"belief": "string", "confidence": number, "isPositive": boolean}],
              "distortions": [{"type": "string", "description": "string", "frequency": number, "example": "string"}],
              "recommendations": [{"title": "string", "description": "string", "type": "short-term" or "long-term"}]
            }`
          },
          {
            role: 'user',
            content: entryContent
          }
        ]
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }
    
    const data = await response.json();
    const analysisResult = JSON.parse(data.choices[0].message.content);
    
    // Process the themes and add colors
    keyThemes = analysisResult.themes.map((theme: any) => ({
      theme: theme.theme,
      count: theme.count,
      color: getColorForEmotion(theme.theme)
    }));
    
    // Process beliefs
    extractedBeliefs = analysisResult.beliefs;
    
    // Process distortions
    extractedDistortions = analysisResult.distortions;
    
    // Process recommendations
    recommendations = analysisResult.recommendations.map((rec: any) => ({
      ...rec,
      icon: React.createElement("div", { className: "h-4 w-4 text-harmony-lavender" })
    }));
    
  } catch (error) {
    console.error('Error analyzing journal entry with OpenAI:', error);
    // Fallback to simplified analysis if API fails
    return useSimplifiedAnalysis(entry);
  }
  
  return {
    recommendations,
    keyThemes,
    extractedBeliefs,
    extractedDistortions
  };
}

// Simplified analysis function for fallback
function useSimplifiedAnalysis(entry: JournalEntry) {
  // Real analysis based on entry content
  const allText = `${entry.feelings} ${entry.thoughtProcess} ${entry.gratitude}`.toLowerCase();
  
  let recommendations: Recommendation[] = [];
  let keyThemes: ThemeData[] = [];
  let extractedBeliefs: BeliefData[] = [];
  let extractedDistortions: CognitiveDistortion[] = [];
  
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
      if (allText) {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        const matches = allText.match(regex);
        if (matches) {
          count += matches.length;
        }
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
  if (allText && allText.includes('stress') || (allText && allText.includes('anxious')) || (allText && allText.includes('worry'))) {
    recommendations.push({
      title: 'Practice mindfulness',
      description: `Your entry shows feelings of ${keyThemes.find(t => ['Stress', 'Anxious', 'Worry'].includes(t.theme))?.theme.toLowerCase() || 'stress'}. Try a 5-minute breathing exercise.`,
      icon: React.createElement("div", { className: "h-4 w-4 text-harmony-lavender" }),
      type: 'short-term'
    });
  }
  
  if (allText && allText.includes('work') && ((allText && allText.includes('stress')) || (allText && allText.includes('overwhelm')))) {
    recommendations.push({
      title: 'Work-life balance',
      description: 'You mentioned stress about work outcomes. Try setting clear boundaries between work and personal time.',
      icon: React.createElement("div", { className: "h-4 w-4 text-harmony-blue" }),
      type: 'short-term'
    });
  }
  
  if (allText && (allText.includes('friend') || allText.includes('social') || allText.includes('connection'))) {
    recommendations.push({
      title: 'Nurture social connections',
      description: 'Your entry references relationships. Schedule time to connect with a friend or family member.',
      icon: React.createElement("div", { className: "h-4 w-4 text-harmony-blue" }),
      type: 'short-term'
    });
  }
  
  // Add default recommendations if none created
  if (recommendations.length === 0) {
    recommendations.push({
      title: 'Continue journaling',
      description: 'Regular journaling helps build self-awareness around your emotional patterns.',
      icon: React.createElement("div", { className: "h-4 w-4 text-harmony-mint" }),
      type: 'short-term'
    });
  }

  // Add at least one long-term recommendation
  recommendations.push({
    title: 'Develop self-reflection practice',
    description: 'Continue your journaling to build self-awareness around your emotional patterns.',
    icon: React.createElement("div", { className: "h-4 w-4 text-harmony-peach" }),
    type: 'long-term'
  });
  
  // Extract beliefs from latest entry
  if (allText && allText.includes('skill') && allText.includes('learn')) {
    extractedBeliefs.push({
      belief: 'I am capable of learning new skills',
      confidence: 0.75,
      isPositive: true
    });
  }
  
  if (allText && allText.includes('work') && allText.includes('stress')) {
    extractedBeliefs.push({
      belief: 'Work outcomes should be perfect',
      confidence: 0.65,
      isPositive: false
    });
  }

  // Default beliefs if none detected
  if (extractedBeliefs.length === 0) {
    extractedBeliefs.push({
      belief: 'I can grow through journaling',
      confidence: 0.70,
      isPositive: true
    });
  }

  // Create cognitive distortions based on entry text
  if (allText && allText.includes('expect') && ((allText && allText.includes('stress')) || (allText && allText.includes('worry')))) {
    extractedDistortions.push({
      type: 'Fortune telling',
      description: 'Predicting negative outcomes without sufficient evidence',
      frequency: 2,
      example: 'Expecting things will go poorly before they happen'
    });
  }

  return {
    recommendations,
    keyThemes: limitedThemes, // Return the limited themes
    extractedBeliefs,
    extractedDistortions
  };
}
