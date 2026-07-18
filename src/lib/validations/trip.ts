import { z } from 'zod'

export const TRIP_INTERESTS = [
  'Adventure',
  'Relaxation',
  'Culture & History',
  'Food & Cuisine',
  'Nature & Outdoors',
  'Nightlife',
] as const

export const CURRENCIES = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD'] as const

export const tripFormSchema = z
  .object({
    title: z.string().min(3, 'Title must be at least 3 characters').max(80, 'Title must be under 80 characters'),
    destination: z.string().min(2, 'Destination is required'),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    travelers: z.coerce.number().int('Must be a whole number').min(1, 'At least 1 traveler is required').max(50, 'Max 50 travelers'),
    budget: z.coerce.number().min(0, 'Budget cannot be negative'),
    currency: z.enum(CURRENCIES),
    interests: z.array(z.enum(TRIP_INTERESTS)).min(1, 'Select at least one interest'),
  })
  .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: 'End date must be on or after the start date',
    path: ['endDate'],
  })

export type TripFormValues = z.infer<typeof tripFormSchema>