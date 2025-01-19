import { gql } from 'graphql-tag'

export default gql`
  type createQueueMessageForRabbitMqResult {
    ok: Boolean!
    error: String
    message: String
  }

  type Mutation {
    createQueueMessageForRabbitMq(
      queue: String!
      content: String!
    ): createQueueMessageForRabbitMqResult!
  }
`
