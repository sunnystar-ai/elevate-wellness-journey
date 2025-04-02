
import { supabase } from "@/integrations/supabase/client";
import { toast } from '@/hooks/use-toast';
import { Event, EventWithParticipants } from './types';
import { fetchEvents } from './eventsApi';
import { getParticipantCount, getUserParticipationStatus } from './participantsApi';

// Get all events with participant info
export const getEvents = async (): Promise<EventWithParticipants[]> => {
  try {
    // Get all events
    const events = await fetchEvents();

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;

    // Get participant counts for each event
    const eventsWithParticipants = await Promise.all(
      events.map(async (event) => {
        // Get total participant count
        const count = await getParticipantCount(event.id);

        // Get current user's status if logged in
        const userStatus = await getUserParticipationStatus(event.id, userId);

        return {
          ...event,
          participants_count: count,
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

// Re-export all functions
export { updateParticipationStatus } from './participantsApi';
export { createEvent } from './eventsApi';
