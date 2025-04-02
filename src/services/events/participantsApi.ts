
import { supabase } from "@/integrations/supabase/client";
import { toast } from '@/hooks/use-toast';

// Get participant count for an event
export const getParticipantCount = async (eventId: string): Promise<number> => {
  try {
    const { count, error } = await supabase
      .from('event_participants')
      .select('*', { count: 'exact', head: true })
      .eq('event_id', eventId);

    if (error) {
      console.error('Error getting participant count:', error);
      return 0;
    }

    return count || 0;
  } catch (error) {
    console.error('Error in getParticipantCount:', error);
    return 0;
  }
};

// Get current user's participation status
export const getUserParticipationStatus = async (
  eventId: string, 
  userId: string | undefined
): Promise<'going' | 'interested' | null> => {
  if (!userId) return null;
  
  try {
    const { data: participation, error } = await supabase
      .from('event_participants')
      .select('status')
      .eq('event_id', eventId)
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error getting user participation status:', error);
      return null;
    }

    return (participation?.status as 'going' | 'interested') || null;
  } catch (error) {
    console.error('Error in getUserParticipationStatus:', error);
    return null;
  }
};

// Update participation status
export const updateParticipationStatus = async (
  eventId: string, 
  status: 'going' | 'interested'
): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to join events.",
        variant: "destructive"
      });
      return false;
    }

    // Check if user is already participating
    const { data: existingParticipation } = await supabase
      .from('event_participants')
      .select('id, status')
      .eq('event_id', eventId)
      .eq('user_id', user.id)
      .maybeSingle();

    let result;
    
    if (existingParticipation) {
      // Update existing participation
      if (existingParticipation.status === status) {
        // Remove participation if clicking the same status again (toggle off)
        result = await supabase
          .from('event_participants')
          .delete()
          .eq('id', existingParticipation.id);
      } else {
        // Change status
        result = await supabase
          .from('event_participants')
          .update({ status, updated_at: new Date().toISOString() })
          .eq('id', existingParticipation.id);
      }
    } else {
      // Create new participation
      result = await supabase
        .from('event_participants')
        .insert({
          event_id: eventId,
          user_id: user.id,
          status
        });
    }

    if (result.error) {
      throw result.error;
    }

    toast({
      title: "Participation updated",
      description: existingParticipation?.status === status 
        ? "You've been removed from this event" 
        : `You're now marked as ${status} for this event`,
    });

    return true;
  } catch (error) {
    console.error('Error updating participation:', error);
    toast({
      title: "Error updating participation",
      description: "There was a problem updating your status. Please try again.",
      variant: "destructive"
    });
    return false;
  }
};
