
import { CognitiveDistortion, SentimentResult } from '../types';

/**
 * Generates cognitive distortion data based on sentiment analysis
 */
export const generateDistortions = (
  feelingsSentiment: SentimentResult,
  overallPositivity: number
): CognitiveDistortion[] => {
  return [
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
};
