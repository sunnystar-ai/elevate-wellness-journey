
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
