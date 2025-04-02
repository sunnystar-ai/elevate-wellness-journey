
import { supabase } from "@/integrations/supabase/client";

// Get current user ID helper function
export const getCurrentUserId = async (): Promise<string> => {
  const user = supabase.auth.getUser();
  const userId = (await user).data.user?.id;
  
  if (!userId) {
    throw new Error("User not authenticated");
  }
  
  return userId;
};

// Date filtering helper function
export const getDateFilterForPeriod = (period: 'day' | 'week' | 'month' | 'year'): Date => {
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
  
  return dateFilter;
};

export { supabase };
