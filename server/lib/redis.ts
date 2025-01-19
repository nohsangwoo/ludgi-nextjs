import { Redis } from 'ioredis'

declare global {
  // eslint-disable-next-line no-var
  var redis: Redis | undefined
}

const redis =
  global.redis ||
  new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: +(process.env.REDIS_PORT || 6379),
    password: process.env.REDIS_PASSWORD,
  })

if (process.env.NODE_ENV === 'development') global.redis = redis

export const CACHE_TTL = 3600 // 1시간 캐시

export default redis
