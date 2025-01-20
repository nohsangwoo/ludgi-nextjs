import type { Context } from '../type'
import { expressRedisPubsub } from '../../lib/expressRedisPubsub'
import { UserSubscriptionPayload, UserSubscriptionSubscriptionVariables } from '../../generated/graphql'

export const USER_CREATED = 'USER_CREATED'

const resolvers = {
  Subscription: {
    userSubscription: {
      subscribe: (
        _parent: unknown,
        _args: UserSubscriptionSubscriptionVariables,
        context: Context,
      ): AsyncIterator<UserSubscriptionPayload> => {
        console.log('touch subscribe args: ', _args)
        return expressRedisPubsub.asyncIterator(USER_CREATED)
      },
      resolve: (payload: any): Promise<UserSubscriptionPayload> => {
        console.log('payload: ', payload)
        return payload.userSubscriptionPayload
      },
    },
  },
}

export default resolvers
