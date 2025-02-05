import { gql } from 'graphql-tag'

export default gql`
  type Subscription {
    OnSubscriptionTest(id: Int): OnSubscriptionTestPayload!
  }

  type OnSubscriptionTestPayload {
    id: Int!
    email: String!
    name: String!
  }
`
