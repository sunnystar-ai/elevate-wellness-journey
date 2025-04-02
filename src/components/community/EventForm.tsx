
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { createEvent } from '@/services/events';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { eventFormSchema, EventFormValues } from './event-form/types';
import EventFormContent from './event-form/EventFormContent';

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
      host_name: user?.email?.split('@')[0] || '',
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

    const eventData = {
      title: data.title,
      description: data.description || null,
      event_date: formattedDate,
      event_time: data.event_time,
      event_type: data.event_type,
      timezone: data.timezone,
      host_name: data.host_name,
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
            <EventFormContent 
              form={form} 
              isSubmitting={form.formState.isSubmitting} 
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EventForm;
