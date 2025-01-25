'use client'

// 필요한 라이브러리와 컴포넌트들을 임포트
import { getAllRickAndMortyCharacters } from '@/lib/client/simpleApisForExample'
import { useQuery } from '@tanstack/react-query'
import { CardListForRickAndMorty } from '../../components/CardListForRickAndMorty'
import { useState } from 'react'

import ShadcnPagination from './ShadcnPagination'
import MuiPagination from './MuiPagination'

export default function TanstackQueryPagination() {
  // 현재 페이지 상태 관리 (기본값: 1페이지)
  const [page, setPage] = useState(1)

  // TanStack Query를 사용하여 데이터 페칭
  const { data, isPending, error } = useQuery({
    // 쿼리 키: 페이지가 변경될 때마다 새로운 데이터를 가져옴
    queryKey: ['characters', 'all', page],
    // 실제 데이터를 가져오는 함수
    queryFn: () => getAllRickAndMortyCharacters(page),
  })

  const pages = data?.info.pages ?? 1

  // 페이지 변경 핸들러
  // newPage: 이동하고자 하는 페이지 번호
  const handlePageChange = (newPage: number) => {
    // 페이지 범위 검증 (1페이지부터 마지막 페이지까지만 허용)
    if (newPage >= 1 && newPage <= pages) {
      setPage(newPage)
    }
  }

  // 로딩 상태 표시
  if (isPending)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    )

  // 에러 상태 표시
  if (error)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-red-500">Error: {error.message}</div>
      </div>
    )

  return (
    <div className="w-full p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Rick and Morty Characters
      </h1>
      {/* 캐릭터 카드 목록 표시 */}
      <CardListForRickAndMorty results={data?.results} />

      {/* Shadcn UI 페이지네이션 UI */}
      <ShadcnPagination
        pages={pages}
        page={page}
        handlePageChange={handlePageChange}
      />

      {/* MUI 페이지네이션 UI */}
      <MuiPagination
        pages={pages}
        page={page}
        handlePageChange={handlePageChange}
      />
    </div>
  )
}
