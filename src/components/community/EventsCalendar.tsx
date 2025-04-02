
import { useState, useEffect } from 'react';
import { Calendar, ArrowRight, Users, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { getEvents, updateParticipationStatus, EventWithParticipants } from '@/services/events';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

const getEventIcon = (type: string) => {
  switch (type) {
    case 'workshop':
      return '🧠';
    case 'live':
      return '🎥';
    case 'exercise':
      return '🧘';
    default:
      return '📅';
  }
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const EventsCalendar = () => {
  const [events, setEvents] = useState<EventWithParticipants[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  const loadEvents = async () => {
    setIsLoading(true);
    const eventsData = await getEvents();
    setEvents(eventsData);
    setIsLoading(false);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleParticipationUpdate = async (eventId: string, status: 'going' | 'interested') => {
    const success = await updateParticipationStatus(eventId, status);
    if (success) {
      loadEvents(); // Reload events to update counts and status
    }
  };

  return (
    <div className="px-4">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-1">
          <h2 className="text-md font-semibold">Upcoming Events</h2>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 px-2 text-xs flex items-center">
            <Plus className="mr-1 h-3 w-3" />
            Create Event
          </Button>
          <Button variant="ghost" className="h-8 px-2 text-xs text-primary flex items-center">
            View All <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </div>

      <ScrollArea className="w-full">
        {isLoading ? (
          <div className="flex gap-3 pb-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="min-w-[240px] p-3 space-y-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-8 w-full" />
              </Card>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No upcoming events found.
          </div>
        ) : (
          <div className="flex gap-3 pb-4">
            {events.map((event) => (
              <Card key={event.id} className="min-w-[240px] p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                      {getEventIcon(event.event_type)}
                    </div>
                    <h3 className="text-sm font-medium line-clamp-1">{event.title}</h3>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  <div>Hosted by {event.host_name}</div>
                  <div className="flex justify-between mt-1">
                    <div>{formatDate(event.event_date)} • {event.event_time}</div>
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      {event.participants_count}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant={event.current_user_status === 'going' ? "default" : "outline"}
                    className="flex-1 text-xs"
                    onClick={() => handleParticipationUpdate(event.id, 'going')}
                    disabled={!isAuthenticated}
                  >
                    Going
                  </Button>
                  <Button 
                    size="sm" 
                    variant={event.current_user_status === 'interested' ? "secondary" : "outline"}
                    className="flex-1 text-xs"
                    onClick={() => handleParticipationUpdate(event.id, 'interested')}
                    disabled={!isAuthenticated}
                  >
                    Interested
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default EventsCalendar;
