import { gql } from 'graphql-tag'

export default gql`
  type childType {
    childText: String
  }

  type getTestResult {
    ok: Boolean!
    text: String!
    child: [childType!]
  }

  type Query {
    getTest(id: Int!, description: String): getTestResult!
  }
`
