'use client'

import { useMutation } from '@tanstack/react-query'
import { ApolloError } from '@apollo/client'
import {
  SendToSubscriptionTestMutation,
  SendToSubscriptionTestMutationVariables,
} from '@/generated/graphql'
import { sendToSubscriptionTest } from '@/graphql/apis'

export default function SendToSubscriptionExample() {
  const { mutate, isPending } = useMutation<
    SendToSubscriptionTestMutation,
    ApolloError,
    SendToSubscriptionTestMutationVariables
  >({
    mutationFn: params => sendToSubscriptionTest(params),
    onSuccess: (data, variables, context) => {
      if (data.sendToSubscriptionTest.ok) {
        console.log('data: ', data)
        alert('성공적으로 생성되었습니다!')
      }
    },
    onError: error => {
      console.log('오류가 발생했습니다: ' + error.message)
    },
  })
  return (
    <div>
      <button onClick={() => mutate({})}>sendToSubscriptionTest</button>
    </div>
  )
}
