
import { getCurrentUserId, supabase } from "./base/baseService";
import { getJournalEntries } from "./journalService";
import { getDailyActivities } from "./activityService";
import { getWellnessScores } from "./wellnessScoreService";

interface WellnessInsight {
  id?: string;
  user_id: string;
  insight_text: string;
  analysis_period: string;
  analytical_framework: string;
  start_date: string;
  end_date: string;
  created_at?: string;
}

export const generateAndSaveWellnessInsight = async (
  period: 'day' | 'week' | 'month' | 'year',
  analyticalFramework: string = 'physical-emotional'
): Promise<WellnessInsight | null> => {
  const userId = await getCurrentUserId();

  try {
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
      console.error("Error from edge function:", response.error);
      throw new Error(response.error.message || "Failed to generate insight from AI service");
    }

    if (!response.data) {
      console.error("No data returned from edge function");
      throw new Error("No data returned from insight generation service");
    }

    const insightText = response.data.insight;
    
    if (!insightText) {
      console.error("No insight text in response", response.data);
      throw new Error("Failed to generate insight text");
    }
    
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
      throw new Error(`Failed to save wellness insight: ${error.message}`);
    }

    return data?.[0] || null;
  } catch (error) {
    console.error("Error in generateAndSaveWellnessInsight:", error);
    
    // Re-throw the error with a more specific message
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Failed to generate wellness insight");
    }
  }
};

export const getLatestWellnessInsight = async (
  period: 'day' | 'week' | 'month' | 'year' = 'month',
  analyticalFramework: string = 'physical-emotional'
): Promise<WellnessInsight | null> => {
  try {
    const userId = await getCurrentUserId();

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
      throw new Error(`Failed to fetch wellness insight: ${error.message}`);
    }

    return data?.[0] || null;
  } catch (error) {
    console.error("Error in getLatestWellnessInsight:", error);
    
    // Re-throw the error with a more specific message
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Failed to fetch wellness insight");
    }
  }
};
