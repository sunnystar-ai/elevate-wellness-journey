
import { JournalEntry } from "@/components/dashboard/mental-health-report/types";
import { getCurrentUserId, getDateFilterForPeriod, supabase } from "./base/baseService";

export const saveJournalEntry = async (entry: JournalEntry) => {
  const userId = await getCurrentUserId();

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
  const userId = await getCurrentUserId();
  const dateFilter = getDateFilterForPeriod(period);

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
