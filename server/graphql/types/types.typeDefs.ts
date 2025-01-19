import { gql } from 'graphql-tag'

// # 공유타입정의 (Shared Type Definitions)
// # or
// # 베이스 타입 정의(Base Type Definitions)
// # 라고 불림.
// # 모든 기본 타입들을 한 곳에서 관리
// # 또는 공유되는 되는 타입을 한곳에서 관리.
export default gql`
  # 도메인 기본 타입 (Core Domain Types)
  # 애플리케이션의 핵심 데이터 모델
  # 보통 데이터베이스 스키마와 밀접하게 연관
  # 여러 기능에서 자주 재사용
  type Post {
    id: ID!
    createdAt: String!
    updatedAt: String!
    title: String!
    content: String
    published: Boolean!
    author: User!
    authorId: ID!
  }

  type Profile {
    id: ID!
    bio: String
    user: User!
    userId: ID!
  }

  type User {
    id: ID!
    email: String!
    name: String
    posts: [Post!]!
    profile: Profile
    postsCount: Int!
  }

  # 2. 기능별 공유 타입 (Shared Feature Types)
  # 특정 기능을 위한 타입이지만 여러 곳에서 재사용
  # 비즈니스 로직에 특화된 타입

  type DogAttribute { # 공유타입정의
    key: String!
    value: String!
  }

  type DogResult { # 공유타입정의
    name: String!
    attributes: [DogAttribute!]!
    description: [String!]!
    image: String!
    ageInWeeks: Int!
    sex: String!
    breed: String!
    color: String!
    fee: Float!
    weight: Float!
    availableDate: String!
  }
`
