import { gql } from 'graphql-tag'

export default gql`
  type deleteUserResult {
    ok: Boolean!
    error: String
    user: User
  }

  type Mutation {
    deleteUser(email: String!): deleteUserResult!
  }
`
