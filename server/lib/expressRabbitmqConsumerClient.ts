import amqp, { Connection, Channel } from 'amqplib'
import chalk from 'chalk'

// 전역 타입 선언 (Hot Reload 시 연결 유지를 위함)
declare global {
  // eslint-disable-next-line no-var
  var expressRabbitMQConsumerClient: ExpressRabbitMQConsumerClient | undefined
}

class ExpressRabbitMQConsumerClient {
  // RabbitMQ 연결 및 채널 상태 관리
  private connection: Connection | null = null
  private channel: Channel | null = null
  private connecting: boolean = false

  /**
   * 연결이 끊어졌을 때의 처리 로직
   * - 연결 상태 초기화
   * - 재연결 시도
   */
  private async handleDisconnect() {
    console.log('RabbitMQ 연결이 끊어짐')
    this.connection = null
    this.channel = null
    await this.connect()
  }

  /**
   * RabbitMQ 서버와 연결을 설정
   * - 이미 연결된 경우 기존 연결 재사용
   * - 연결 중인 경우 대기 후 재시도
   * - 연결 실패 시 에러 발생
   */
  async connect(): Promise<void> {
    // 이미 연결되어 있는 경우 재사용
    if (this.connection && this.channel) {
      return
    }

    // 다른 프로세스가 연결 시도 중인 경우 대기
    if (this.connecting) {
      await new Promise(resolve => setTimeout(resolve, 100))
      return this.connect()
    }

    try {
      this.connecting = true
      // RabbitMQ 서버에 연결
      // amqp://사용자이름:비밀번호@호스트:포트
      this.connection = await amqp.connect(
        `amqp://${process.env.RABBITMQ_USERNAME}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
      )
      this.channel = await this.connection.createChannel()

      // prefetch(1) 설정 - 모든 큐에 기본적으로 적용
      await this.channel.prefetch(1)

      // 연결 상태 모니터링을 위한 이벤트 리스너
      this.connection.on('error', async err => {
        console.error(chalk.red('RabbitMQ Consumer connection failed:'), err)
        await this.handleDisconnect()
      })

      this.connection.on('close', async () => {
        await this.handleDisconnect()
      })

      console.log(
        chalk.green(
          '✅ RabbitMQ Consumer successfully connected and consumers registered.',
        ),
      )
    } catch (error) {
      console.error(chalk.red('RabbitMQ Consumer connection failed:'), error)
      throw error
    } finally {
      this.connecting = false
    }
  }

  /**
   * 메시지 수신 및 처리 메서드 (Consumer)
   * @param queue - 구독할 큐 이름
   * @param messageHandler - 메시지 처리 함수
   *
   * 사용 예시:
   * await expressRabbitMQClient.startConsuming('notification_queue', async (message) => {
   *   console.log('메시지 수신:', message)
   *   await sendNotification(message)
   * })
   */
  async startConsuming(
    queue: string,
    messageHandler: (message: any, ack: Function) => Promise<void>,
  ): Promise<void> {
    // 연결 확인 및 필요시 재연결
    if (!this.channel || !this.connection) {
      await this.connect()
    }

    if (!this.channel) throw new Error('Channel not initialized')

    try {
      // 큐가 없으면 생성
      await this.channel.assertQueue(queue)
      console.log(`${queue} 큐 메시지 대기 중...`)

      // 메시지 수신 대기
      this.channel.consume(queue, async (msg: amqp.ConsumeMessage | null) => {
        if (msg) {
          try {
            const deserializedContent = JSON.parse(msg.content.toString())
            console.log(
              '받은 메시지 in expressRabbitmqConsumerClient: ',
              deserializedContent,
            )
            await messageHandler(deserializedContent, () =>
              this.channel?.ack(msg),
            )
          } catch (error) {
            console.error('메시지 처리 중 오류:', error)
            if (this.channel) {
              this.channel.nack(msg, false, true)
            }
          }
        }
      })
    } catch (error) {
      console.error('Consumer: 메시지 수신 중 오류:', error)
      await this.handleDisconnect()
      throw error
    }
  }
}

// 싱글톤 인스턴스 생성 (전역에서 하나의 연결만 사용)
const expressRabbitMQConsumerClient =
  global.expressRabbitMQConsumerClient || new ExpressRabbitMQConsumerClient()

// 개발 환경에서 Hot Reload 시 연결 유지
if (process.env.NODE_ENV === 'development')
  global.expressRabbitMQConsumerClient = expressRabbitMQConsumerClient

export default expressRabbitMQConsumerClient
