'use client'

import { getAllRickAndMortyCharacters } from '@/lib/client/simpleApisForExample'
import { useQuery } from '@tanstack/react-query'
import { CardListForRickAndMorty } from '../../components/CardListForRickAndMorty'

export default function UseQueryExample() {
  const { data, isPending, error } = useQuery({
    queryKey: ['characters', 'all', 1],
    queryFn: () => getAllRickAndMortyCharacters(1),
  })

  if (isPending)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    )

  if (error)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-red-500">Error: {error.message}</div>
      </div>
    )

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Rick and Morty Characters
      </h1>
      <CardListForRickAndMorty results={data?.results} />
    </div>
  )
}
