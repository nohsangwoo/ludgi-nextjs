import rabbitMQClient from './../lib/expressRabbitmq'
import checkAndUpdateServerStatus from './checkAndUpdateServerStatus'
import {
  loggingHandler,
  notificationHandler,
  orderProcessHandler,
} from './rabbitMqConsumerMessageHandlers'

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

export const createRabbitMqConsumerConnector = async () => {
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

    console.log('✅ RabbitMQ successfully connected and consumers registered.')
    global.serverReadyFlags.rabbitMQ = true // RabbitMQ 준비 완료
    checkAndUpdateServerStatus(global.serverReadyFlags)
  } catch (error) {
    console.error('❌ RabbitMQ initialization failed:', error)
  }
}

export default createRabbitMqConsumerConnector
