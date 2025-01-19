import { gql } from 'graphql-tag'

export default gql`
  # 커스텀 타입 정의
  type getUserWithRedisResult {
    ok: Boolean!
    users: [User!]!
  }
  # 루트 타입 정의
  type Query {
    getUserWithRedis: getUserWithRedisResult!
  }
`
