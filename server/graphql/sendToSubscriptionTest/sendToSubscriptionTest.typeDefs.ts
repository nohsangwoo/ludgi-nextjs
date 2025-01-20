import { gql } from 'graphql-tag'

export default gql`
  type sendToSubscriptionTestResult {
    ok: Boolean!
    error: String
    userCreated: User!
  }

  type Mutation {
    sendToSubscriptionTest: sendToSubscriptionTestResult!
  }
`
