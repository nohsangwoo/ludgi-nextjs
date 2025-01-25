import type { Context } from '../type'
import {
  CreateQueueMessageForRabbitMqMutationVariables,
  CreateQueueMessageForRabbitMqResult,
} from '../../generated/graphql'
import rabbitMQClient from '../../lib/rabbitmqProducerClient'

const resolvers = {
  Mutation: {
    createQueueMessageForRabbitMq: async (
      _parent: unknown,
      args: CreateQueueMessageForRabbitMqMutationVariables,
      context: Context,
    ): Promise<CreateQueueMessageForRabbitMqResult> => {
      try {
        const { queue, content } = args

        // content를 JSON으로 파싱

        // const newContent = {
        //   userId: 1,
        //   msg: content,
        // }
        await rabbitMQClient.connect()
        await rabbitMQClient.publishMessage(queue, content)

        return {
          ok: true,
          message: '메시지 발행 완료',
        }
      } catch (error) {
        console.error('RabbitMQ 에러:', error)
        return {
          ok: false,
          error:
            error instanceof Error ? error.message : '메시지 발행 중 오류 발생',
        }
      }
    },
  },
}

export default resolvers
