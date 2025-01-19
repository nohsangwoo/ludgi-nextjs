import { gql } from 'graphql-tag'

export default gql`
  type updateUserForOptimisticUpdateResult {
    ok: Boolean!
    error: String
    user: User
  }

  type Mutation {
    updateUserForOptimisticUpdate(email: String!, name: String): updateUserForOptimisticUpdateResult!
  }
`
