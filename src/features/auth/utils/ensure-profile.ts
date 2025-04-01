
import { supabase } from "@/integrations/supabase/client";

/**
 * Ensures that a user profile exists in the database
 * Will retry up to 3 times if profile creation fails
 */
export const ensureProfileExists = async (userId: string, user: any) => {
  try {
    // First check if profile exists
    const { data: existingProfile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .maybeSingle();
    
    // If no profile OR error is "no rows found", create profile
    if (!existingProfile || (profileError && profileError.message.includes('No rows found'))) {
      console.log("No profile found, creating one...");
      
      // Extract name parts from metadata if available
      const firstName = user.user_metadata?.first_name || '';
      const lastName = user.user_metadata?.last_name || '';
      
      // Retry logic for creating profile (attempt 3 times)
      let profileCreated = false;
      let attempts = 0;
      
      while (!profileCreated && attempts < 3) {
        attempts++;
        console.log(`Creating profile attempt ${attempts}`);
        
        const { error: createError } = await supabase
          .from('profiles')
          .insert({
            id: userId,
            first_name: firstName,
            last_name: lastName
          });
        
        if (!createError) {
          console.log("Profile created successfully");
          profileCreated = true;
        } else {
          console.error(`Error creating profile (attempt ${attempts}):`, createError);
          // Wait a brief moment before retrying
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
    } else {
      console.log("Profile already exists:", existingProfile);
    }
  } catch (error) {
    console.error("Error in ensureProfileExists:", error);
  }
};
