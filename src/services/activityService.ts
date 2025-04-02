
import { getCurrentUserId, getDateFilterForPeriod, supabase } from "./base/baseService";

export interface ActivityInput {
  activity_name: string;
  duration: number;
  duration_unit: string;
  completed: boolean;
  activity_date?: string;
}

export const saveDailyActivity = async (activity: ActivityInput) => {
  const userId = await getCurrentUserId();

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
  const userId = await getCurrentUserId();
  const dateFilter = getDateFilterForPeriod(period);

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
