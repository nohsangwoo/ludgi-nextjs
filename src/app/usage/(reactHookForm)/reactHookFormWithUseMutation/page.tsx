'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { getSingleRickAndMortyCharacter } from '@/lib/client/simpleApisForExample'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { CardForRickAndMorty } from '../../components/CardForRickAndMorty'

const schema = z.object({
  characterId: z.coerce.number().min(1, { message: 'Too short' }).max(20, {
    message: 'Too Big',
  }),
})

// schema로부터 타입 추론
type FormValues = z.infer<typeof schema>;

export default function ReactHookFormWithUseMutation() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const [characterId, setCharacterId] = useState('')

  const { mutate, isPending, error, data } = useMutation({
    mutationFn: () => getSingleRickAndMortyCharacter(characterId),
  })

  const onSubmit = (data: FormValues) => {
    if (data.characterId && !errors.characterId) {
      setCharacterId(String(data.characterId))
      mutate()
    }
  }

  return (
    <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        useQuery and React Hook Form
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Character ID
          </label>
          <input
            type="number"
            {...register('characterId')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Character ID"
          />
          {errors.characterId?.message && (
            <p className="text-sm text-red-500 mt-1">
              {String(errors.characterId.message)}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>

      {data && <CardForRickAndMorty character={data} />}
    </div>
  )
}
