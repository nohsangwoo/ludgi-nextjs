import { gql } from 'graphql-tag'

export default gql`
  type result {
    stdout: String
    stderr: String
    duration: Int
  }

  type zxTestResult {
    ok: Boolean!
    error: String
    result: result
  }

  type Mutation {
    zxTest: zxTestResult!
  }
`
