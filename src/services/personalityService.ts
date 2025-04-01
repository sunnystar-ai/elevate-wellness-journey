
import { supabase } from "@/integrations/supabase/client";

// Save MBTI personality test results to Supabase
export const saveMbtiResults = async (mbtiType: string) => {
  try {
    const user = supabase.auth.getUser();
    const userId = (await user).data.user?.id;
    
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Check if user already has results to update instead of create
    const { data: existingData } = await supabase
      .from('personality_results')
      .select('id')
      .eq('user_id', userId)
      .limit(1);

    if (existingData && existingData.length > 0) {
      // Update existing record
      const { data, error } = await supabase
        .from('personality_results')
        .update({
          mbti_type: mbtiType,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .select();

      if (error) throw error;
      return data;
    } else {
      // Insert new record
      const { data, error } = await supabase
        .from('personality_results')
        .insert({
          user_id: userId,
          mbti_type: mbtiType
        })
        .select();

      if (error) throw error;
      return data;
    }
  } catch (error) {
    console.error("Error saving MBTI results:", error);
    
    // Still save to localStorage as fallback
    localStorage.setItem('mbtiType', mbtiType);
    
    // Rethrow for handling by caller
    throw error;
  }
};

// Save Big Five personality test results to Supabase
export const saveBigFiveResults = async (results: {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}) => {
  try {
    const user = supabase.auth.getUser();
    const userId = (await user).data.user?.id;
    
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Check if user already has results to update instead of create
    const { data: existingData } = await supabase
      .from('big_five_results')
      .select('id')
      .eq('user_id', userId)
      .limit(1);

    if (existingData && existingData.length > 0) {
      // Update existing record
      const { data, error } = await supabase
        .from('big_five_results')
        .update({
          ...results,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .select();

      if (error) throw error;
      return data;
    } else {
      // Insert new record
      const { data, error } = await supabase
        .from('big_five_results')
        .insert({
          user_id: userId,
          ...results
        })
        .select();

      if (error) throw error;
      return data;
    }
  } catch (error) {
    console.error("Error saving Big Five results:", error);
    
    // Still save to localStorage as fallback
    localStorage.setItem('emotionTendencies', JSON.stringify(results));
    
    // Rethrow for handling by caller
    throw error;
  }
};

// Load MBTI results from Supabase or localStorage as fallback
export const loadMbtiResults = async () => {
  try {
    const user = supabase.auth.getUser();
    const userId = (await user).data.user?.id;
    
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from('personality_results')
      .select('mbti_type')
      .eq('user_id', userId)
      .limit(1)
      .single();

    if (error) throw error;
    
    return data.mbti_type;
  } catch (error) {
    console.error("Error loading MBTI results from Supabase:", error);
    
    // Fall back to localStorage
    return localStorage.getItem('mbtiType');
  }
};

// Load Big Five results from Supabase or localStorage as fallback
export const loadBigFiveResults = async () => {
  try {
    const user = supabase.auth.getUser();
    const userId = (await user).data.user?.id;
    
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from('big_five_results')
      .select('openness, conscientiousness, extraversion, agreeableness, neuroticism')
      .eq('user_id', userId)
      .limit(1)
      .single();

    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error("Error loading Big Five results from Supabase:", error);
    
    // Fall back to localStorage
    const savedData = localStorage.getItem('emotionTendencies');
    return savedData ? JSON.parse(savedData) : null;
  }
};
