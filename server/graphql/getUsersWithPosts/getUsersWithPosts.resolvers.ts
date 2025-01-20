import type { Context } from '../type' // Context 타입을 가져옵니다. Context는 데이터베이스 클라이언트와 기타 서버 정보를 포함합니다.
import {
  GetUsersWithPostsQueryVariables,
  GetUsersWithPostsResult,
} from '../../generated/graphql' // GraphQL Code Generator에 의해 생성된 변수 타입을 가져옵니다.

// resolvers 객체는 GraphQL 리졸버를 정의합니다.
const resolvers = {
  Query: {
    /**
     * getUsersWithPosts는 클라이언트에서 getUsersWithPosts 쿼리를 요청할 때 실행되는 루트 리졸버(Root Resolver)입니다.
     * 루트 리졸버는 Query, Mutation, Subscription 같은 루트 타입에서 클라이언트 요청을 처리합니다.
     *
     * @param _parent - 상위 리졸버에서 전달되는 결과 (여기서는 사용되지 않으므로 unknown 타입으로 설정).
     * @param _args - 클라이언트에서 전달된 쿼리 변수. GetUsersWithPostsQueryVariables 타입을 따릅니다.
     * @param context - 요청의 컨텍스트. 데이터베이스 클라이언트 및 기타 정보를 포함.
     * @returns - 사용자 목록과 성공 여부를 포함한 객체를 반환합니다.
     */
    getUsersWithPosts: async (
      _parent: unknown,
      _args: GetUsersWithPostsQueryVariables,
      context: Context,
    ): Promise<GetUsersWithPostsResult> => {
      // 데이터베이스에서 사용자 목록을 가져옵니다.
      // 여기서는 사용자 ID를 기준으로 오름차순 정렬하여 가져옵니다.
      const users = await context.client.user.findMany({
        orderBy: {
          id: 'asc', // ID를 기준으로 오름차순 정렬.
        },
      })

      // GraphQL 응답 객체를 반환합니다.
      // ok 필드는 요청의 성공 여부를 나타내며, users 필드는 가져온 사용자 데이터를 포함합니다.
      return {
        ok: true, // 요청이 성공적으로 처리되었음을 나타냅니다.
        users, // 데이터베이스에서 가져온 사용자 목록을 포함.
      }
    },
  },
}

export default resolvers // 리졸버 객체를 기본 내보내기로 설정합니다.
