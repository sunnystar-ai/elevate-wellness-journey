
// Theme keywords mapping for basic theme extraction
const themeKeywords: Record<string, string[]> = {
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

/**
 * Extracts key themes from provided text
 * Returns an object with themes and their occurrence count
 */
export const extractThemes = (text: string): Record<string, number> => {
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
