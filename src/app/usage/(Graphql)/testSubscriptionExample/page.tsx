// 'use client'는 Next.js의 서버 컴포넌트와 클라이언트 컴포넌트를 구분하는 데 사용됩니다.
// 이 파일이 클라이언트 컴포넌트임을 명시적으로 나타냅니다.
'use client'

// GraphQL 스키마에서 자동 생성된 문서를 불러옵니다.
// OnSubscriptionTestDocument는 Subscription 요청을 나타내는 GraphQL 문서입니다.
import { OnSubscriptionTestDocument } from '@/generated/graphql'

// Apollo Client의 useSubscription 훅을 불러옵니다.
// 이 훅은 클라이언트에서 Subscription 요청을 쉽게 사용할 수 있도록 도와줍니다.
import { useSubscription } from '@apollo/client'

// 컴포넌트 정의 시작. 이 컴포넌트는 Subscription 예제를 보여줍니다.
export default function TestSubscriptionExample() {
  // useSubscription 훅을 호출하여 OnSubscriptionTestDocument를 구독합니다.
  useSubscription(OnSubscriptionTestDocument, {
    // onData는 Subscription 데이터가 클라이언트로 전달될 때 호출되는 콜백 함수입니다.
    onData(options) {
      // 전달된 데이터는 options 객체의 data 속성에 포함되어 있습니다.
      // 데이터를 콘솔에 출력하여 확인합니다.
      console.log('onData: ', options.data)
    },
  })

  return <div>TestSubscriptionExample</div>
}
