import { GraphQLClient } from 'graphql-request'
import { getSdk } from '../generated/graphql'
import { API_URL } from '../../server/lib/consts'

const gqlClient = new GraphQLClient(API_URL)

export const { 
  createQueueMessageForRabbitMq,
  createUser,
  deleteUser,
  dogByName,
  getDogs,
  getUsersWithPosts,
  getUserWithRedis,
  sendToSubscriptionTest,
  updateUser,
  updateUserForOptimisticUpdate,
  userSubscription,
  zxTest 
} = getSdk(gqlClient)
