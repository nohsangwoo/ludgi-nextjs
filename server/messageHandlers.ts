
// 메시지 처리 핸들러들 정의
export const notificationHandler = async (message: unknown) => {
  console.log('notificationHandler', message)
  // 예시
  //   const notification = message as { userId: number; content: string }
  //   await axios.post('https://notification-service/send', notification)
}

export const orderProcessHandler = async (message: unknown) => {
  console.log('orderProcessHandler', message)
  // 예시
  // const order = message as { orderId: string; items: any[] }
  // await prisma.order.create({ data: order })
  // await sendOrderConfirmationEmail(order)
}

export const loggingHandler = async (message: unknown) => {
  console.log('loggingHandler', message)
  // 예시
  //   await prisma.log.create({
  //     data: {
  //       content: JSON.stringify(message),
  //       timestamp: new Date(),
  //     },
  //   })
}
