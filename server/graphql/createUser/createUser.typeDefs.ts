import { gql } from 'graphql-tag'

export default gql`
  type createUserResult {
    ok: Boolean!
    error: String
    user: User
  }

  type Mutation {
    createUser(
      email: String!
      name: String
      password: String
    ): createUserResult!
  }
`
