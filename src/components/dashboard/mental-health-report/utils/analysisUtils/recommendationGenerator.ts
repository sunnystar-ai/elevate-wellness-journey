
import { Recommendation } from '../types';
import React from 'react';

/**
 * Generates recommendations based on sentiment analysis
 */
export const generateRecommendations = (overallPositivity: number): Recommendation[] => {
  return [
    {
      title: "Practice Mindfulness",
      description: "Take 5 minutes today to breathe deeply and be present with your emotions",
      type: "short-term" as const,
      icon: React.createElement("div", { className: "h-4 w-4 text-harmony-lavender" })
    },
    {
      title: overallPositivity > 0.6 ? "Build on Positive Emotions" : "Address Challenging Feelings",
      description: overallPositivity > 0.6 
        ? "Journal about what's contributing to your positive state" 
        : "Identify one small action to improve your mood today",
      type: "short-term" as const,
      icon: React.createElement("div", { className: "h-4 w-4 text-harmony-lavender" })
    },
    {
      title: "Gratitude Practice",
      description: "Continue noting things you're grateful for each day to build resilience",
      type: "long-term" as const,
      icon: React.createElement("div", { className: "h-4 w-4 text-harmony-lavender" })
    },
    {
      title: "Self-Compassion",
      description: "Treat yourself with the same kindness you would offer to a good friend",
      type: "long-term" as const,
      icon: React.createElement("div", { className: "h-4 w-4 text-harmony-lavender" })
    }
  ];
};
