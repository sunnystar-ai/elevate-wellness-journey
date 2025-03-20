
import { 
  JournalEntry, 
  ThemeData, 
  BeliefData, 
  CognitiveDistortion, 
  Recommendation 
} from '../types';
import React from 'react';
import { getColorForEmotion } from './colorUtils';

// Function to analyze journal entries using OpenAI
export async function analyzeEntryWithAI(entry: JournalEntry, apiKey: string) {
  try {
    console.log('Analyzing entry with OpenAI:', entry);
    
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
            
            Format your response as JSON without any markdown formatting:
            {
              "themes": [{"theme": "string", "count": number}],
              "beliefs": [{"belief": "string", "confidence": number, "isPositive": boolean}],
              "distortions": [{"type": "string", "description": "string", "frequency": number, "example": "string"}],
              "recommendations": [{"title": "string", "description": "string", "type": "short-term" or "long-term"}]
            }`
          },
          {
            role: 'user',
            content: entryContent
          }
        ],
        temperature: 0.7 // Adding temperature for more consistent outputs
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    
    // Extract the content and parse it as JSON, handling potential markdown formatting
    let contentStr = data.choices[0].message.content.trim();
    
    // Enhanced markdown formatting removal
    // Remove any markdown code block formatting if present (with language identifier)
    if (contentStr.startsWith('```json')) {
      contentStr = contentStr.replace(/^```json\n/, '').replace(/\n```$/, '');
    } else if (contentStr.startsWith('```')) {
      contentStr = contentStr.replace(/^```\n/, '').replace(/\n```$/, '');
    }
    
    // Remove any remaining backticks
    contentStr = contentStr.replace(/^```|```$/g, '');
    
    console.log('Parsed content from OpenAI:', contentStr);
    
    // Use try-catch for safer JSON parsing
    let analysisResult;
    try {
      analysisResult = JSON.parse(contentStr);
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      throw new Error('Failed to parse OpenAI response. Please try again.');
    }
    
    // Validate the response has the expected structure
    if (!analysisResult.themes || !analysisResult.beliefs || 
        !analysisResult.distortions || !analysisResult.recommendations) {
      console.error('Invalid response structure:', analysisResult);
      throw new Error('OpenAI response is missing required fields');
    }
    
    // Process the themes and add colors
    const keyThemes = analysisResult.themes.map((theme: any) => ({
      theme: theme.theme,
      count: theme.count,
      color: getColorForEmotion(theme.theme)
    }));
    
    // Process beliefs
    const extractedBeliefs = analysisResult.beliefs;
    
    // Process distortions
    const extractedDistortions = analysisResult.distortions;
    
    // Process recommendations
    const recommendations = analysisResult.recommendations.map((rec: any) => ({
      ...rec,
      icon: React.createElement("div", { className: "h-4 w-4 text-harmony-lavender" })
    }));
    
    return {
      recommendations,
      keyThemes,
      extractedBeliefs,
      extractedDistortions
    };
  } catch (error) {
    console.error('Error analyzing journal entry with OpenAI:', error);
    // Return a more detailed error for debugging
    throw new Error(`OpenAI analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
