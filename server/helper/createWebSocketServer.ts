import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/use/ws'
import { schema } from '../graphql/schema'
import { expressRedisPubsub } from '../lib/expressRedisPubsub'
import { IncomingMessage, Server, ServerResponse } from 'http'
import checkAndUpdateServerStatus from './checkAndUpdateServerStatus'

export const createWebSocketServer = (
  httpServer: Server<typeof IncomingMessage, typeof ServerResponse>,
) => {
  // graphql subscription server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/api/graphql',
  })

  // WebSocket 서버에 GraphQL 구독 핸들러 설정
  useServer(
    {
      schema,
      context: async ctx => ({
        ...ctx,
        expressRedisPubsub,
      }),
    },
    wsServer,
  )

  console.log('graphql subscription server ready')
  global.serverReadyFlags.graphqlSubscriptionServer = true
  checkAndUpdateServerStatus(global.serverReadyFlags)
  return wsServer
}
