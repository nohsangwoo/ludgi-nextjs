import { gql } from 'graphql-tag'

export default gql`
  type SubscriptionPayload {
    id: Int
    email: String
    name: String
  }

  type Subscription {
    userSubscription(email: String): SubscriptionPayload
  }
`
