import { Brain, User, PenTool, Compass } from 'lucide-react';
import React from 'react';

// Define the MBTI dichotomies and questions
export const mbtiQuestions = [
  {
    id: 'energy',
    label: 'Energy Source',
    description: 'How you gain energy and interact with the world',
    options: [
      { value: 'I', label: 'I prefer quiet, reflective environments and need time alone to recharge.', icon: React.createElement(User, { className: "h-5 w-5 text-primary" }) },
      { value: 'E', label: 'I feel energized by social interaction and prefer being around people.', icon: React.createElement(User, { className: "h-5 w-5 text-primary" }) }
    ]
  },
  {
    id: 'information',
    label: 'Information Processing',
    description: 'How you perceive and gather information',
    options: [
      { value: 'S', label: 'I focus on concrete details and practical applications.', icon: React.createElement(Compass, { className: "h-5 w-5 text-primary" }) },
      { value: 'N', label: 'I focus on patterns, possibilities, and the bigger picture.', icon: React.createElement(Compass, { className: "h-5 w-5 text-primary" }) }
    ]
  },
  {
    id: 'decisions',
    label: 'Decision-Making',
    description: 'How you make decisions',
    options: [
      { value: 'T', label: 'I make decisions based on logic, analysis, and objective criteria.', icon: React.createElement(Brain, { className: "h-5 w-5 text-primary" }) },
      { value: 'F', label: 'I make decisions based on personal values and how they affect others.', icon: React.createElement(Brain, { className: "h-5 w-5 text-primary" }) }
    ]
  },
  {
    id: 'lifestyle',
    label: 'Lifestyle',
    description: 'How you organize your world',
    options: [
      { value: 'J', label: 'I prefer structure, planning, and resolving matters decisively.', icon: React.createElement(PenTool, { className: "h-5 w-5 text-primary" }) },
      { value: 'P', label: 'I prefer flexibility, spontaneity, and keeping options open.', icon: React.createElement(PenTool, { className: "h-5 w-5 text-primary" }) }
    ]
  }
];

// MBTI type descriptions
export const mbtiDescriptions: Record<string, string> = {
  'ISTJ': 'Responsible, thorough, and dependable. You value tradition and organization.',
  'ISFJ': 'Warm, considerate, and dedicated to helping others. You are loyal and practical.',
  'INFJ': 'Idealistic, organized, and insightful. You seek meaning and connection in ideas and relationships.',
  'INTJ': 'Strategic, logical, and innovative. You have a clear vision of possibilities and how to achieve them.',
  'ISTP': 'Practical problem-solver with a focus on efficiency. You enjoy understanding how things work.',
  'ISFP': 'Gentle, sensitive, and in tune with your surroundings. You value personal connection and authenticity.',
  'INFP': 'Idealistic, empathetic, and driven by personal values. You seek to understand people and help them fulfill their potential.',
  'INTP': 'Logical, original thinker. You enjoy theoretical and abstract concepts and seek to understand the world.',
  'ESTP': 'Energetic, action-oriented problem-solver. You are adaptable and focus on immediate results.',
  'ESFP': 'Enthusiastic, friendly, and spontaneous. You enjoy bringing others together and creating enjoyable experiences.',
  'ENFP': 'Enthusiastic, creative, and sociable. You see possibilities in everything and value meaningful connections.',
  'ENTP': 'Quick, ingenious, and stimulating. You enjoy new challenges and creative problem-solving.',
  'ESTJ': 'Efficient, logical, and dedicated to tradition. You value clarity and structure in all aspects of life.',
  'ESFJ': 'Warm-hearted, conscientious, and cooperative. You value harmony and are attentive to others\' needs.',
  'ENFJ': 'Charismatic, empathetic leader. You inspire others and are driven to help them develop and improve.',
  'ENTJ': 'Strategic, logical, and efficient leader. You have a clear vision of possibilities and mobilize others toward goals.'
};

// MBTI trait percentages based on the type
export const getPersonalityTraits = (mbtiType: string) => {
  const traits = {
    introversion: 50,  // I/E dimension
    intuition: 50,     // S/N dimension
    feeling: 50,       // T/F dimension
    judging: 50        // J/P dimension
  };
  
  if (!mbtiType) return traits;
  
  // Introversion/Extroversion (I/E scale)
  if (mbtiType.startsWith('I')) {
    traits.introversion = 85; // Introverted
  } else if (mbtiType.startsWith('E')) {
    traits.introversion = 25; // Extroverted (low on introversion scale)
  }
  
  // Intuition/Sensing (N/S scale)
  if (mbtiType.includes('N')) {
    traits.intuition = 85; // Intuitive
  } else if (mbtiType.includes('S')) {
    traits.intuition = 25; // Sensing (low on intuition scale)
  }
  
  // Feeling/Thinking (F/T scale)
  if (mbtiType.includes('F')) {
    traits.feeling = 85; // Feeling
  } else if (mbtiType.includes('T')) {
    traits.feeling = 25; // Thinking (low on feeling scale)
  }
  
  // Judging/Perceiving (J/P scale)
  if (mbtiType.endsWith('J')) {
    traits.judging = 85; // Judging
  } else if (mbtiType.endsWith('P')) {
    traits.judging = 25; // Perceiving (low on judging scale)
  }
  
  return traits;
};

export type FormValues = {
  energy: 'I' | 'E';
  information: 'S' | 'N';
  decisions: 'T' | 'F';
  lifestyle: 'J' | 'P';
};
