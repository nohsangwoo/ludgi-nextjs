import { getIronSession } from 'iron-session'
import { expressRedisPubsub } from '../lib/expressRedisPubsub'
import rabbitMQClient from '../lib/expressRabbitmq'
import expressPrismaClient from '../lib/expressPrismaClient'
import { SessionData, sessionOptions } from '../lib/session'
import { Request, Response } from 'express'

export async function createGraphqlServerContext({
  req,
  res,
}: {
  req: Request
  res: Response
}) {
  const ironsession = await getIronSession<SessionData>(
    req,
    res,
    sessionOptions,
  )

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
