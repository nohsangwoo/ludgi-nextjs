'use client'

// 필요한 라이브러리와 컴포넌트들을 임포트
import { getAllRickAndMortyCharacters } from '@/lib/client/simpleApisForExample'
import { useQuery } from '@tanstack/react-query'
import { CardListForRickAndMorty } from '../../components/CardListForRickAndMorty'
import { useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis, // ... 표시를 위한 컴포넌트
  PaginationItem,
  PaginationLink,
  PaginationNext, // 다음 페이지 버튼
  PaginationPrevious, // 이전 페이지 버튼
} from '@/components/ui/pagination'

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

  // 페이지 변경 핸들러
  // newPage: 이동하고자 하는 페이지 번호
  const handlePageChange = (newPage: number) => {
    // 페이지 범위 검증 (1페이지부터 마지막 페이지까지만 허용)
    if (newPage >= 1 && newPage <= (data?.info.pages || 1)) {
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

      {/* 페이지네이션 UI */}
      <Pagination className="mt-20 mb-10">
        <PaginationContent>
          {/* 이전 페이지 버튼 */}
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(page - 1)}
              // 첫 페이지에서는 이전 버튼 비활성화
              className={
                page <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'
              }
            />
          </PaginationItem>

          {/* 첫 페이지 버튼 - 항상 표시 */}
          <PaginationItem>
            <PaginationLink
              onClick={() => handlePageChange(1)}
              isActive={page === 1}
              className="cursor-pointer"
            >
              1
            </PaginationLink>
          </PaginationItem>

          {/* 
            현재 페이지가 4 이상일 때 첫 페이지와 현재 페이지 사이에 
            건너뛴 페이지가 있음을 나타내는 ... 표시
          */}
          {page > 3 && <PaginationEllipsis />}

          {/* 
            현재 페이지 주변의 페이지 번호들을 생성하는 로직
            Array.from을 사용하여 3개의 연속된 페이지 번호를 생성
          */}
          {Array.from(
            { length: 3 }, // 길이가 3인 배열을 생성 [undefined, undefined, undefined]
            (_, i) => {
              // 맵핑 함수로 각 요소를 페이지 버튼으로 변환
              // 현재 페이지를 중심으로 페이지 번호 계산
              const pageNumber = page - 1 + i

              // 첫 페이지와 마지막 페이지를 제외한 페이지 버튼 생성
              if (pageNumber > 1 && pageNumber < data?.info.pages) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      onClick={() => handlePageChange(pageNumber)}
                      isActive={page === pageNumber}
                      className="cursor-pointer"
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                )
              }
              return null
            },
          )}

          {/* 
            현재 페이지가 마지막 페이지보다 3페이지 이상 작을 때
            건너뛴 페이지가 있음을 나타내는 ... 표시
          */}
          {page < data?.info.pages - 2 && <PaginationEllipsis />}

          {/* 마지막 페이지 버튼 - 항상 표시 */}
          {data?.info.pages && (
            <PaginationItem>
              <PaginationLink
                onClick={() => handlePageChange(data.info.pages)}
                isActive={page === data.info.pages}
                className="cursor-pointer"
              >
                {data.info.pages}
              </PaginationLink>
            </PaginationItem>
          )}

          {/* 다음 페이지 버튼 */}
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(page + 1)}
              // 마지막 페이지에서는 다음 버튼 비활성화
              className={
                page >= (data?.info.pages || 1)
                  ? 'pointer-events-none opacity-50'
                  : 'cursor-pointer'
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
