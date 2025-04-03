
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { 
  TitleField, 
  DescriptionField, 
  DateField, 
  TimeField, 
  EventTypeField, 
  TimezoneField,
  HostNameField,
  ImageUrlField
} from './FormFields';
import { EventFormValues } from './types';
import { DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface EventFormContentProps {
  form: UseFormReturn<EventFormValues>;
  isSubmitting: boolean;
}

const EventFormContent: React.FC<EventFormContentProps> = ({ form, isSubmitting }) => {
  return (
    <>
      <TitleField form={form} />
      
      <DescriptionField form={form} />
      
      <ImageUrlField form={form} />
      
      <div className="flex flex-col sm:flex-row gap-4">
        <DateField form={form} />
        <TimeField form={form} />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <EventTypeField form={form} />
        <TimezoneField form={form} />
      </div>
      
      <HostNameField form={form} />
      
      <DialogFooter className="pt-4">
        <DialogClose asChild>
          <Button type="button" variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Event"}
        </Button>
      </DialogFooter>
    </>
  );
};

export default EventFormContent;
