import type { Context } from '../type'
import { expressRedisPubsub } from '../../lib/expressRedisPubsub'

export const USER_CREATED = 'USER_CREATED'

const resolvers = {
  Subscription: {
    userSubscription: {
      subscribe: (_parent: unknown, _args: unknown, context: Context) => {
        return expressRedisPubsub.asyncIterator(USER_CREATED)
      },
      resolve: (payload: any) => {
        console.log('touch userSubscription 왔다~')
        console.log('payload: ', payload)
        return payload.userCreated
      },
    },
  },
}

export default resolvers
