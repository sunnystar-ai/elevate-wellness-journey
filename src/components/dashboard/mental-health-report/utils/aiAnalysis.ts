
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
      Feelings: ${entry.feelings || ''}
      Thoughts: ${entry.thoughtProcess || ''}
      Gratitude: ${entry.gratitude || ''}
    `;
    
    // Create the API request to OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // Use a more stable model
        messages: [
          {
            role: 'system',
            content: `You are a mental health analysis assistant. Analyze the journal entry and extract:
            1. Key emotional themes (up to 5) with their intensity scores between 1-10
            2. 2-3 core beliefs expressed in the entry with confidence scores (0.0-1.0) and whether they're positive
            3. Any cognitive distortions present with frequency scores (1-5)
            4. 3-4 tailored recommendations based on the content
            
            Respond ONLY with a valid JSON object of this structure, nothing else:
            {
              "themes": [{"theme": "string", "count": number}],
              "beliefs": [{"belief": "string", "confidence": number, "isPositive": boolean}],
              "distortions": [{"type": "string", "description": "string", "frequency": number, "example": "string"}],
              "recommendations": [{"title": "string", "description": "string", "type": "string"}]
            }`
          },
          {
            role: 'user',
            content: entryContent
          }
        ],
        temperature: 0.3 // Lower temperature for more consistent outputs
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid response structure from OpenAI:', data);
      throw new Error('Invalid response from OpenAI API');
    }
    
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
          throw new Error('Invalid JSON format received from API');
        }
      } else {
        throw new Error('Failed to parse OpenAI response');
      }
    }
    
    // Validate the response has the expected structure
    if (!analysisResult || typeof analysisResult !== 'object') {
      throw new Error('OpenAI returned an empty or invalid result');
    }
    
    // Ensure all required fields exist with defaults if missing
    const themes = Array.isArray(analysisResult.themes) ? analysisResult.themes : [];
    const beliefs = Array.isArray(analysisResult.beliefs) ? analysisResult.beliefs : [];
    const distortions = Array.isArray(analysisResult.distortions) ? analysisResult.distortions : [];
    const recommendations = Array.isArray(analysisResult.recommendations) ? analysisResult.recommendations : [];
    
    // Process the themes and add colors with additional validation
    const keyThemes = themes.map((theme: any) => ({
      theme: typeof theme.theme === 'string' ? theme.theme : 'Unknown theme',
      count: typeof theme.count === 'number' ? theme.count : 5,
      color: getColorForEmotion(typeof theme.theme === 'string' ? theme.theme : 'Unknown')
    }));
    
    // Process beliefs with validation
    const extractedBeliefs = beliefs.map((belief: any) => ({
      belief: typeof belief.belief === 'string' ? belief.belief : "Belief not specified",
      confidence: typeof belief.confidence === 'number' ? belief.confidence : 0.5,
      isPositive: typeof belief.isPositive === 'boolean' ? belief.isPositive : true
    }));
    
    // Process distortions with validation
    const extractedDistortions = distortions.map((distortion: any) => ({
      type: typeof distortion.type === 'string' ? distortion.type : "Unknown distortion",
      description: typeof distortion.description === 'string' ? distortion.description : "No description provided",
      frequency: typeof distortion.frequency === 'number' ? distortion.frequency : 1,
      example: typeof distortion.example === 'string' ? distortion.example : "No example provided"
    }));
    
    // Process recommendations with validation
    const processedRecommendations = recommendations.map((rec: any) => ({
      title: typeof rec.title === 'string' ? rec.title : "Recommendation",
      description: typeof rec.description === 'string' ? rec.description : "No description provided",
      type: rec.type === 'long-term' ? 'long-term' : 'short-term',
      icon: React.createElement("div", { className: "h-4 w-4 text-harmony-lavender" })
    }));
    
    // In case of empty arrays, add default items
    if (keyThemes.length === 0) {
      keyThemes.push({
        theme: 'Self-reflection', 
        count: 5, 
        color: getColorForEmotion('Self-reflection')
      });
    }
    
    if (extractedBeliefs.length === 0) {
      extractedBeliefs.push({
        belief: 'I can reflect on my thoughts and feelings',
        confidence: 0.8,
        isPositive: true
      });
    }
    
    if (extractedDistortions.length === 0) {
      extractedDistortions.push({
        type: 'All-or-Nothing Thinking',
        description: 'Seeing things in black and white categories',
        frequency: 3,
        example: 'Detected in your journal patterns'
      });
    }
    
    if (processedRecommendations.length === 0) {
      processedRecommendations.push({
        title: 'Practice Mindfulness',
        description: 'Take a few minutes each day to be present with your thoughts and feelings',
        type: 'short-term',
        icon: React.createElement("div", { className: "h-4 w-4 text-harmony-lavender" })
      });
    }
    
    return {
      recommendations: processedRecommendations,
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
