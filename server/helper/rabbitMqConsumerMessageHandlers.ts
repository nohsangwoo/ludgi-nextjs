import chalk from 'chalk'

// 메시지 처리 핸들러들 정의
export const notificationHandler = async (message: any, ack: Function) => {
  console.log('processing notification_queue', message)
  ack()
}

export const orderProcessHandler = async (
  message: any,
  ack: Function,
): Promise<void> => {
  console.log('processing order_queue', message)

  console.log(chalk.yellow('order_queue message received:'), message)

  // 10초 대기 (예: 특정 작업 수행)
  await new Promise(resolve => setTimeout(resolve, 10000))

  console.log(
    chalk.green('order_queue message processed successfully: ', message),
  )

  // 메시지 처리 완료 후 ack 호출
  ack()
}

export const loggingHandler = async (message: any, ack: Function) => {
  console.log('loggingHandler', message)
  // 예시
  //   await prisma.log.create({
  //     data: {
  //       content: JSON.stringify(message),
  //       timestamp: new Date(),
  //     },
  //   })

  ack()
}
