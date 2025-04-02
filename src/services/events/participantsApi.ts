
import { supabase } from "@/integrations/supabase/client";
import { toast } from '@/hooks/use-toast';
import { EventParticipant } from './types';

// Get participant count for an event
export const getParticipantCount = async (eventId: string): Promise<number> => {
  try {
    const { count, error } = await supabase
      .from('event_participants')
      .select('*', { count: 'exact', head: true })
      .eq('event_id', eventId)
      .eq('status', 'going');

    if (error) {
      throw error;
    }

    return count || 0;
  } catch (error) {
    console.error('Error getting participant count:', error);
    return 0;
  }
};

// Get current user's participation status for an event
export const getUserParticipationStatus = async (eventId: string, userId?: string): Promise<'going' | 'interested' | null> => {
  if (!userId) return null;

  try {
    const { data, error } = await supabase
      .from('event_participants')
      .select('status')
      .eq('event_id', eventId)
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No records found, not participating
        return null;
      }
      throw error;
    }

    return data?.status as 'going' | 'interested' || null;
  } catch (error) {
    console.error('Error getting participation status:', error);
    return null;
  }
};

// Update user's participation status for an event
export const updateParticipationStatus = async (eventId: string, status: 'going' | 'interested'): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to participate in events.",
        variant: "destructive"
      });
      return false;
    }

    // Check if user already has a status for this event
    const { data } = await supabase
      .from('event_participants')
      .select('id, status')
      .eq('event_id', eventId)
      .eq('user_id', user.id)
      .maybeSingle();

    if (data) {
      // User already has a status, update it
      const { error } = await supabase
        .from('event_participants')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', data.id);

      if (error) throw error;
    } else {
      // User doesn't have a status yet, insert new record
      const { error } = await supabase
        .from('event_participants')
        .insert({
          event_id: eventId,
          user_id: user.id,
          status
        } as EventParticipant);

      if (error) throw error;
    }

    toast({
      title: status === 'going' ? "You're going!" : "You're interested!",
      description: `Your participation status has been updated.`,
    });

    return true;
  } catch (error) {
    console.error('Error updating participation status:', error);
    toast({
      title: "Error updating status",
      description: "There was a problem updating your participation status. Please try again.",
      variant: "destructive"
    });
    return false;
  }
};
