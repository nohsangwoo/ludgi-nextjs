import type { Context } from '../type'
import type { User } from '@prisma/client'
import redis, { CACHE_TTL } from '../../lib/redis'

const resolvers = {
  // 타입 리졸버 패턴
  // User 타입을 해석하는 User 타입 리졸버
  User: {
    // 여기 있는 개별 메서드들이 필드 리졸버
    // posts 필드를 해석하는 리졸버
    posts: async (parent: User, _args: unknown, context: Context) => {
      try {
        // 1. 사용자의 posts 캐시 확인
        const cacheKey = `user:${parent.id}:posts`
        const cachedPosts = await redis.get(cacheKey)

        if (cachedPosts) {
          console.log(`🎯 Cache Hit: ${cacheKey}`)
          return JSON.parse(cachedPosts)
        }

        // 2. DB에서 posts 조회
        console.log(`❌ Cache Miss: ${cacheKey}`)
        const posts = await context.client.post.findMany({
          where: {
            authorId: +parent.id,
          },
        })

        // 3. Redis에 캐시
        await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(posts))

        return posts
      } catch (error) {
        console.error('Redis Error:', error)
        // Redis 에러시 DB에서 직접 조회
        return await context.client.post.findMany({
          where: {
            authorId: +parent.id,
          },
        })
      }
    },

    postsCount: async (parent: User, _args: unknown, context: Context) => {
      try {
        // 1. 사용자의 postsCount 캐시 확인
        const cacheKey = `user:${parent.id}:postsCount`
        const cachedCount = await redis.get(cacheKey)

        if (cachedCount) {
          console.log(`🎯 Cache Hit: ${cacheKey}`)
          return parseInt(cachedCount)
        }

        // 2. DB에서 카운트 조회
        console.log(`❌ Cache Miss: ${cacheKey}`)
        const count = await context.client.post.count({
          where: {
            authorId: +parent.id,
          },
        })

        // 3. Redis에 캐시
        await redis.setex(cacheKey, CACHE_TTL, count.toString())

        return count
      } catch (error) {
        console.error('Redis Error:', error)
        // Redis 에러시 DB에서 직접 조회
        return await context.client.post.count({
          where: {
            authorId: +parent.id,
          },
        })
      }
    },
  },
}

export default resolvers
