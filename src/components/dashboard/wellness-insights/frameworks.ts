
import { Activity, Brain, Heart, MenuSquare, Zap } from 'lucide-react';
import { ReactElement } from 'react';

export interface AnalyticalFramework {
  id: string;
  name: string;
  description: string;
  icon: ReactElement;
}

export const frameworks: AnalyticalFramework[] = [
  {
    id: 'physical-emotional',
    name: 'Physical & Emotional',
    description: 'Insights on how your physical activities affect your emotional state and vice versa.',
    icon: <Heart className="h-5 w-5 text-white" />
  },
  {
    id: 'cognitive',
    name: 'Cognitive',
    description: 'Analysis of your thought patterns, concentration, and mental clarity.',
    icon: <Brain className="h-5 w-5 text-white" />
  },
  {
    id: 'behavioral',
    name: 'Behavioral',
    description: 'Patterns in your daily behaviors and how they relate to your wellness.',
    icon: <Activity className="h-5 w-5 text-white" />
  },
  {
    id: 'holistic',
    name: 'Holistic',
    description: 'Comprehensive view of your mental, physical, and social wellness.',
    icon: <Zap className="h-5 w-5 text-white" />
  },
  {
    id: 'journal',
    name: 'Journal',
    description: 'Analysis of your journal entries and self-reflection trends.',
    icon: <MenuSquare className="h-5 w-5 text-white" />
  }
];

export const getFrameworkById = (id: string): AnalyticalFramework => {
  return frameworks.find(framework => framework.id === id) || frameworks[0];
};

export const getFrameworkInfo = (id: string) => {
  const framework = getFrameworkById(id);
  return {
    icon: framework.icon,
    title: framework.name,
    description: framework.description
  };
};
