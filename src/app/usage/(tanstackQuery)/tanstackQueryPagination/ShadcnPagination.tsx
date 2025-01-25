import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface ShadcnPaginationProps {
  pages: number
  page: number
  handlePageChange: (newPage: number) => void
}
const ShadcnPagination = ({
  pages,
  page,
  handlePageChange,
}: ShadcnPaginationProps) => {
  // 페이지 변경 핸들러

  return (
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
            if (pageNumber > 1 && pageNumber < pages) {
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
        {page < pages - 2 && <PaginationEllipsis />}

        {/* 마지막 페이지 버튼 - 항상 표시 */}
        {pages && (
          <PaginationItem>
            <PaginationLink
              onClick={() => handlePageChange(pages)}
              isActive={page === pages}
              className="cursor-pointer"
            >
              {pages}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* 다음 페이지 버튼 */}
        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(page + 1)}
            // 마지막 페이지에서는 다음 버튼 비활성화
            className={
              page >= pages
                ? 'pointer-events-none opacity-50'
                : 'cursor-pointer'
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default ShadcnPagination
