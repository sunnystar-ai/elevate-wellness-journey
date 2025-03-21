
import { Question } from './types';

export const calculateResults = (
  questions: Question[], 
  answers: Record<number, number>
): Record<string, number> => {
  // Initialize trait scores
  const traitScores = {
    extraversion: 0,
    neuroticism: 0,
    agreeableness: 0,
    openness: 0,
    conscientiousness: 0
  };
  
  // Count questions per trait for averaging
  const traitCounts = {
    extraversion: 0,
    neuroticism: 0,
    agreeableness: 0,
    openness: 0,
    conscientiousness: 0
  };

  // Calculate scores
  questions.forEach(question => {
    if (answers[question.id]) {  // Only process if there's an answer
      const answer = answers[question.id];
      const score = question.reverse ? 6 - answer : answer; // Reverse scoring if needed
      
      traitScores[question.trait as keyof typeof traitScores] += score;
      traitCounts[question.trait as keyof typeof traitCounts]++;
    }
  });

  // Calculate percentages (1-5 scale to 0-100%)
  const calculatePercentage = (trait: keyof typeof traitScores) => {
    return traitCounts[trait] > 0 
      ? Math.round((traitScores[trait] / (traitCounts[trait] * 5)) * 100) 
      : 50;
  };

  return {
    openness: calculatePercentage('openness'),
    conscientiousness: calculatePercentage('conscientiousness'),
    extraversion: calculatePercentage('extraversion'),
    agreeableness: calculatePercentage('agreeableness'),
    neuroticism: calculatePercentage('neuroticism')
  };
};
