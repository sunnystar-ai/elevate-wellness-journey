
import { TraitDescription } from './emotion-tendencies-types';

export const traitDescriptions: Record<string, TraitDescription> = {
  openness: {
    title: "Openness",
    description: "Curious, imaginative, and appreciative of art/emotion. Creative, adventurous, open to abstract ideas.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10"
  },
  conscientiousness: {
    title: "Conscientiousness",
    description: "Self-disciplined, goal-oriented behavior, and impulse control. Organized, reliable, deliberate.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10"
  },
  extraversion: {
    title: "Extraversion",
    description: "Sociable, assertive, and tendency to experience positive emotions. Outgoing, energetic, excitement-seeking.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  agreeableness: {
    title: "Empathy/Agreeableness",
    description: "Empathetic, compassionate, and trusting of others. Cooperative, kind, conflict-averse.",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10"
  },
  neuroticism: {
    title: "Neuroticism",
    description: "Emotional stability vs. tendency toward negative emotions (anxiety, sadness). Worrying, mood swings, stress sensitivity.",
    color: "text-red-500",
    bgColor: "bg-red-500/10"
  }
};
