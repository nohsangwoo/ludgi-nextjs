'use client'

import { getTest } from '@/graphql/apis'
import { useQuery } from '@tanstack/react-query'

export default function GetTestExample() {
  const { data, isPending, error } = useQuery({
    queryKey: ['getTest'],
    queryFn: () =>
      getTest({
        id: 1,
      }),
  })

  console.log('isLoading: ', isPending)
  console.log('data:', data)

  return <div>GetTestExample</div>
}
