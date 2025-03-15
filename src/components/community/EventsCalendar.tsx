
import { Calendar, ArrowRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

const events = [
  {
    id: 1,
    title: 'Guided Meditation Workshop',
    host: 'Sarah Miller',
    date: 'Jul 15',
    time: '7:00 PM EDT',
    participants: 36,
    type: 'workshop',
    going: true
  },
  {
    id: 2,
    title: 'Nutrition Q&A Live Session',
    host: 'Dr. James Roberts',
    date: 'Jul 18',
    time: '12:00 PM EDT',
    participants: 124,
    type: 'live',
    going: false
  },
  {
    id: 3,
    title: 'Morning Yoga Flow',
    host: 'Elena Summers',
    date: 'Jul 20',
    time: '7:30 AM EDT',
    participants: 58,
    type: 'exercise',
    going: true
  }
];

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

const EventsCalendar = () => {
  return (
    <div className="px-4">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-1">
          <h2 className="text-md font-semibold">Upcoming Events</h2>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </div>
        <Button variant="ghost" className="h-8 px-2 text-xs text-primary flex items-center">
          View All <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </div>

      <ScrollArea className="w-full">
        <div className="flex gap-3 pb-4">
          {events.map((event) => (
            <Card key={event.id} className="min-w-[240px] p-3 space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                    {getEventIcon(event.type)}
                  </div>
                  <h3 className="text-sm font-medium line-clamp-1">{event.title}</h3>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground">
                <div>Hosted by {event.host}</div>
                <div className="flex justify-between mt-1">
                  <div>{event.date} • {event.time}</div>
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {event.participants}
                  </div>
                </div>
              </div>
              
              <Button 
                size="sm" 
                variant={event.going ? "default" : "outline"}
                className="w-full text-xs"
              >
                {event.going ? "Going" : "Interested"}
              </Button>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default EventsCalendar;
