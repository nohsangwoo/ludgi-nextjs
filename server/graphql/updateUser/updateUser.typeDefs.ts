import { gql } from 'graphql-tag'

export default gql`
  type updateUserResult {
    ok: Boolean!
    error: String
    user: User
  }

  type Mutation {
    updateUser(email: String!, name: String): updateUserResult!
  }
`
