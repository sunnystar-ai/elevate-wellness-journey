
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CalendarIcon, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { createEvent, EventInput } from '@/services/events';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const eventFormSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }).max(100),
  description: z.string().optional(),
  event_date: z.date(),
  event_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { 
    message: 'Please enter a valid time (HH:MM)'
  }),
  event_type: z.enum(['workshop', 'live', 'exercise', 'social', 'other']),
  timezone: z.string().default('UTC'),
  host_name: z.string().min(2, { message: 'Host name is required' })
});

type EventFormValues = z.infer<typeof eventFormSchema>;

interface EventFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ open, onOpenChange, onSuccess }) => {
  const { isAuthenticated, user } = useAuth();
  
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: '',
      description: '',
      event_date: new Date(),
      event_time: '18:00',
      event_type: 'workshop',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      host_name: user?.displayName || '',
    }
  });

  const onSubmit = async (data: EventFormValues) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create events.",
        variant: "destructive"
      });
      return;
    }

    // Format date to ISO string (YYYY-MM-DD)
    const formattedDate = format(data.event_date, 'yyyy-MM-dd');

    const eventData: EventInput = {
      ...data,
      description: data.description || null,
      event_date: formattedDate,
    };

    const success = await createEvent(eventData);
    
    if (success) {
      form.reset();
      onOpenChange(false);
      if (onSuccess) onSuccess();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
          <DialogDescription>
            Fill out the form to create a new community event.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Meditation Session" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Join us for a relaxing meditation session..." 
                      {...field} 
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex flex-col sm:flex-row gap-4">
              <FormField
                control={form.control}
                name="event_date"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="event_time"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Time</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type="time"
                          placeholder="18:00"
                          {...field}
                        />
                      </FormControl>
                      <Clock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <FormField
                control={form.control}
                name="event_type"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Event Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an event type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="live">Live Session</SelectItem>
                        <SelectItem value="exercise">Exercise</SelectItem>
                        <SelectItem value="social">Social Gathering</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="timezone"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Timezone</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <MapPin className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="host_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Host Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Creating..." : "Create Event"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EventForm;
