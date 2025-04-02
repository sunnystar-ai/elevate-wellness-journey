import { supabase } from "@/integrations/supabase/client";
import { JournalEntry } from "@/components/dashboard/mental-health-report/types";

// Journal Entries
export const saveJournalEntry = async (entry: JournalEntry) => {
  const user = supabase.auth.getUser();
  const userId = (await user).data.user?.id;
  
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from('journal_entries')
    .insert({
      user_id: userId,
      feelings: entry.feelings,
      thought_process: entry.thoughtProcess,
      gratitude: entry.gratitude
    })
    .select();

  if (error) {
    console.error("Error saving journal entry:", error);
    throw error;
  }

  return data;
};

export const getJournalEntries = async (period: 'day' | 'week' | 'month' | 'year' = 'month') => {
  const user = supabase.auth.getUser();
  const userId = (await user).data.user?.id;
  
  if (!userId) {
    throw new Error("User not authenticated");
  }

  let dateFilter = new Date();
  
  switch (period) {
    case 'day':
      dateFilter = new Date(dateFilter.setDate(dateFilter.getDate() - 1));
      break;
    case 'week':
      dateFilter = new Date(dateFilter.setDate(dateFilter.getDate() - 7));
      break;
    case 'month':
      dateFilter = new Date(dateFilter.setMonth(dateFilter.getMonth() - 1));
      break;
    case 'year':
      dateFilter = new Date(dateFilter.setFullYear(dateFilter.getFullYear() - 1));
      break;
  }

  const { data, error } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('user_id', userId)
    .gte('created_at', dateFilter.toISOString())
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching journal entries:", error);
    throw error;
  }

  return data || [];
};

// Daily Activities
export const saveDailyActivity = async (activity: {
  activity_name: string;
  duration: number;
  duration_unit: string;
  completed: boolean;
  activity_date?: string;
}) => {
  const user = supabase.auth.getUser();
  const userId = (await user).data.user?.id;
  
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from('daily_activities')
    .insert({
      user_id: userId,
      activity_name: activity.activity_name,
      duration: activity.duration,
      duration_unit: activity.duration_unit,
      completed: activity.completed,
      activity_date: activity.activity_date || new Date().toISOString()
    })
    .select();

  if (error) {
    console.error("Error saving daily activity:", error);
    throw error;
  }

  return data;
};

export const getDailyActivities = async (period: 'day' | 'week' | 'month' | 'year' = 'month') => {
  const user = supabase.auth.getUser();
  const userId = (await user).data.user?.id;
  
  if (!userId) {
    throw new Error("User not authenticated");
  }

  let dateFilter = new Date();
  
  switch (period) {
    case 'day':
      dateFilter = new Date(dateFilter.setDate(dateFilter.getDate() - 1));
      break;
    case 'week':
      dateFilter = new Date(dateFilter.setDate(dateFilter.getDate() - 7));
      break;
    case 'month':
      dateFilter = new Date(dateFilter.setMonth(dateFilter.getMonth() - 1));
      break;
    case 'year':
      dateFilter = new Date(dateFilter.setFullYear(dateFilter.getFullYear() - 1));
      break;
  }

  const { data, error } = await supabase
    .from('daily_activities')
    .select('*')
    .eq('user_id', userId)
    .gte('activity_date', dateFilter.toISOString().split('T')[0])
    .order('activity_date', { ascending: false });

  if (error) {
    console.error("Error fetching daily activities:", error);
    throw error;
  }

  return data || [];
};

// Wellness Scores
export const saveWellnessScore = async (score: {
  mental_score: number;
  physical_score?: number;
  sleep_score?: number;
  nutrition_score?: number;
  score_date?: string;
}) => {
  const user = supabase.auth.getUser();
  const userId = (await user).data.user?.id;
  
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from('wellness_scores')
    .insert({
      user_id: userId,
      mental_score: score.mental_score,
      physical_score: score.physical_score,
      sleep_score: score.sleep_score,
      nutrition_score: score.nutrition_score,
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
  const user = supabase.auth.getUser();
  const userId = (await user).data.user?.id;
  
  if (!userId) {
    throw new Error("User not authenticated");
  }

  let dateFilter = new Date();
  
  switch (period) {
    case 'day':
      dateFilter = new Date(dateFilter.setDate(dateFilter.getDate() - 1));
      break;
    case 'week':
      dateFilter = new Date(dateFilter.setDate(dateFilter.getDate() - 7));
      break;
    case 'month':
      dateFilter = new Date(dateFilter.setMonth(dateFilter.getMonth() - 1));
      break;
    case 'year':
      dateFilter = new Date(dateFilter.setFullYear(dateFilter.getFullYear() - 1));
      break;
  }

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

// Wellness Insights
export const generateAndSaveWellnessInsight = async (
  period: 'day' | 'week' | 'month' | 'year',
  analyticalFramework: string = 'physical-emotional'
) => {
  const user = supabase.auth.getUser();
  const userId = (await user).data.user?.id;
  
  if (!userId) {
    throw new Error("User not authenticated");
  }

  // Get data needed for analysis
  const journalEntries = await getJournalEntries(period);
  const activities = await getDailyActivities(period);
  const wellnessScores = await getWellnessScores(period);

  if (journalEntries.length === 0 && activities.length === 0 && wellnessScores.length === 0) {
    throw new Error("Not enough data to generate insights");
  }

  // Calculate date range for the insight
  const endDate = new Date();
  let startDate = new Date();
  
  switch (period) {
    case 'day':
      startDate = new Date(startDate.setHours(0, 0, 0, 0));
      break;
    case 'week':
      startDate = new Date(startDate.setDate(startDate.getDate() - 7));
      break;
    case 'month':
      startDate = new Date(startDate.setMonth(startDate.getMonth() - 1));
      break;
    case 'year':
      startDate = new Date(startDate.setFullYear(startDate.getFullYear() - 1));
      break;
  }

  // Call the edge function to generate insight
  const response = await supabase.functions.invoke('generate-wellness-insight', {
    body: {
      journalEntries,
      activities,
      wellnessScores,
      period,
      analyticalFramework
    }
  });

  if (response.error) {
    console.error("Error generating wellness insight:", response.error);
    throw new Error(response.error.message);
  }

  const insightText = response.data.insight;
  const framework = response.data.framework || analyticalFramework;

  // Save the generated insight to the database
  const { data, error } = await supabase
    .from('wellness_insights')
    .insert({
      user_id: userId,
      insight_text: insightText,
      analysis_period: period,
      analytical_framework: framework,
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0]
    })
    .select();

  if (error) {
    console.error("Error saving wellness insight:", error);
    throw error;
  }

  return data?.[0];
};

export const getLatestWellnessInsight = async (
  period: 'day' | 'week' | 'month' | 'year' = 'month',
  analyticalFramework: string = 'physical-emotional'
) => {
  const user = supabase.auth.getUser();
  const userId = (await user).data.user?.id;
  
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from('wellness_insights')
    .select('*')
    .eq('user_id', userId)
    .eq('analysis_period', period)
    .eq('analytical_framework', analyticalFramework)
    .order('created_at', { ascending: false })
    .limit(1);

  if (error) {
    console.error("Error fetching wellness insight:", error);
    throw error;
  }

  return data?.[0] || null;
};
