import { gql } from 'graphql-tag'

export default gql`
  type sendToSubscriptionTestResult {
    ok: Boolean!
    error: String
    userSubscriptionPayload: User!
  }

  type Mutation {
    sendToSubscriptionTest: sendToSubscriptionTestResult!
  }
`
