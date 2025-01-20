import { gql } from 'graphql-tag'

export default gql`
  type getTestResult {
    ok: Boolean!
    text: String!
  }

  type Query {
    getTest(id: Int!, description: String): getTestResult!
  }
`
