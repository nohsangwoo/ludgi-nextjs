'use client'

import { getTest } from '@/graphql/apis'
import { useQuery } from '@tanstack/react-query'

export default function FieldSelectionExample() {
  const { data, isPending, error } = useQuery({
    queryKey: ['getTest'],
    queryFn: () =>
      getTest({
        id: 1,
        description: 'test description',
      }),
  })

  console.log('data: ', data)
  return <div>FieldSelectionExample</div>
}
