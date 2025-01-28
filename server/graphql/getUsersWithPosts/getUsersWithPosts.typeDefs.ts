// 타입 정의 파일
// GraphQL에서 API의 데이터 구조와 요청 가능한 필드를 정의하는 핵심 파일입니다.
// 보통 타입 정의 파일(typeDefs file)로 불리며, GraphQL SDL을 JavaScript/TypeScript 코드로 래핑한 형태입니다.
// GraphQL 서버 환경에서 사용되며, JavaScript/TypeScript와의 통합을 위해 코드로 감싸는 형태로 작성됩니다.
// 실행 가능한 스키마로 연결하기 쉽게 설계되었습니다.

import { gql } from 'graphql-tag'

export default gql`
  # 커스텀 타입 정의
  # 루트 타입의 필드에서 사용되는 데이터 구조를 정의합니다.
  # 주로 도메인별로 특정 데이터를 표현하기 위해 사용됩니다.
  type getUsersWithPostsResult {
    ok: Boolean! # 요청의 성공 여부를 나타내는 필드
    error: String # 오류 메시지를 나타내는 필드
    users: [User!] # 반환되는 사용자 목록
  }

  # 루트 타입 정의
  ## GraphQL API 요청의 시작점을 정의하는 타입입니다.
  ## Query, Mutation, Subscription은 GraphQL 스펙에서 명시된 루트 타입입니다.
  ## - Query: 데이터를 읽어오는 요청의 시작점.
  ## - Mutation: 데이터를 생성, 수정, 삭제하는 요청의 시작점.
  ## - Subscription: 실시간 데이터를 제공하는 요청의 시작점.
  type Query {
    getUsersWithPosts: getUsersWithPostsResult! # 사용자와 관련된 게시물 데이터를 가져오는 루트 필드
  }
`
