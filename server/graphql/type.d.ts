import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import SessionData from '../lib/session'
import RabbitMQClient from '../lib/rabbitmq'
import { IronSession } from 'iron-session'
import { RedisPubSub } from 'graphql-redis-subscriptions'

export default interface CustomUserTypeForSession {
  name?: string | null
  email?: string | null
  role?: string | null
  userId?: number | null
}

export type Context = {
  req: Request
  res: Response
  client: PrismaClient
  ironsession: IronSession<SessionData>
  rabbitMQClient: RabbitMQClient
  pubsub: RedisPubSub
  customData: string
}
