import type { Context } from '../type'
import redis, { CACHE_TTL } from '../../lib/redis'
import {
  GetUserWithRedisQueryVariables,
  GetUserWithRedisResult,
} from '../../generated/graphql'

const resolvers = {
  // query 타입의 루트 리졸버
  Query: {
    getUserWithRedis: async (
      _parent: unknown,
      args: GetUserWithRedisQueryVariables,
      context: Context,
    ): Promise<GetUserWithRedisResult> => {
      try {
        // 1. Redis에서 캐시 확인
        const cachedUsers = await redis.get('users:withPosts')
        if (cachedUsers) {
          console.log('🎯 Cache Hit: users:withPosts')
          return {
            ok: true,
            users: JSON.parse(cachedUsers),
          }
        }

        // 2. 캐시 없으면 DB에서 조회
        console.log('❌ Cache Miss: users:withPosts')
        const users = await context.client.user.findMany()

        // 3. Redis에 캐시 저장
        await redis.setex('users:withPosts', CACHE_TTL, JSON.stringify(users))

        return {
          ok: true,
          users,
        }
      } catch (error) {
        console.error('Redis Error:', error)
        // Redis 에러시 DB에서 직접 조회
        const users = await context.client.user.findMany()
        return {
          ok: true,
          users,
        }
      }
    },
  },
}

export default resolvers
