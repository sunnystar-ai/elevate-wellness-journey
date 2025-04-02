
import { supabase } from "@/services/base/baseService";
import { toast } from '@/hooks/use-toast';

// Types for events
export interface Event {
  id: string;
  title: string;
  description: string | null;
  host_id: string;
  host_name: string;
  event_date: string;
  event_time: string;
  event_type: string;
  timezone: string;
  created_at: string;
}

export interface EventWithParticipants extends Event {
  participants_count: number;
  current_user_status: 'going' | 'interested' | null;
}

// Get all events
export const getEvents = async (): Promise<EventWithParticipants[]> => {
  try {
    // Get all events
    const { data: events, error } = await supabase
      .from('community_events')
      .select('*')
      .order('event_date', { ascending: true });

    if (error) {
      throw error;
    }

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;

    // Get participant counts for each event
    const eventsWithParticipants = await Promise.all(
      events.map(async (event) => {
        // Get total participant count
        const { count, error: countError } = await supabase
          .from('event_participants')
          .select('*', { count: 'exact', head: true })
          .eq('event_id', event.id);

        if (countError) {
          console.error('Error getting participant count:', countError);
        }

        // Get current user's status if logged in
        let userStatus = null;
        if (userId) {
          const { data: participation, error: participationError } = await supabase
            .from('event_participants')
            .select('status')
            .eq('event_id', event.id)
            .eq('user_id', userId)
            .maybeSingle();

          if (participationError) {
            console.error('Error getting user participation status:', participationError);
          }

          userStatus = participation?.status as 'going' | 'interested' | null;
        }

        return {
          ...event,
          participants_count: count || 0,
          current_user_status: userStatus
        } as EventWithParticipants;
      })
    );

    return eventsWithParticipants;
  } catch (error) {
    console.error('Error fetching events:', error);
    toast({
      title: "Error fetching events",
      description: "There was a problem loading the events. Please try again.",
      variant: "destructive"
    });
    return [];
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

// Create a new event
export const createEvent = async (eventData: Omit<Event, 'id' | 'host_id' | 'created_at'>): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create events.",
        variant: "destructive"
      });
      return false;
    }

    const { error } = await supabase
      .from('community_events')
      .insert({
        ...eventData,
        host_id: user.id
      });

    if (error) {
      throw error;
    }

    toast({
      title: "Event created",
      description: "Your event has been created successfully.",
    });

    return true;
  } catch (error) {
    console.error('Error creating event:', error);
    toast({
      title: "Error creating event",
      description: "There was a problem creating your event. Please try again.",
      variant: "destructive"
    });
    return false;
  }
};
