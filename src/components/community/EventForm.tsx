
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import EventFormContent from './event-form/EventFormContent';
import { useEventForm } from './event-form/useEventForm';

interface EventFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ open, onOpenChange, onSuccess }) => {
  const { form, isSubmitting, handleSubmit } = useEventForm(
    onSuccess, 
    () => onOpenChange(false)
  );

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
          <form onSubmit={handleSubmit} className="space-y-4">
            <EventFormContent 
              form={form} 
              isSubmitting={isSubmitting} 
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EventForm;
