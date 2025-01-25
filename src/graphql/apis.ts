import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../generated/graphql';
import { API_URL } from '../../server/lib/consts';
  
const gqlClient = new GraphQLClient(API_URL);
  
export const {
  OnSubscriptionTest,
  createQueueMessageForRabbitMq,
  createUser,
  deleteUser,
  dogByName,
  getDogs,
  getTest,
  getUserWithRedis,
  getUsersWithPosts,
  publishTest,
  sendToSubscriptionTest,
  testMutation,
  updateUser,
  updateUserForOptimisticUpdate,
  userSubscription,
  zxTest
  } = getSdk(gqlClient);
  