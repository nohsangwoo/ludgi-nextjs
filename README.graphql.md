#### 섹션 4. GraphQL의 핵심 구조 이해하기

1. **GraphQL의 핵심 용어**

   ```graphql
   query getUsersWithPosts {
     getUsersWithPosts {
       users {
         name # 필드 셀렉션 예시
         email # 필요한 필드만 선택
       }
     }
   }
   ```

   - 필드 셀렉션: 클라이언트가 필요한 데이터만 선택하는 방식
   - 오버페칭: 필요 이상의 데이터를 가져오는 문제
   - 언더페칭: 필요한 데이터를 위해 여러 번 요청하는 문제
   - 리졸버 종류별 설명:
     - 루트 리졸버: Query/Mutation의 진입점
     - 타입 리졸버: 특정 타입의 필드들을 처리
     - 필드 리졸버: 개별 필드 처리

2. **타입 시스템과 리졸버**

   ```typescript
   // 베이스 타입 예시
   type User {
     id: ID!
     email: String!
   }

   // 타입 리졸버 패턴 예시
   User: {
     posts: async () => { ... },
     postsCount: async () => { ... }
   }
   ```

   - 베이스 타입: User, Post, Profile 등 핵심 데이터 모델
   - 공유 타입: DogAttribute, DogResult 등 재사용 타입
   - 타입 리졸버 패턴: 타입별로 필드 리졸버를 모아서 관리

3. **프로젝트 구조**

   ```
   src/graphql/
   ├── getUsersWithPosts/
   │   ├── getUsersWithPosts.graphql    # 쿼리 정의
   │   ├── getUsersWithPosts.typeDefs.ts # 타입 정의
   │   └── getUsersWithPosts.resolvers.ts # 리졸버 구현
   ├── types/
   │   ├── types.typeDefs.ts    # 공통 타입 정의
   │   └── types.resolvers.ts   # 공통 리졸버
   └── schema.ts                # 스키마 병합
   ```

   - 파일 구조: 각 기능별로 분리된 파일 구조 설명
   - 스키마 병합: mergeResolvers와 mergeTypeDefs를 통한 자동 병합
   - 모듈화 이점: 유지보수성과 재사용성 향상

4. **GraphQL CodeGen을 통한 타입 안전성 확보**

   ```typescript
   // 1. GraphQL 쿼리 정의
   query getUsersWithPosts {
     getUsersWithPosts {
       users {
         id
         name
       }
     }
   }

   // 2. 자동 생성된 타입과 SDK
   export const {
     getUsersWithPosts,  // 타입이 자동으로 생성된 함수
     createUser,
     updateUser,
     // ...
   } = getSdk(gqlClient)
   ```

   - **코드 생성의 이점**:

     - 타입 안전성 보장
     - 자동 완성 지원
     - 런타임 에러 방지

   - **주요 생성 도구**:

     - GraphQL Code Generator
     - Apollo Codegen

   - **실제 사용 예시**:

     ```typescript:src/graphql/apis.ts
     import { GraphQLClient } from 'graphql-request'
     import { getSdk } from '../generated/graphql'

     const gqlClient = new GraphQLClient(API_URL)

     // 자동 생성된 타입 안전한 API 함수들
     export const {
       getUsersWithPosts,
       createUser,
       // ...
     } = getSdk(gqlClient)
     ```
