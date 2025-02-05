import type { Context } from '../type'
import {
  SendToSubscriptionTestMutationVariables,
  SendToSubscriptionTestResult,
} from '../../generated/graphql'
import { expressRedisPubsub } from '../../lib/expressRedisPubsub'

const resolvers = {
  Mutation: {
    sendToSubscriptionTest: async (
      _parent: unknown,
      args: SendToSubscriptionTestMutationVariables,
      context: Context,
    ): Promise<SendToSubscriptionTestResult> => {
      console.log('touch send to subscription')

      // 구독자들에게 새 사용자 생성 알림
      expressRedisPubsub.publish('ONSUBSCRIPTION_TEST', {
        userSubscriptionPayload: {
          id: 1,
          email: 'test@test.com',
          name: 'Test User',
        },
      })
      // TODO: Implement your resolver logic
      return {
        ok: true,
        error: null,
        userSubscriptionPayload: {
          id: 1,
          email: 'test@test.com',
          name: 'Test User',
        },
      }
    },
  },
}

export default resolvers
