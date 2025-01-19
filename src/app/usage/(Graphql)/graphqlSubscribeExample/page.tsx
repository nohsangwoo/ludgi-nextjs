'use client'

import { useSubscription } from '@apollo/client'
import { UserSubscriptionDocument } from '@/generated/graphql'

export default function SubscriptionExample() {
  useSubscription(UserSubscriptionDocument, {
    onData: ({ data }) => {
      if (data.data) {
        console.log('새로운 사용자:', data.data.userCreated)
      }
    }
  })

  return <div>실시간 사용자 생성 알림</div>
}