
import { useState } from 'react';
import { 
  SentimentData,
  ThemeData,
  BeliefData,
  CognitiveDistortion,
  Recommendation,
  TimeFrame
} from '../types';
import { 
  getDefaultThemeData, 
  getDefaultBeliefData, 
  getDefaultDistortions, 
  getDefaultRecommendations 
} from '../utils/defaultAnalysisData';

export const useAnalysisState = () => {
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<Recommendation[]>(getDefaultRecommendations());
  const [themeData, setThemeData] = useState<ThemeData[]>(getDefaultThemeData());
  const [beliefData, setBeliefData] = useState<BeliefData[]>(getDefaultBeliefData());
  const [cognitiveDistortions, setCognitiveDistortions] = useState<CognitiveDistortion[]>(getDefaultDistortions());
  const [sentimentData, setSentimentData] = useState<Record<TimeFrame, SentimentData[]>>({
    day: [],
    week: [],
    month: []
  });
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  return {
    loading,
    setLoading,
    recommendations,
    setRecommendations,
    themeData,
    setThemeData,
    beliefData,
    setBeliefData,
    cognitiveDistortions,
    setCognitiveDistortions,
    sentimentData,
    setSentimentData,
    analysisError,
    setAnalysisError
  };
};
