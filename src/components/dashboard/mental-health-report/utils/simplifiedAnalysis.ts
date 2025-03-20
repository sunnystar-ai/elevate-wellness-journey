
import { JournalEntry } from '../types';
import { getColorForEmotion } from './colorUtils';
import { extractSentiment } from './analysisUtils/sentimentExtractor';
import { extractThemes } from './analysisUtils/themeExtractor';
import { generateBeliefs } from './analysisUtils/beliefGenerator';
import { generateDistortions } from './analysisUtils/distortionGenerator';
import { generateRecommendations } from './analysisUtils/recommendationGenerator';

// Simplified analysis for when API is not available
export function useSimplifiedAnalysis(entry: JournalEntry) {
  console.log('Using simplified analysis for entry:', entry);
  
  // Extract basic sentiments from each section
  const feelingsSentiment = extractSentiment(entry.feelings);
  const thoughtsSentiment = extractSentiment(entry.thoughtProcess);
  const gratitudeSentiment = extractSentiment(entry.gratitude);
  
  // Calculate overall positivity
  const overallPositivity = (
    feelingsSentiment.positiveRatio + 
    thoughtsSentiment.positiveRatio + 
    gratitudeSentiment.positiveRatio
  ) / 3;
  
  // Extract themes from each section
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
  const extractedBeliefs = generateBeliefs(
    feelingsSentiment,
    thoughtsSentiment,
    gratitudeSentiment
  );
  
  // Generate cognitive distortions
  const extractedDistortions = generateDistortions(
    feelingsSentiment,
    overallPositivity
  );
  
  // Generate recommendations
  const recommendations = generateRecommendations(overallPositivity);
  
  return {
    recommendations,
    keyThemes,
    extractedBeliefs,
    extractedDistortions
  };
}
