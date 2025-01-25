'use client'

import {
  TestMutationMutation,
  TestMutationMutationVariables,
} from '@/generated/graphql'
import { testMutation } from '@/graphql/apis'
import { ApolloError } from '@apollo/client'
import { useMutation } from '@tanstack/react-query'

export default function TestMutationExample() {
  const { mutate, isPending } = useMutation<
    TestMutationMutation,
    ApolloError,
    TestMutationMutationVariables
  >({
    mutationFn: params => testMutation(params),
    onSuccess(data, variables, context) {
      console.log(data)
    },
    onError(error, variables, context) {
      console.log(error)
    },
  })
  return (
    <div>
      <button
        className={`${isPending ? 'bg-gray-500' : 'bg-blue-500'}`}
        onClick={() =>
          mutate({
            id: 1,
            isActive: false,
            description: 'test desc',
            amount: 50000,
          })
        }
      >
        testMutationActivated
      </button>
    </div>
  )
}
