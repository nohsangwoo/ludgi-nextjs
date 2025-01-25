import express, { Application } from 'express'
import next from 'next'
import apiRoutes from './api/routes'
import cookieParser from 'cookie-parser'
import { validateEnv } from './config/env'
import { createServer } from 'http'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { schema } from './graphql/schema'
import { createWebSocketServer } from './helper/createWebSocketServer'
import checkAndUpdateServerStatus, {
  ServerReadyFlagsKey,
} from './helper/checkAndUpdateServerStatus'
import createRabbitMqConsumerConnector from './helper/createRabbitMqConsumerConnector'
import { createGraphqlServerContext } from './helper/createGraphqlServerContext'
import chalk from 'chalk'

const port = parseInt(process.env.PORT as string, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(async () => {
  // 필수 환경변수 검증 (미설정 시 즉시 종료)
  validateEnv()

  const server: Application = express()

  // 기본 미들웨어들 먼저 등록
  server.use(cookieParser(process.env.COOKIE_SECRET))

  // 취향에 맞춰 도메인관리를 하세요.
  // 다만 ludgi-cli를 위해 checkAndUpdateServerStatus를 참고하여 사용해주세요.

  await createRabbitMqConsumerConnector()

  const wsHttpServer = createServer() // WebSocket용 HTTP 서버 생성

  // graphql subscription server
  createWebSocketServer(wsHttpServer)

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
    console.log(
      chalk.green(`✅ Express Server ready on http://localhost:${port}`),
    )
    checkAndUpdateServerStatus(ServerReadyFlagsKey.EXPRESS_SERVER)
  })
})
