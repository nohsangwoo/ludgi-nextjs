// 이 파일은 GraphQL의 Subscription 기능을 구현한 코드입니다.
// Subscription은 클라이언트가 실시간으로 서버의 데이터를 받을 수 있도록 하는 GraphQL의 기능 중 하나입니다.

// Context 타입을 불러옵니다. Context는 각 요청(request)마다 전달되는 데이터나 유틸리티를 담고 있습니다.
import type { Context } from '../type'

// expressRedisPubsub는 Redis를 사용하여 publish/subscribe 방식을 구현한 라이브러리입니다.
// Redis는 데이터를 실시간으로 주고받는 데 사용되는 인메모리 데이터 저장소입니다.
import { expressRedisPubsub } from '../../lib/expressRedisPubsub'

// GraphQL 스키마에서 자동으로 생성된 타입들을 불러옵니다.
// OnSubscriptionTestPayload는 Subscription으로 전달되는 데이터의 타입이고,
// OnSubscriptionTestSubscriptionVariables는 Subscription의 변수 타입입니다.
import {
  OnSubscriptionTestPayload,
  OnSubscriptionTestSubscriptionVariables,
} from '../../generated/graphql'

// Subscription 이벤트 이름을 상수로 정의합니다.
// 이 이름은 publish/subscribe 방식에서 이벤트를 식별하기 위해 사용됩니다.
export const ONSUBSCRIPTION_TEST = 'ONSUBSCRIPTION_TEST'

// Subscription 관련 리졸버를 정의합니다.
const resolvers = {
  Subscription: {
    // OnSubscriptionTest는 Subscription 이름입니다. 이는 클라이언트가 구독할 수 있는 항목입니다.
    OnSubscriptionTest: {
      // subscribe는 클라이언트가 Subscription을 시작할 때 호출됩니다.
      // _parent: GraphQL의 부모 객체(여기서는 사용되지 않음).
      // _args: 클라이언트가 전달한 변수(여기서는 OnSubscriptionTestSubscriptionVariables 타입).
      // context: 요청과 관련된 추가 데이터(사용자 정보 등).
      subscribe: (
        _parent: unknown, // 부모 리졸버에서 전달되는 값 (여기서는 사용하지 않으므로 unknown으로 설정).
        _args: OnSubscriptionTestSubscriptionVariables, // 클라이언트가 전달한 Subscription 변수.
        context: Context, // 요청별로 전달되는 컨텍스트 데이터.
      ): AsyncIterator<OnSubscriptionTestPayload> => {
        // expressRedisPubsub의 asyncIterator를 호출하여 이벤트를 구독합니다.
        // asyncIterator는 특정 이벤트가 발생할 때 데이터를 클라이언트로 전달합니다.

        console.log("ONSUBSCRIPTION_TEST args: ", _args)
        return expressRedisPubsub.asyncIterator([ONSUBSCRIPTION_TEST])
      },

      // resolve는 이벤트가 발생했을 때 데이터를 클라이언트로 전달하기 전에 데이터를 처리하는 함수입니다.
      // payload: 이벤트가 발생했을 때 전달된 데이터.
      resolve: (payload: any): Promise<OnSubscriptionTestPayload> => {

        console.log("ONSUBSCRIPTION_TEST resolve: ", payload)
        const result = payload.userSubscriptionPayload
        console.log("ONSUBSCRIPTION_TEST result: ", result)
        // 이벤트에서 전달된 데이터(payload) 중 OnSubscriptionTestPayload를 반환합니다.
        return result
      },
    },
  },
}

// 리졸버를 기본 내보내기로 설정합니다.
export default resolvers
