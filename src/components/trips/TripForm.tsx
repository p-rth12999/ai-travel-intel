'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  tripFormSchema,
  TripFormValues,
  TRIP_INTERESTS,
  CURRENCIES,
  TRANSPORT_MODES,
  FOOD_PREFERENCES,
  ACCESSIBILITY_NEEDS,
} from '@/lib/validations/trip'
import { createClient } from '@/lib/supabase/client'
import DestinationsInput from '@/components/trips/DestinationsInput'
import TagSelector from '@/components/trips/TagSelector'

type TagField = 'interests' | 'foodPreferences' | 'accessibilityNeeds'

export default function TripForm() {
  const router = useRouter()
  const supabase = createClient()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<z.input<typeof tripFormSchema>, unknown, z.output<typeof tripFormSchema>>({
    resolver: zodResolver(tripFormSchema),
    defaultValues: {
      title: '',
      source: '',
      destinations: [''],
      startDate: '',
      endDate: '',
      travelers: 1,
      budget: 0,
      currency: 'USD',
      transportMode: 'Car',
      interests: [],
      foodPreferences: [],
      accessibilityNeeds: [],
    },
  })

  function toggleTag(field: TagField, value: string) {
    const current = (watch(field) as string[]) || []
    if (current.includes(value)) {
      setValue(field, current.filter((v) => v !== value) as never, { shouldValidate: true })
    } else {
      setValue(field, [...current, value] as never, { shouldValidate: true })
    }
  }

  const onSubmit = async (data: TripFormValues) => {
    setSubmitError(null)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setSubmitError('You must be signed in to create a trip.')
      return
    }

    const { error } = await supabase.from('trips').insert({
      user_id: user.id,
      title: data.title,
      source: data.source,
      destinations: data.destinations,
      start_date: data.startDate,
      end_date: data.endDate,
      travelers: data.travelers,
      budget: data.budget,
      currency: data.currency,
      transport_mode: data.transportMode,
      interests: data.interests,
      food_preferences: data.foodPreferences,
      accessibility_needs: data.accessibilityNeeds,
      status: 'planning',
    })

    if (error) {
      setSubmitError(error.message)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {submitError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {submitError}
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Trip title</label>
        <input
          {...register('title')}
          type="text"
          placeholder="e.g. Summer in Japan"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Starting from</label>
        <input
          {...register('source')}
          type="text"
          placeholder="e.g. Pune, India"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
        {errors.source && <p className="mt-1 text-sm text-red-600">{errors.source.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Destinations</label>
        <DestinationsInput
  value={watch('destinations')}
  onChange={(destinations) => setValue('destinations', destinations)}
  error={errors.destinations?.message}
/>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Start date</label>
          <input
            {...register('startDate')}
            type="date"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
          {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">End date</label>
          <input
            {...register('endDate')}
            type="date"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
          {errors.endDate && <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Travelers</label>
          <input
            {...register('travelers')}
            type="number"
            min={1}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
          {errors.travelers && <p className="mt-1 text-sm text-red-600">{errors.travelers.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Budget</label>
          <input
            {...register('budget')}
            type="number"
            min={0}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
          {errors.budget && <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Currency</label>
          <select
            {...register('currency')}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Transport</label>
          <select
            {...register('transportMode')}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          >
            {TRANSPORT_MODES.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      <TagSelector
  selected={watch('interests') || []}
  options={TRIP_INTERESTS}
  label="Preferences (optional)"
  onToggle={(v) => toggleTag('interests', v)}
/>
<TagSelector
  selected={watch('foodPreferences') || []}
  options={FOOD_PREFERENCES}
  label="Food preferences (optional)"
  onToggle={(v) => toggleTag('foodPreferences', v)}
/>
<TagSelector
  selected={watch('accessibilityNeeds') || []}
  options={ACCESSIBILITY_NEEDS}
  label="Accessibility needs (optional)"
  onToggle={(v) => toggleTag('accessibilityNeeds', v)}
/>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-blue-600 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Creating...' : 'Create Trip'}
      </button>
    </form>
  )
}