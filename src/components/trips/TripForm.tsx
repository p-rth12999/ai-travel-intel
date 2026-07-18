'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { tripFormSchema, TripFormValues, TRIP_INTERESTS, CURRENCIES } from '@/lib/validations/trip'
import { createClient } from '@/lib/supabase/client'
import { z } from 'zod'

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
      destination: '',
      startDate: '',
      endDate: '',
      travelers: 1,
      budget: 0,
      currency: 'USD',
      interests: [],
    },
  })

  
  const selectedInterests = watch('interests')

  function toggleInterest(interest: (typeof TRIP_INTERESTS)[number]) {
    const current = selectedInterests || []
    if (current.includes(interest)) {
      setValue(
        'interests',
        current.filter((i) => i !== interest),
        { shouldValidate: true }
      )
    } else {
      setValue('interests', [...current, interest], { shouldValidate: true })
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
      destination: data.destination,
      start_date: data.startDate,
      end_date: data.endDate,
      travelers: data.travelers,
      budget: data.budget,
      currency: data.currency,
      interests: data.interests,
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
      {/* Title */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Trip title
        </label>
        <input
          {...register('title')}
          type="text"
          placeholder="e.g. Summer in Japan"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      {/* Destination */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Destination
        </label>
        <input
          {...register('destination')}
          type="text"
          placeholder="e.g. Tokyo & Kyoto, Japan"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
        {errors.destination && (
          <p className="mt-1 text-sm text-red-600">{errors.destination.message}</p>
        )}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Start date
          </label>
          <input
            {...register('startDate')}
            type="date"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
          {errors.startDate && (
            <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            End date
          </label>
          <input
            {...register('endDate')}
            type="date"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
          {errors.endDate && (
            <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
          )}
        </div>
      </div>

      {/* Travelers, Budget & Currency */}
        <div className="grid grid-cols-3 gap-4">
        <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
            Number of travelers
            </label>
            <input
            {...register('travelers')}
            type="number"
            min={1}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
            {errors.travelers && (
            <p className="mt-1 text-sm text-red-600">{errors.travelers.message}</p>
            )}
        </div>

        <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
            Budget
            </label>
            <input
            {...register('budget')}
            type="number"
            min={0}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
            {errors.budget && (
            <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>
            )}
        </div>

        <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
            Currency
            </label>
            <select
            {...register('currency')}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            >
            {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                {c}
                </option>
            ))}
            </select>
            {errors.currency && (
            <p className="mt-1 text-sm text-red-600">{errors.currency.message}</p>
            )}
        </div>
        </div>

      {/* Interests */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Trip type / interests
        </label>
        <div className="flex flex-wrap gap-2">
          {TRIP_INTERESTS.map((interest) => {
            const isSelected = selectedInterests?.includes(interest)
            return (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  isSelected
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-300 text-gray-700 hover:border-blue-400'
                }`}
              >
                {interest}
              </button>
            )
          })}
        </div>
        {errors.interests && (
          <p className="mt-1 text-sm text-red-600">{errors.interests.message}</p>
        )}
      </div>

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