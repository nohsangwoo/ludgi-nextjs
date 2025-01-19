'use client'

import { getAllRickAndMortyCharacters } from '@/lib/client/simpleApisForExample'
import { useMutation } from '@tanstack/react-query'
import { CardListForRickAndMorty } from '../../components/CardListForRickAndMorty'

export default function UseMutationExample() {
  const { mutate, isPending, error, data } = useMutation({
    mutationFn: (page: number) => getAllRickAndMortyCharacters(page),
  })

  return (
    <div className="p-6 w-full max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Mutation Example
      </h1>

      <button
        onClick={() => mutate(1)}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
        disabled={isPending}
      >
        {isPending ? 'Loading...' : 'Get Characters'}
      </button>

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-500 rounded-lg">
          Error: {error.message}
        </div>
      )}

      {data && <CardListForRickAndMorty results={data?.results} />}
    </div>
  )
}
