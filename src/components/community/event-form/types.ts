
import { z } from 'zod';

export const eventFormSchema = z.object({
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

export type EventFormValues = z.infer<typeof eventFormSchema>;
