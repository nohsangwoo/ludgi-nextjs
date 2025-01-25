import type { Context } from '../type'
import {
  PublishTestMutationVariables,
  PublishTestResult,
} from '../../generated/graphql'
import { expressRedisPubsub } from '../../lib/expressRedisPubsub'
export const ONSUBSCRIPTION_TEST = 'ONSUBSCRIPTION_TEST'

const resolvers = {
  Mutation: {
    publishTest: async (
      _parent: unknown,
      args: PublishTestMutationVariables,
      context: Context,
    ): Promise<PublishTestResult> => {
      // TODO: Implement your resolver logic

      expressRedisPubsub.publish(ONSUBSCRIPTION_TEST, {
        OnSubscriptionTestPayload: {
          id: 1,
          title: 'Sample Title',
          description: 'Sample Description',
        },
      })
      return {
        title: 'Sample Title',
        price: 1000.0,
        isAvailable: true,
      }
    },
  },
}

export default resolvers
