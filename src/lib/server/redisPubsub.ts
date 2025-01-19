import Redis from 'ioredis'
import { RedisPubSub } from 'graphql-redis-subscriptions'

declare global {
  // eslint-disable-next-line no-var
  var redisPubsub: RedisPubSub | undefined
}

const redisOptions = {
  host: process.env.REDIS_HOST || 'localhost',
  port: +(process.env.REDIS_PORT || 6379),
  password: process.env.REDIS_PASSWORD,
}

export const pubsub = 
  global.redisPubsub ||
  new RedisPubSub({
    publisher: new Redis(redisOptions),
    subscriber: new Redis(redisOptions),
  })

if (process.env.NODE_ENV === 'development') global.redisPubsub = pubsub
