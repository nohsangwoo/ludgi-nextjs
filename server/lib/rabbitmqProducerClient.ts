import amqp, { Connection, Channel } from 'amqplib'
import chalk from 'chalk'

// 전역 타입 선언 (Hot Reload 시 연결 유지를 위함)
declare global {
  // eslint-disable-next-line no-var
  var rabbitmqProducerClient: RabbitMQProducerClient | undefined
}

class RabbitMQProducerClient {
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

      // 연결 상태 모니터링을 위한 이벤트 리스너
      this.connection.on('error', async err => {
        console.error(chalk.red('RabbitMQ producer connection error:'), err)
        await this.handleDisconnect()
      })

      this.connection.on('close', async () => {
        await this.handleDisconnect()
      })

      console.log(chalk.green('RabbitMQ Producer successfully connected'))
    } catch (error) {
      console.error(chalk.red('RabbitMQ producer connection failed:'), error)
      throw error
    } finally {
      this.connecting = false
    }
  }

  /**
   * 단방향 메시지 전송 메서드
   * @param queue - 메시지를 전송할 큐 이름
   * @param message - 전송할 메시지 내용
   *
   * 사용 예시:
   * await rabbitMQClient.publishMessage('notification_queue', {
   *   userId: 123,
   *   message: '새로운 알림이 있습니다'
   * })
   */
  async publishMessage(queue: string, message: any): Promise<void> {
    // 연결 확인 및 필요시 재연결
    if (!this.channel || !this.connection) {
      await this.connect()
    }

    if (!this.channel) throw new Error('Channel not initialized')

    try {
      // 큐가 없으면 생성
      await this.channel.assertQueue(queue)
      // 메시지를 JSON 문자열로 변환하여 전송
      await this.channel.sendToQueue(
        queue,
        Buffer.from(JSON.stringify(message)),
      )
    } catch (error) {
      await this.handleDisconnect()
      throw error
    }
  }
}

// 싱글톤 인스턴스 생성 (전역에서 하나의 연결만 사용)
const rabbitMQClient =
  global.rabbitmqProducerClient || new RabbitMQProducerClient()

// 개발 환경에서 Hot Reload 시 연결 유지
if (process.env.NODE_ENV === 'development')
  global.rabbitmqProducerClient = rabbitMQClient

export default rabbitMQClient
