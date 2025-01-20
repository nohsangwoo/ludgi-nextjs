import express, { Application } from 'express'
import next from 'next'
import apiRoutes from './api/routes'
import cookieParser from 'cookie-parser'
import rabbitMQClient from './lib/expressRabbitmq'
import { validateEnv } from './config/env'

import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'

import {
  notificationHandler,
  orderProcessHandler,
  loggingHandler,
} from './helper/rabbitMqConsumerMessageHandlers'

import { createServer } from 'http'
import { expressRedisPubsub } from './lib/expressRedisPubsub'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { SessionData, sessionOptions } from './lib/session'
import { getIronSession } from 'iron-session'
import { Context } from './graphql/type'

import expressPrismaClient from './lib/expressPrismaClient'
import { schema } from './graphql/schema'
import { updateServerStatusSync } from './helper/updateServerStatus'
import { getServerStatusSync } from './helper/getServerStatusSyn'
import { createWebSocketServer } from './helper/createWebSocketServer'
import checkAndUpdateServerStatus from './helper/checkAndUpdateServerStatus'
import createRabbitMqConsumerConnector from './helper/createRabbitMqConsumerConnector'
import { createGraphqlServerContext } from './helper/createGraphqlServerContext'

const port = parseInt(process.env.PORT as string, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const serverReadyFlagsStructure = {
  expressServer: false,
  webSocketServer: false,
  rabbitMQ: false,
  graphqlSubscriptionServer: false,
}

declare global {
  var serverReadyFlags: typeof serverReadyFlagsStructure
}
global.serverReadyFlags = serverReadyFlagsStructure

app.prepare().then(async () => {
  // 필수 환경변수 검증 (미설정 시 즉시 종료)
  validateEnv()

  const server: Application = express()

  // 예시를 위해서 이곳에 몰아 넣었지만 실무에서는 도메인관리 하세요.


  await createRabbitMqConsumerConnector()

  const wsHttpServer = createServer() // WebSocket용 HTTP 서버 생성

  createWebSocketServer(wsHttpServer)

  // 기본 미들웨어들 먼저 등록
  server.use(cookieParser(process.env.COOKIE_SECRET))

  const apolloServer = new ApolloServer({
    schema: schema,
    cache: 'bounded',
    introspection: true,
  })

  await apolloServer.start()

  // Apollo Server를 Express 미들웨어로 추가
  server.use(
    '/api/graphql',
    express.json(),
    expressMiddleware(apolloServer, {
      context: createGraphqlServerContext,
    }) as express.RequestHandler,
  )

  // API 라우트를 next.js 핸들러보다 먼저 등록
  server.use('/api', apiRoutes) // '/api' 경로로 변경 추천

  // next.js 핸들러는 마지막에 등록
  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err?: unknown) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)

    global.serverReadyFlags.expressServer = true // Express 서버 준비 완료
    checkAndUpdateServerStatus(global.serverReadyFlags)
  })

  // 서버 시작
  wsHttpServer.listen(process.env.WEBSOCKET_PORT, () => {
    console.log(
      `> WebSocket ready on ws://localhost:${process.env.WEBSOCKET_PORT}/api/graphql`,
    )
    global.serverReadyFlags.webSocketServer = true // WebSocket 준비 완료
    checkAndUpdateServerStatus(global.serverReadyFlags)
  })
})
