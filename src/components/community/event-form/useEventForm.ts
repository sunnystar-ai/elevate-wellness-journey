
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { createEvent } from '@/services/events';
import { eventFormSchema, EventFormValues } from './types';

export const useEventForm = (onSuccess?: () => void, onClose?: () => void) => {
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
      image_url: '',
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: EventFormValues) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create events.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
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
        image_url: data.image_url || null,
      };

      const success = await createEvent(eventData);
      
      if (success) {
        form.reset();
        if (onClose) onClose();
        if (onSuccess) onSuccess();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    handleSubmit: form.handleSubmit(handleSubmit),
  };
};
