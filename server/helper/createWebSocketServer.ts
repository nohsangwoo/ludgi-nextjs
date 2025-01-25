import { WebSocketServer } from 'ws' // WebSocket 서버를 생성하기 위한 패키지
import { useServer } from 'graphql-ws/use/ws' // GraphQL 구독(WebSocket)을 설정하기 위한 함수
import { schema } from '../graphql/schema' // GraphQL 스키마를 정의한 파일
import { expressRedisPubsub } from '../lib/expressRedisPubsub' // Redis를 사용한 Pub/Sub 구현
// Redis는 단순히 데이터를 캐싱하는 데 그치지 않고,
// Pub/Sub(발행-구독)이라는 실시간 데이터 전달 기능을 제공합니다.
// 여기서는 Redis를 통해 구독 이벤트를 관리합니다.
// 예를 들어, 특정 데이터가 변경되면 Redis 채널에 알리고,
// 구독 중인 클라이언트는 이 변경 사항을 실시간으로 전달받습니다.
import { IncomingMessage, Server, ServerResponse } from 'http' // HTTP 서버 관련 타입 정의
import checkAndUpdateServerStatus, {
  ServerReadyFlagsKey,
} from './checkAndUpdateServerStatus' // 서버 상태 업데이트를 위한 유틸리티 함수
import chalk from 'chalk' // 콘솔에 색상을 추가하기 위한 패키지 (가독성 향상)

export const createWebSocketServer = (
  wsHttpServer: Server<typeof IncomingMessage, typeof ServerResponse>,
) => {
  // 1️⃣ WebSocket 서버 생성
  // WebSocket 서버는 HTTP 서버 위에서 작동하며, 클라이언트와의 실시간 통신을 처리합니다.
  const wsServer = new WebSocketServer({
    server: wsHttpServer, // 기존 HTTP 서버를 WebSocket 서버로 확장
    path: '/api/graphql', // WebSocket 요청을 받을 경로
  })

  // 2️⃣ WebSocket 서버에 GraphQL 구독 핸들러 설정
  // `useServer`는 WebSocket 서버와 GraphQL 스키마를 연결하여 구독 기능을 처리합니다.
  useServer(
    {
      schema, // GraphQL 스키마를 전달합니다. (스키마는 쿼리, mutation, subscription 등을 정의)
      context: async ctx => ({
        ...ctx, // 클라이언트 연결 정보를 GraphQL 컨텍스트에 전달
        expressRedisPubsub, // Redis Pub/Sub 인스턴스를 GraphQL 컨텍스트에 추가
      }),
    },
    wsServer, // WebSocket 서버를 설정
  )

  // 3️⃣ WebSocket 서버 시작
  // WebSocket 서버는 지정된 포트에서 클라이언트와의 연결을 대기합니다.
  wsHttpServer.listen(process.env.WEBSOCKET_PORT, () => {
    // 성공 메시지를 콘솔에 출력 (색상 강조)
    console.log(
      chalk.green(
        `✅ WebSocket ready on ws://localhost:${process.env.WEBSOCKET_PORT}/api/graphql`,
      ),
    )
    // 서버 상태 플래그 업데이트 (서버 준비 완료 상태를 기록)
    checkAndUpdateServerStatus(ServerReadyFlagsKey.WEBSOCKET_SERVER)
  })

  // 생성된 WebSocket 서버를 반환합니다.
  return wsServer
}
