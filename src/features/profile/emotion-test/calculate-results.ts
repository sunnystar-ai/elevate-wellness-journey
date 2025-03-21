
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
  // Handle potential division by zero
  const extraversion = traitCounts.extraversion > 0 
    ? Math.round((traitScores.extraversion / (traitCounts.extraversion * 5)) * 100) 
    : 50;
  
  const agreeableness = traitCounts.agreeableness > 0 
    ? Math.round((traitScores.agreeableness / (traitCounts.agreeableness * 5)) * 100) 
    : 50;
  
  const openness = traitCounts.openness > 0 
    ? Math.round((traitScores.openness / (traitCounts.openness * 5)) * 100) 
    : 50;
  
  const neuroticism = traitCounts.neuroticism > 0 
    ? Math.round((traitScores.neuroticism / (traitCounts.neuroticism * 5)) * 100) 
    : 50;
  
  const conscientiousness = traitCounts.conscientiousness > 0 
    ? Math.round((traitScores.conscientiousness / (traitCounts.conscientiousness * 5)) * 100) 
    : 50;

  // Return the Big Five traits directly
  return {
    openness,
    conscientiousness,
    extraversion,
    agreeableness,
    neuroticism
  };
};
