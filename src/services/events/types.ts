
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

export type EventInput = Omit<Event, 'id' | 'host_id' | 'created_at'>;
