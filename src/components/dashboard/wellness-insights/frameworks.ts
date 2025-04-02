
import { Activity, Brain, TrendingUp, RefreshCw } from 'lucide-react';
import { ReactElement } from 'react';

export type AnalyticalFramework = 'physical-emotional' | 'personality' | 'belief-mapping' | 'predictive';

export interface FrameworkInfo {
  title: string;
  description: string;
  icon: ReactElement;
}

export const getFrameworkIcon = (framework: AnalyticalFramework) => {
  switch (framework) {
    case 'physical-emotional':
      return <Activity className="h-5 w-5 text-harmony-mint mr-2" />;
    case 'personality':
      return <Brain className="h-5 w-5 text-harmony-lavender mr-2" />;
    case 'belief-mapping':
      return <TrendingUp className="h-5 w-5 text-harmony-peach mr-2" />;
    case 'predictive':
      return <RefreshCw className="h-5 w-5 text-harmony-blue mr-2" />;
    default:
      return <Activity className="h-5 w-5 text-harmony-mint mr-2" />;
  }
};

export const getFrameworkInfo = (framework: AnalyticalFramework): FrameworkInfo => {
  switch (framework) {
    case 'physical-emotional':
      return {
        title: 'Physical Activity & Emotional Well-being',
        description: 'Correlating your physical activities with emotional states from your journal entries to identify patterns and triggers.',
        icon: getFrameworkIcon(framework)
      };
    case 'personality':
      return {
        title: 'Personality-Driven Patterns',
        description: 'Analyzing how your personality traits (Big 5 and MBTI) influence your wellness patterns and response to activities.',
        icon: getFrameworkIcon(framework)
      };
    case 'belief-mapping':
      return {
        title: 'Core Beliefs & Journal Analysis',
        description: 'Extracting recurring themes and core beliefs from your journal entries to identify limiting beliefs and growth opportunities.',
        icon: getFrameworkIcon(framework)
      };
    case 'predictive':
      return {
        title: 'Using machine learning to forecast emotional trends and provide personalized, data-driven recommendations.',
        description: 'Using machine learning to forecast emotional trends and provide personalized, data-driven recommendations.',
        icon: getFrameworkIcon(framework)
      };
    default:
      return {
        title: 'Wellness Analysis',
        description: 'Analyzing your wellness data to provide personalized insights and recommendations.',
        icon: getFrameworkIcon('physical-emotional')
      };
  }
};
