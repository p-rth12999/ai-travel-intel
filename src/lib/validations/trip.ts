import { z } from 'zod'

export const TRIP_INTERESTS = [
  'Budget Friendly',
  'Luxury',
  'Adventure',
  'Photography',
  'Hidden Gems',
  'Food Tour',
  'Nature',
  'Trekking',
  'Shopping',
  'Relaxation',
  'History',
  'Family Friendly',
] as const

export const TRANSPORT_MODES = ['Car', 'Bike', 'Train', 'Bus', 'Flight'] as const

export const FOOD_PREFERENCES = [
  'Vegetarian',
  'Vegan',
  'Jain',
  'Halal',
  'Kosher',
  'Eggetarian',
  'No Beef',
  'No Pork',
  'No Seafood',
  'Gluten-Free',
  'Lactose-Free',
] as const

export const ACCESSIBILITY_NEEDS = [
  'Senior Citizens',
  'Children',
  'Motion Sickness',
  'Wheelchair Accessibility',
] as const

export const CURRENCIES = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD'] as const

export const tripFormSchema = z
  .object({
    title: z.string().min(3, 'Title must be at least 3 characters').max(80, 'Title must be under 80 characters'),
    source: z.string().min(2, 'Starting location is required'),
    destinations: z.array(z.string().min(2)).min(1, 'At least one destination is required'),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    travelers: z.coerce.number().int('Must be a whole number').min(1, 'At least 1 traveler is required').max(50, 'Max 50 travelers'),
    budget: z.coerce.number().min(0, 'Budget cannot be negative'),
    currency: z.enum(CURRENCIES),
    transportMode: z.enum(TRANSPORT_MODES),
    interests: z.array(z.enum(TRIP_INTERESTS)).default([]),
    foodPreferences: z.array(z.enum(FOOD_PREFERENCES)).default([]),
    accessibilityNeeds: z.array(z.enum(ACCESSIBILITY_NEEDS)).default([]),
  })
  .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: 'End date must be on or after the start date',
    path: ['endDate'],
  })

export type TripFormValues = z.infer<typeof tripFormSchema>