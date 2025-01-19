import { gql } from 'graphql-tag'

export default gql`
  type Subscription {
    userSubscription(email: String): User!
  }
`
