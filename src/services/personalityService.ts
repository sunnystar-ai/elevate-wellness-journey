
import { supabase } from "@/integrations/supabase/client";
import { toast } from '@/hooks/use-toast';

// Save MBTI personality test results to Supabase
export const saveMbtiResults = async (mbtiType: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;
    
    if (!userId) {
      console.error("User not authenticated");
      toast({
        title: "Authentication Error",
        description: "You need to be logged in to save personality data.",
        variant: "destructive"
      });
      throw new Error("User not authenticated");
    }

    console.log(`Saving MBTI type ${mbtiType} for user ${userId}`);

    // Check if user already has results to update instead of create
    const { data: existingData } = await supabase
      .from('personality_results')
      .select('id')
      .eq('user_id', userId)
      .limit(1);

    let result;
    
    if (existingData && existingData.length > 0) {
      // Update existing record
      console.log("Updating existing MBTI record");
      const { data, error } = await supabase
        .from('personality_results')
        .update({
          mbti_type: mbtiType,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .select();

      if (error) {
        console.error("Error updating MBTI results:", error);
        throw error;
      }
      result = data;
    } else {
      // Insert new record
      console.log("Creating new MBTI record");
      const { data, error } = await supabase
        .from('personality_results')
        .insert({
          user_id: userId,
          mbti_type: mbtiType
        })
        .select();

      if (error) {
        console.error("Error inserting MBTI results:", error);
        throw error;
      }
      result = data;
    }

    console.log("MBTI results saved successfully:", result);
    return result;
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
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;
    
    if (!userId) {
      console.error("User not authenticated");
      toast({
        title: "Authentication Error",
        description: "You need to be logged in to save personality data.",
        variant: "destructive"
      });
      throw new Error("User not authenticated");
    }

    console.log(`Saving Big Five traits for user ${userId}:`, results);

    // Check if user already has results to update instead of create
    const { data: existingData } = await supabase
      .from('big_five_results')
      .select('id')
      .eq('user_id', userId)
      .limit(1);

    let result;
    
    if (existingData && existingData.length > 0) {
      // Update existing record
      console.log("Updating existing Big Five record");
      const { data, error } = await supabase
        .from('big_five_results')
        .update({
          ...results,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .select();

      if (error) {
        console.error("Error updating Big Five results:", error);
        throw error;
      }
      result = data;
    } else {
      // Insert new record
      console.log("Creating new Big Five record");
      const { data, error } = await supabase
        .from('big_five_results')
        .insert({
          user_id: userId,
          ...results
        })
        .select();

      if (error) {
        console.error("Error inserting Big Five results:", error);
        throw error;
      }
      result = data;
    }

    console.log("Big Five results saved successfully:", result);
    return result;
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
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;
    
    if (!userId) {
      console.log("User not authenticated, falling back to localStorage for MBTI");
      const localData = localStorage.getItem('mbtiType');
      return localData;
    }

    console.log(`Loading MBTI type for user ${userId}`);

    const { data, error } = await supabase
      .from('personality_results')
      .select('mbti_type')
      .eq('user_id', userId)
      .limit(1)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        console.log("No MBTI data found for user in database");
        return null;
      }
      throw error;
    }
    
    console.log("MBTI data retrieved:", data?.mbti_type);
    return data.mbti_type;
  } catch (error) {
    console.error("Error loading MBTI results from Supabase:", error);
    
    // Fall back to localStorage
    const localData = localStorage.getItem('mbtiType');
    console.log("Falling back to localStorage for MBTI:", localData);
    return localData;
  }
};

// Load Big Five results from Supabase or localStorage as fallback
export const loadBigFiveResults = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;
    
    if (!userId) {
      console.log("User not authenticated, falling back to localStorage for Big Five");
      const savedData = localStorage.getItem('emotionTendencies');
      return savedData ? JSON.parse(savedData) : null;
    }

    console.log(`Loading Big Five traits for user ${userId}`);

    const { data, error } = await supabase
      .from('big_five_results')
      .select('openness, conscientiousness, extraversion, agreeableness, neuroticism')
      .eq('user_id', userId)
      .limit(1)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        console.log("No Big Five data found for user in database");
        return null;
      }
      throw error;
    }
    
    console.log("Big Five data retrieved:", data);
    return data;
  } catch (error) {
    console.error("Error loading Big Five results from Supabase:", error);
    
    // Fall back to localStorage
    const savedData = localStorage.getItem('emotionTendencies');
    console.log("Falling back to localStorage for Big Five:", savedData ? JSON.parse(savedData) : null);
    return savedData ? JSON.parse(savedData) : null;
  }
};
