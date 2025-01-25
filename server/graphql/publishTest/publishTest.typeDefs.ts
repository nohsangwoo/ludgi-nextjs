import { gql } from 'graphql-tag'

export default gql`
  type publishTestResult {
    title: String!
    price: Float!
    isAvailable: Boolean!
  }

  type Mutation {
    publishTest(
      id: Int!
      isActive: Boolean!
      description: String!
      amount: Float!
    ): publishTestResult!
  }
`
