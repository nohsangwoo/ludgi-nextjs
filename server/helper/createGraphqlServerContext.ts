import { getIronSession } from 'iron-session'
import { expressRedisPubsub } from '../lib/expressRedisPubsub'
import rabbitMQClient from '../lib/expressRabbitmqConsumerClient'
import expressPrismaClient from '../lib/expressPrismaClient'
import { SessionData, sessionOptions } from '../lib/session'
import { Request, Response } from 'express'
import { Context } from '../graphql/type'

export async function createGraphqlServerContext({
  req,
  res,
}: {
  req: Request
  res: Response
}): Promise<Context> {
  const ironsession = await getIronSession<SessionData>(
    req,
    res,
    sessionOptions,
  )

  // DI
  return {
    req,
    res,
    client: expressPrismaClient,
    ironsession,
    rabbitMQClient,
    pubsub: expressRedisPubsub,
    customData: 'example data',
  }
}
