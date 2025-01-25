import chalk from 'chalk'
import { updateServerStatusSync } from './updateServerStatus'

// 각 서버 및 client등의 동작 상태를 확인하는 키
export const ServerReadyFlagsKey = {
  EXPRESS_SERVER: 'expressServer',
  WEBSOCKET_SERVER: 'webSocketServer',
  RABBITMQ_CONSUMER: 'rabbitMQConsumer',
} as const

export type ServerReadyFlagsKeyType =
  (typeof ServerReadyFlagsKey)[keyof typeof ServerReadyFlagsKey]

const serverReadyFlagsStructure = Object.fromEntries(
  Object.values(ServerReadyFlagsKey).map(key => [key, false]),
) as Record<ServerReadyFlagsKeyType, boolean>

export type ServerReadyFlags = typeof serverReadyFlagsStructure

declare global {
  var serverReadyFlags: ServerReadyFlags
}
global.serverReadyFlags = serverReadyFlagsStructure

function checkAndUpdateServerStatus(serverKey: ServerReadyFlagsKeyType) {
  // 입력받은 서버의 상태를 true로 업데이트
  global.serverReadyFlags[serverKey] = true

  // 모든 서버가 준비되었는지 확인
  if (
    Object.values(ServerReadyFlagsKey).every(
      key => global.serverReadyFlags[key],
    )
  ) {
    updateServerStatusSync(true)

    console.log(chalk.blue('\n✅ All services are ready!'))
  }
}

export default checkAndUpdateServerStatus
