import { gql } from 'graphql-tag'

export default gql`
  type testMutationResult {
    title: String!
    price: Float!
    isAvailable: Boolean!
  }

  type Mutation {
    testMutation(
      id: Int!
      isActive: Boolean!
      description: String!
      amount: Float!
    ): testMutationResult!
  }
`
