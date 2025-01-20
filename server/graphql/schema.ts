
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { GraphQLSchema } from 'graphql'

import createQueueMessageForRabbitMqResolvers from './createQueueMessageForRabbitMq/createQueueMessageForRabbitMq.resolvers'
import createUserResolvers from './createUser/createUser.resolvers'
import deleteUserResolvers from './deleteUser/deleteUser.resolvers'
import dogByNameResolvers from './dogByName/dogByName.resolvers'
import getDogsResolvers from './getDogs/getDogs.resolvers'
import getUsersWithPostsResolvers from './getUsersWithPosts/getUsersWithPosts.resolvers'
import getUserWithRedisResolvers from './getUserWithRedis/getUserWithRedis.resolvers'
import sendToSubscriptionTestResolvers from './sendToSubscriptionTest/sendToSubscriptionTest.resolvers'
import typesResolvers from './types/types.resolvers'
import updateUserResolvers from './updateUser/updateUser.resolvers'
import updateUserForOptimisticUpdateResolvers from './updateUserForOptimisticUpdate/updateUserForOptimisticUpdate.resolvers'
import userSubscriptionResolvers from './userSubscription/userSubscription.resolvers'
import zxTestResolvers from './zxTest/zxTest.resolvers'
import createQueueMessageForRabbitMqTypeDefs from './createQueueMessageForRabbitMq/createQueueMessageForRabbitMq.typeDefs'
import createUserTypeDefs from './createUser/createUser.typeDefs'
import deleteUserTypeDefs from './deleteUser/deleteUser.typeDefs'
import dogByNameTypeDefs from './dogByName/dogByName.typeDefs'
import getDogsTypeDefs from './getDogs/getDogs.typeDefs'
import getUsersWithPostsTypeDefs from './getUsersWithPosts/getUsersWithPosts.typeDefs'
import getUserWithRedisTypeDefs from './getUserWithRedis/getUserWithRedis.typeDefs'
import sendToSubscriptionTestTypeDefs from './sendToSubscriptionTest/sendToSubscriptionTest.typeDefs'
import typesTypeDefs from './types/types.typeDefs'
import updateUserTypeDefs from './updateUser/updateUser.typeDefs'
import updateUserForOptimisticUpdateTypeDefs from './updateUserForOptimisticUpdate/updateUserForOptimisticUpdate.typeDefs'
import userSubscriptionTypeDefs from './userSubscription/userSubscription.typeDefs'
import zxTestTypeDefs from './zxTest/zxTest.typeDefs'

export const resolvers = mergeResolvers([
  createQueueMessageForRabbitMqResolvers,
  createUserResolvers,
  deleteUserResolvers,
  dogByNameResolvers,
  getDogsResolvers,
  getUsersWithPostsResolvers,
  getUserWithRedisResolvers,
  sendToSubscriptionTestResolvers,
  typesResolvers,
  updateUserResolvers,
  updateUserForOptimisticUpdateResolvers,
  userSubscriptionResolvers,
  zxTestResolvers,
])

export const typeDefs = mergeTypeDefs([
  createQueueMessageForRabbitMqTypeDefs,
  createUserTypeDefs,
  deleteUserTypeDefs,
  dogByNameTypeDefs,
  getDogsTypeDefs,
  getUsersWithPostsTypeDefs,
  getUserWithRedisTypeDefs,
  sendToSubscriptionTestTypeDefs,
  typesTypeDefs,
  updateUserTypeDefs,
  updateUserForOptimisticUpdateTypeDefs,
  userSubscriptionTypeDefs,
  zxTestTypeDefs,
])

let schema: GraphQLSchema;

try {
  schema = makeExecutableSchema({
    resolvers,
    typeDefs,
  });
} catch (error) {
  console.error('GraphQL 스키마 생성 중 오류 발생:', error);
  // 기본 스키마를 설정하거나 빈 스키마를 설정하여 서버가 계속 실행되도록 함
  schema = makeExecutableSchema({
    typeDefs: `
      type Query {
        _empty: String
      }
    `,
    resolvers: {},
  });
}

export { schema };
  