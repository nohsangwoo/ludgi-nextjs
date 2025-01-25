import chalk from 'chalk'
import expressRabbitMQConsumerClient from '../lib/expressRabbitmqConsumerClient'
import checkAndUpdateServerStatus, {
  ServerReadyFlagsKey,
} from './checkAndUpdateServerStatus'
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
    await expressRabbitMQConsumerClient.connect()

    await expressRabbitMQConsumerClient.startConsuming(
      'notification_queue',
      notificationHandler,
    )
    await expressRabbitMQConsumerClient.startConsuming(
      'order_queue',
      orderProcessHandler,
    )
    await expressRabbitMQConsumerClient.startConsuming(
      'logging_queue',
      loggingHandler,
    )

    checkAndUpdateServerStatus(ServerReadyFlagsKey.RABBITMQ_CONSUMER)
  } catch (error) {
    console.error('❌ RabbitMQ Consumer initialization failed:', error)
  }
}

export default createRabbitMqConsumerConnector
