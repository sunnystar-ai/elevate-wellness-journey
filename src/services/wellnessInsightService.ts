
import { getCurrentUserId, supabase } from "./base/baseService";
import { getJournalEntries } from "./journalService";
import { getDailyActivities } from "./activityService";
import { getWellnessScores } from "./wellnessScoreService";
import { loadMbtiResults } from "./personalityService";
import { loadBigFiveResults } from "./personalityService";

export interface WellnessInsight {
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
    
    // Get personality data from Supabase
    let mbtiType = null;
    let bigFiveTraits = null;
    
    try {
      mbtiType = await loadMbtiResults();
      bigFiveTraits = await loadBigFiveResults();
      console.log("Loaded personality data for insight generation:", { mbtiType, bigFiveTraits });
    } catch (error) {
      console.warn("Could not load personality data:", error);
      // Continue without personality data
    }

    // For daily insights, check if we have data from today specifically
    if (period === 'day') {
      const today = new Date().toISOString().split('T')[0];
      
      const todayJournalEntries = journalEntries.filter(entry => {
        const entryDate = new Date(entry.created_at).toISOString().split('T')[0];
        return entryDate === today;
      });
      
      const todayActivities = activities.filter(activity => {
        const activityDate = new Date(activity.activity_date).toISOString().split('T')[0];
        return activityDate === today;
      });
      
      const todayScores = wellnessScores.filter(score => {
        const scoreDate = new Date(score.score_date).toISOString().split('T')[0];
        return scoreDate === today;
      });
      
      if (todayJournalEntries.length === 0 && todayActivities.length === 0 && todayScores.length === 0) {
        throw new Error("Not enough data to generate insights for today");
      }
    } else if (journalEntries.length === 0 && activities.length === 0 && wellnessScores.length === 0) {
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

    // Prepare personality data for the edge function
    const personalityData = {
      mbtiType: mbtiType || "Unknown",
      bigFiveTraits: bigFiveTraits || {
        openness: 50,
        conscientiousness: 50,
        extraversion: 50,
        agreeableness: 50,
        neuroticism: 50
      }
    };

    // Call the edge function to generate insight
    const response = await supabase.functions.invoke('generate-wellness-insight', {
      body: {
        journalEntries,
        activities,
        wellnessScores,
        period,
        analyticalFramework,
        personalityData
      }
    });

    if (response.error) {
      console.error("Error from edge function:", response.error);
      
      // Check for specific errors and provide more helpful messages
      if (response.error.message?.includes("OpenAI API key is not configured")) {
        throw new Error("AI service configuration is missing. Please contact support.");
      }
      
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

    // For daily insights, check for today's date specifically
    if (period === 'day') {
      const today = new Date().toISOString().split('T')[0];
      
      const { data: todayData, error: todayError } = await supabase
        .from('wellness_insights')
        .select('*')
        .eq('user_id', userId)
        .eq('analysis_period', period)
        .eq('analytical_framework', analyticalFramework)
        .gte('created_at', today)
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (todayError) {
        console.error("Error fetching today's wellness insight:", todayError);
        throw new Error(`Failed to fetch wellness insight: ${todayError.message}`);
      }
      
      if (todayData && todayData.length > 0) {
        return todayData[0];
      }
      
      // If we don't have an insight from today, return null for daily insights
      return null;
    }
    
    // For other periods, get the latest insight regardless of date
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
