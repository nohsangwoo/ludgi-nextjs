import { gql } from 'graphql-tag'

export default gql`
  type UserSubscriptionPayload {
    id: Int
    email: String
    name: String
  }

  type Subscription {
    userSubscription(email: String): UserSubscriptionPayload
  }
`
