
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
        temperature: 0.5 // Lower temperature for more consistent outputs
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
    
    // Comprehensive markdown and special character cleanup
    // Remove any markdown code block formatting if present
    if (contentStr.includes('```json')) {
      contentStr = contentStr.replace(/```json\n/g, '').replace(/\n```/g, '');
    } else if (contentStr.includes('```')) {
      contentStr = contentStr.replace(/```\n/g, '').replace(/\n```/g, '').replace(/```/g, '');
    }
    
    // Remove any remaining backticks and whitespace
    contentStr = contentStr.replace(/`/g, '').trim();
    
    console.log('Parsed content from OpenAI:', contentStr);
    
    // Use try-catch for safer JSON parsing
    let analysisResult;
    try {
      analysisResult = JSON.parse(contentStr);
    } catch (parseError) {
      console.error('JSON parsing error:', parseError, 'Content:', contentStr);
      
      // Try to extract just the JSON part if there's text before or after it
      if (contentStr.includes('{') && contentStr.includes('}')) {
        try {
          const jsonStart = contentStr.indexOf('{');
          const jsonEnd = contentStr.lastIndexOf('}') + 1;
          const jsonPart = contentStr.substring(jsonStart, jsonEnd);
          analysisResult = JSON.parse(jsonPart);
          console.log('Extracted JSON part successfully:', jsonPart);
        } catch (secondError) {
          console.error('Failed to extract JSON part:', secondError);
          throw new Error('Failed to parse OpenAI response. The API returned an invalid format.');
        }
      } else {
        throw new Error('Failed to parse OpenAI response. Please try again.');
      }
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
    
    // Process beliefs with validation
    const extractedBeliefs = analysisResult.beliefs.map((belief: any) => ({
      belief: belief.belief || "Belief not specified",
      confidence: typeof belief.confidence === 'number' ? belief.confidence : 0.5,
      isPositive: typeof belief.isPositive === 'boolean' ? belief.isPositive : true
    }));
    
    // Process distortions with validation
    const extractedDistortions = analysisResult.distortions.map((distortion: any) => ({
      type: distortion.type || "Unknown distortion",
      description: distortion.description || "No description provided",
      frequency: typeof distortion.frequency === 'number' ? distortion.frequency : 1,
      example: distortion.example || "No example provided"
    }));
    
    // Process recommendations with validation
    const recommendations = analysisResult.recommendations.map((rec: any) => ({
      title: rec.title || "Recommendation",
      description: rec.description || "No description provided",
      type: rec.type === 'long-term' ? 'long-term' : 'short-term',
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
