
import { getCurrentUserId, getDateFilterForPeriod, supabase } from "./base/baseService";

export interface WellnessScoreInput {
  mental_score: number;
  physical_score?: number;
  sleep_score?: number;
  score_date?: string;
}

export const saveWellnessScore = async (score: WellnessScoreInput) => {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from('wellness_scores')
    .insert({
      user_id: userId,
      mental_score: score.mental_score,
      physical_score: score.physical_score,
      sleep_score: score.sleep_score,
      score_date: score.score_date || new Date().toISOString().split('T')[0]
    })
    .select();

  if (error) {
    console.error("Error saving wellness score:", error);
    throw error;
  }

  return data;
};

export const getWellnessScores = async (period: 'day' | 'week' | 'month' | 'year' = 'month') => {
  const userId = await getCurrentUserId();
  const dateFilter = getDateFilterForPeriod(period);

  const { data, error } = await supabase
    .from('wellness_scores')
    .select('*')
    .eq('user_id', userId)
    .gte('score_date', dateFilter.toISOString().split('T')[0])
    .order('score_date', { ascending: false });

  if (error) {
    console.error("Error fetching wellness scores:", error);
    throw error;
  }

  return data || [];
};
