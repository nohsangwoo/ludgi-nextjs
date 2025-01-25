import { Stack, Pagination } from '@mui/material'

interface MuiPaginationProps {
  pages: number
  page: number
  handlePageChange: (newPage: number) => void
}
const MuiPagination = ({
  pages,
  page,
  handlePageChange,
}: MuiPaginationProps) => {
  return (
    <div className="flex justify-center items-center h-[71px] w-full bg-customDarkDark rounded-b-[10px]">
      <Stack spacing={2}>
        <Pagination
          page={page}
          count={pages}
          boundaryCount={1}
          siblingCount={1}
          onChange={(_event, newPage) => handlePageChange(newPage)}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Stack>
    </div>
  )
}

export default MuiPagination
