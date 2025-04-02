
import React from 'react';
import { CalendarIcon, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { UseFormReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';

import {
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
import { Button } from '@/components/ui/button';
import { EventFormValues } from './types';

export const TitleField = ({ form }: { form: UseFormReturn<EventFormValues> }) => (
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
);

export const DescriptionField = ({ form }: { form: UseFormReturn<EventFormValues> }) => (
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
);

export const DateField = ({ form }: { form: UseFormReturn<EventFormValues> }) => (
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
);

export const TimeField = ({ form }: { form: UseFormReturn<EventFormValues> }) => (
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
);

export const EventTypeField = ({ form }: { form: UseFormReturn<EventFormValues> }) => (
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
);

export const TimezoneField = ({ form }: { form: UseFormReturn<EventFormValues> }) => (
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
);

export const HostNameField = ({ form }: { form: UseFormReturn<EventFormValues> }) => (
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
);
