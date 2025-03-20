
import { JournalEntry, CognitiveDistortion } from '../../types';
import { SentimentResult } from './types';

// Common cognitive distortions to check for
const distortionPatterns = [
  {
    type: 'All-or-Nothing Thinking',
    description: 'Seeing things in black and white categories without acknowledging shades of gray.',
    keywords: ['always', 'never', 'every', 'all', 'none', 'impossible', 'completely'],
    example: 'Using absolute terms like "always" or "never"'
  },
  {
    type: 'Overgeneralization',
    description: 'Drawing sweeping conclusions based on a single event.',
    keywords: ['nothing good ever', 'everything always', 'everyone', 'nobody', 'forever'],
    example: 'Generalizing from one specific situation to all situations'
  },
  {
    type: 'Mental Filter',
    description: 'Focusing on negatives while filtering out positives.',
    keywords: ['terrible', 'awful', 'horrible', 'disaster', 'worst'],
    example: 'Focusing exclusively on negative aspects'
  },
  {
    type: 'Disqualifying the Positive',
    description: 'Rejecting positive experiences by insisting they "don\'t count".',
    keywords: ['but', 'doesn\'t matter', 'doesn\'t count', 'still bad', 'yeah but'],
    example: 'Using "but" to invalidate positives'
  },
  {
    type: 'Jumping to Conclusions',
    description: 'Making negative interpretations without supporting facts.',
    keywords: ['probably thinks', 'must be thinking', 'know they', 'they must'],
    example: 'Mind reading or fortune telling without evidence'
  },
  {
    type: 'Magnification or Minimization',
    description: 'Exaggerating negatives or downplaying positives.',
    keywords: ['worst', 'terrible', 'unbearable', 'huge', 'tiny', 'just a little'],
    example: 'Exaggerating problems or diminishing accomplishments'
  },
  {
    type: 'Emotional Reasoning',
    description: 'Assuming feelings reflect reality: "I feel it, so it must be true."',
    keywords: ['feel like', 'feels like', 'because I feel'],
    example: 'Basing conclusions primarily on feelings'
  },
  {
    type: 'Should Statements',
    description: 'Using "should," "must," or "ought" statements that create unrealistic expectations.',
    keywords: ['should', 'must', 'have to', 'ought to', 'supposed to'],
    example: 'Using "should" or "must" statements'
  },
  {
    type: 'Labeling',
    description: 'Attaching negative labels to yourself or others instead of describing behavior.',
    keywords: ['I am a', 'they are', 'I\'m so', 'what a', 'loser', 'failure', 'stupid'],
    example: 'Using negative labels instead of describing specific behaviors'
  },
  {
    type: 'Personalization',
    description: 'Taking responsibility for external events outside your control.',
    keywords: ['my fault', 'because of me', 'blame', 'responsible for', 'caused'],
    example: 'Taking excessive responsibility for things outside your control'
  }
];

/**
 * Extracts cognitive distortions from journal entries based on text patterns
 * @param entry The journal entry to analyze
 * @param sentimentResult The sentiment analysis results
 * @returns Array of detected cognitive distortions
 */
export function extractDistortions(entry: JournalEntry, sentimentResult: SentimentResult): CognitiveDistortion[] {
  // Combine all text for analysis
  const { feelings, thoughtProcess, gratitude } = entry;
  const combinedText = `${feelings} ${thoughtProcess} ${gratitude}`.toLowerCase();
  
  const distortions: CognitiveDistortion[] = [];
  
  // Check each distortion pattern against the text
  distortionPatterns.forEach(pattern => {
    // Check if any keywords match in the text
    const hasMatch = pattern.keywords.some(keyword => 
      combinedText.includes(keyword.toLowerCase())
    );
    
    // Special case for mental filter based on sentiment
    const isMentalFilter = pattern.type === 'Mental Filter' && 
      sentimentResult.negative.length > sentimentResult.positive.length;
    
    if (hasMatch || isMentalFilter) {
      distortions.push({
        type: pattern.type,
        description: pattern.description,
        frequency: 1, // Basic frequency count, could be improved in future
        example: pattern.example
      });
    }
  });
  
  // Return found distortions, or a default if none found
  return distortions.length > 0 ? distortions : [
    {
      type: 'No Significant Distortions',
      description: 'No notable cognitive distortions were detected in this entry.',
      frequency: 0,
      example: 'Your journaling appears balanced in this entry'
    }
  ];
}
