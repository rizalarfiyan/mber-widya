import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
  PaginationLink,
} from '@/components/ui/pagination'

type PaginatorProps = {
  currentPage: number
  totalPages: number
  onPageChange: (pageNumber: number) => void
  showPreviousNext?: boolean
}

const generatePaginationLinks = (currentPage: number, totalPages: number, onPageChange: (page: number) => void) => {
  const pages: React.ReactElement[] = []
  if (totalPages <= 6) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink onClick={() => onPageChange(i)} isActive={i === currentPage}>
            {i}
          </PaginationLink>
        </PaginationItem>,
      )
    }
  } else {
    for (let i = 1; i <= 2; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink onClick={() => onPageChange(i)} isActive={i === currentPage}>
            {i}
          </PaginationLink>
        </PaginationItem>,
      )
    }
    if (2 < currentPage && currentPage < totalPages - 1) {
      pages.push(<PaginationEllipsis />)
      pages.push(
        <PaginationItem key={currentPage}>
          <PaginationLink onClick={() => onPageChange(currentPage)} isActive={true}>
            {currentPage}
          </PaginationLink>
        </PaginationItem>,
      )
    }
    pages.push(<PaginationEllipsis />)
    for (let i = totalPages - 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink onClick={() => onPageChange(i)} isActive={i === currentPage}>
            {i}
          </PaginationLink>
        </PaginationItem>,
      )
    }
  }
  return pages
}

const Paginator = ({ currentPage, totalPages, onPageChange, showPreviousNext = false }: PaginatorProps) => (
  <Pagination>
    <PaginationContent>
      {showPreviousNext && totalPages ? (
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              if (currentPage - 1 < 1) return
              onPageChange(currentPage - 1)
            }}
          />
        </PaginationItem>
      ) : null}
      {generatePaginationLinks(currentPage, totalPages, onPageChange)}
      {showPreviousNext && totalPages ? (
        <PaginationItem>
          <PaginationNext
            onClick={() => {
              if (currentPage + 1 > totalPages) return
              onPageChange(currentPage + 1)
            }}
          />
        </PaginationItem>
      ) : null}
    </PaginationContent>
  </Pagination>
)

export default Paginator
