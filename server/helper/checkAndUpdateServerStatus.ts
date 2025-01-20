import { updateServerStatusSync } from './updateServerStatus'

interface IServerReadyFlags {
  expressServer: boolean
  webSocketServer: boolean
  rabbitMQ: boolean
  graphqlSubscriptionServer: boolean
}

function checkAndUpdateServerStatus(serverReadyFlags: IServerReadyFlags) {
  // 모든 서버가 준비되었는지 확인
  if (
    serverReadyFlags.expressServer &&
    serverReadyFlags.webSocketServer &&
    serverReadyFlags.rabbitMQ &&
    serverReadyFlags.graphqlSubscriptionServer
  ) {
    updateServerStatusSync(true) // 상태를 true로 업데이트
    console.log('✅ All services are ready!')
  }
}

export default checkAndUpdateServerStatus
