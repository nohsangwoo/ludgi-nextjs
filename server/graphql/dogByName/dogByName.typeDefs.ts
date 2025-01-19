import { gql } from 'graphql-tag'

export default gql`
  type Query {
    dogByName(name: String!): DogResult
  }
`
