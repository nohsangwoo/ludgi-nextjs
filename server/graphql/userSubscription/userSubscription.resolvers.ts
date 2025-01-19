import type { Context } from '../type'

export const USER_CREATED = 'USER_CREATED'

const resolvers = {
  Subscription: {
    userSubscription: {
      subscribe: (_parent: unknown, _args: unknown, context: Context) => 
        context.pubsub.asyncIterator([USER_CREATED])
    }
  }
}

export default resolvers 