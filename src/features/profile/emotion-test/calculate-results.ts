
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
    const answer = answers[question.id];
    const score = question.reverse ? 6 - answer : answer; // Reverse scoring if needed
    
    traitScores[question.trait as keyof typeof traitScores] += score;
    traitCounts[question.trait as keyof typeof traitCounts]++;
  });

  // Calculate averages and convert to percentages (1-5 scale to 0-100%)
  return {
    happiness: Math.round((traitScores.extraversion / (traitCounts.extraversion * 5)) * 100),
    empathy: Math.round((traitScores.agreeableness / (traitCounts.agreeableness * 5)) * 100),
    optimism: Math.round((traitScores.openness / (traitCounts.openness * 5)) * 100),
    calmness: Math.round((100 - (traitScores.neuroticism / (traitCounts.neuroticism * 5)) * 100)),
    stress: Math.round((traitScores.neuroticism / (traitCounts.neuroticism * 5)) * 100),
    resilience: Math.round((traitScores.conscientiousness / (traitCounts.conscientiousness * 5)) * 100)
  };
};
