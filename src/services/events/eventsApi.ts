
import { supabase } from "@/integrations/supabase/client";
import { toast } from '@/hooks/use-toast';
import { Event, EventInput } from './types';

// Create a new event
export const createEvent = async (eventData: EventInput): Promise<boolean> => {
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

    // Insert the new event
    const { error } = await supabase
      .from('community_events')
      .insert({
        ...eventData,
        host_id: user.id
      } as any); // Using 'as any' temporarily until we update database types

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

// Fetch basic event data without participant info
export const fetchEvents = async (): Promise<Event[]> => {
  try {
    // Get all events
    const { data: events, error } = await supabase
      .from('community_events')
      .select('*')
      .order('event_date', { ascending: true });

    if (error) {
      throw error;
    }

    return events as unknown as Event[]; // Using a type assertion until we update database types
  } catch (error) {
    console.error('Error fetching events data:', error);
    throw error;
  }
};
