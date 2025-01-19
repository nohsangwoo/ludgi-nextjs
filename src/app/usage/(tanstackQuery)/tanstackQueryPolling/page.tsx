'use client'

import { getAllRickAndMortyCharacters } from '@/lib/client/simpleApisForExample'
import { useQuery } from '@tanstack/react-query'
import { CardListForRickAndMorty } from '../../components/CardListForRickAndMorty'

export default function TanstackQueryPolling() {
  const { data, isPending, error } = useQuery({
    // 쿼리를 구분하기 위한 고유 키
    queryKey: ['characters', 'all', 1],

    // 실제 데이터를 가져오는 함수
    queryFn: () => getAllRickAndMortyCharacters(1),

    // ⭐ 폴링 설정
    // refetchInterval: 데이터를 자동으로 다시 가져오는 간격 (밀리초 단위)
    // 1000ms = 1초마다 서버에 새로운 데이터를 요청
    //
    // 폴링의 장점:
    // 1. WebSocket보다 구현이 간단함
    // 2. 서버 부하가 예측 가능함
    // 3. 실시간성이 중요하지만 약간의 지연이 허용되는 경우에 적합
    //
    // 폴링의 단점:
    // 1. 불필요한 요청이 발생할 수 있음
    // 2. 실시간성이 WebSocket보다 떨어짐
    // 3. 서버 자원을 주기적으로 사용
    //
    // 사용 사례:
    // - 알림 시스템
    // - 대시보드 데이터 업데이트
    // - 채팅 시스템 (실시간성이 덜 중요한 경우)
    refetchInterval: 10 * 1000, // (1000ms = 1초마다 서버에 새로운 데이터를 요청)

    // 추가 옵션들:
    refetchIntervalInBackground: false, // 탭이 백그라운드일 때도 폴링 수행 여부
    // refetchOnWindowFocus: true,         // 윈도우 포커스시 재요청 여부
    refetchOnMount: true, // 컴포넌트 마운트시 재요청 여부
  })

  // 로딩 상태 처리
  if (isPending)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    )

  // 에러 상태 처리
  if (error)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-red-500">Error: {error.message}</div>
      </div>
    )

  // 데이터 렌더링
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Rick and Morty Characters
      </h1>
      <CardListForRickAndMorty results={data?.results} />
    </div>
  )
}
