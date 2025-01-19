import express, { Application } from 'express'
import next from 'next'
import apiRoutes from './routes'
import cookieParser from 'cookie-parser'
import rabbitMQClient from './lib/expressRabbitmq'
import { validateEnv } from './config/env'

import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import { WebSocketServer } from 'ws'

import {
  notificationHandler,
  orderProcessHandler,
  loggingHandler,
} from './messageHandlers'

import { createServer } from 'http'
import { useServer } from 'graphql-ws/use/ws'
import { expressRedisPubsub } from './lib/expressRedisPubsub'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { SessionData, sessionOptions } from './lib/session'
import { getIronSession } from 'iron-session'
import { Context } from './graphql/type'

import expressClient from './lib/expressClient'
import { schema } from './graphql/schema'
import { updateServerStatusSync } from './lib/updateServerStatus'
import { getServerStatusSync } from './lib/getServerStatusSyn'

const port = parseInt(process.env.PORT as string, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// 전역 변수로 초기 연결 시도 여부를 추적
let isInitialServerConnection = true
let isInitialConnection = true

const serverReadyFlags = {
  expressServer: false,
  webSocketServer: false,
  rabbitMQ: false,
}

function checkAndUpdateServerStatus() {
  // 모든 서버가 준비되었는지 확인
  if (
    serverReadyFlags.expressServer &&
    serverReadyFlags.webSocketServer &&
    serverReadyFlags.rabbitMQ
  ) {
    updateServerStatusSync(true) // 상태를 true로 업데이트
    console.log('✅ All services are ready!')
  }
}

updateServerStatusSync(false) // 상태 업데이트

app.prepare().then(async () => {
  console.log('getServerStatusSync pre check: ', getServerStatusSync())

  // 필수 환경변수 검증 (미설정 시 즉시 종료)
  validateEnv()

  const server: Application = express()

  // 예시를 위해서 이곳에 몰아 넣었지만 실무에서는 도메인관리 하세요.
  /**
   * RabbitMQ Consumer(메시지 수신자) 설정
   *
   * Producer(메시지 발신자)가 보낸 메시지를 받아서 처리하는 부분입니다.
   * 중요: Producer가 메시지를 보낼 때 사용한 큐 이름과
   * Consumer가 구독하는 큐 이름이 정확히 일치해야 합니다!
   *
   * 예시:
   * Producer: rabbitMQClient.publishMessage('notification_queue', message)
   * Consumer: rabbitMQClient.startConsuming('notification_queue', handler)
   */

  if (isInitialServerConnection) {
    try {
      // RabbitMQ 서버에 연결
      await rabbitMQClient.connect()

      await rabbitMQClient.startConsuming(
        'notification_queue',
        notificationHandler,
      )
      await rabbitMQClient.startConsuming('order_queue', orderProcessHandler)
      await rabbitMQClient.startConsuming('logging_queue', loggingHandler)

      console.log('모든 RabbitMQ Consumer가 성공적으로 등록되었습니다!')

      console.log(
        '✅ RabbitMQ successfully connected and consumers registered.',
      )
      serverReadyFlags.rabbitMQ = true // RabbitMQ 준비 완료
      checkAndUpdateServerStatus()
    } catch (error) {
      console.error('❌ RabbitMQ initialization failed:', error)
    } finally {
      isInitialServerConnection = false
    }
  }

  const wsHttpServer = createServer() // WebSocket용 HTTP 서버 생성
  // WebSocket 서버 설정
  const wsServer = new WebSocketServer({
    server: wsHttpServer,
    path: '/api/graphql',
  })

  // WebSocket 서버에 GraphQL 구독 핸들러 설정
  useServer(
    {
      schema,
      context: async ctx => {
        return {
          ...ctx,
          expressRedisPubsub,
        }
      },
    },
    wsServer,
  )

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
      context: async ({ req, res }) => {
        const ironsession = await getIronSession<SessionData>(
          req,
          res,
          sessionOptions,
        )

        if (isInitialConnection) {
          try {
            await rabbitMQClient.connect()
          } catch (error) {
            console.warn('RabbitMQ 연결 실패:', error)
          } finally {
            isInitialConnection = false
          }
        }

        return {
          req,
          res,
          client: expressClient,
          ironsession,
          rabbitMQClient,
          pubsub: expressRedisPubsub,
          customData: 'example data',
        } satisfies Context
      },
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

    serverReadyFlags.expressServer = true // Express 서버 준비 완료
    checkAndUpdateServerStatus()
  })

  // 서버 시작
  wsHttpServer.listen(process.env.WEBSOCKET_PORT, () => {
    console.log(
      `> WebSocket ready on ws://localhost:${process.env.WEBSOCKET_PORT}/api/graphql`,
    )
    serverReadyFlags.webSocketServer = true // WebSocket 준비 완료
    checkAndUpdateServerStatus()
  })
})
