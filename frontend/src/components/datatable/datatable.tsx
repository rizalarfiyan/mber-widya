/* eslint-disable @typescript-eslint/no-explicit-any */
import ColumnHeader from './column-header'
import Paginator from './paginator'
import Search from './search'
import ViewOptions from './view-options'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  DEFAULT_ORDER,
  DEFAULT_ORDER_BY,
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE,
  DEFAULT_PER_PAGE_OPTIONS,
  ORDER,
} from '@/constants/datatable'
import { useFilterDatatable } from '@/hooks/use-filter-datatable'
import { useAxios } from '@/utils/axios'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Box, Loader2 } from 'lucide-react'
import { createContext, useMemo, useState } from 'react'
import type { OrderType } from '@/constants/datatable'
import type { BaseResponsePagination } from '@/types/response'
import type { ColumnDef as BaseColumnDef, Row, VisibilityState } from '@tanstack/react-table'
import type { ZodCatch, ZodOptional } from 'zod'

type DatatableParams = Record<string, string | number>

interface DatatableFilter {
  setFilters: (partialFilters: Partial<DatatableParams>) => Promise<void>
  filters: DatatableParams
}

interface DatatableProps {
  defaultOrderBy?: string
  defaultOrder?: OrderType
  defaultPerPage?: number
  perPageOptions?: number[]
  additionalSchema?: Record<string, ZodCatch<ZodOptional>>
  debounceSortingDuration?: number
  apiUrl: string
  name: string
  columns: ColumnDef[]
  hideColumns?: string[]
  create?: React.ReactNode
  filter?: (props: DatatableFilter) => React.ReactNode
  isHideSearch?: boolean
  isHideFooter?: boolean
  isHideHeader?: boolean
}

type ColumnDef = BaseColumnDef<any, any>

type DataTableStatus = { icon: React.ReactNode; message: string } | null | undefined

function getHideColumns(hideColumns?: string[]): VisibilityState {
  if (!hideColumns) return {}
  return hideColumns.reduce((acc: VisibilityState, column) => {
    if (!(column in acc)) {
      acc[column] = false
    }
    return acc
  }, {} as VisibilityState)
}

const useDatatable = ({
  defaultOrderBy = DEFAULT_ORDER_BY,
  defaultOrder = DEFAULT_ORDER,
  defaultPerPage = DEFAULT_PER_PAGE,
  perPageOptions = DEFAULT_PER_PAGE_OPTIONS,
  apiUrl,
  // name,
  // api,
  columns,
  hideColumns = [],
  isHideSearch,
  additionalSchema,
}: DatatableProps) => {
  const defaultParams = {
    page: DEFAULT_PAGE,
    perPage: defaultPerPage,
    order: defaultOrder,
    orderBy: defaultOrderBy,
  }

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(getHideColumns(hideColumns))
  const { filters, setFilters, resetFilters } = useFilterDatatable({
    default: defaultParams,
    perPage: perPageOptions,
    columns,
    isHideSearch,
    additionalSchema,
  })

  const conditions = useMemo((): DatatableParams => {
    if (Object.keys(filters).length === 0) return {}

    const { perPage, orderBy, ...rest } = filters
    return {
      ...rest,
      ...(orderBy ? { sort: orderBy } : {}),
      ...(perPage ? { limit: perPage } : {}),
    }
  }, [filters])

  const [{ data: rawData, loading: isLoading, error }, refetch] = useAxios<BaseResponsePagination>({
    url: apiUrl,
    method: 'GET',
    params: conditions,
  })

  const data = rawData?.data
  const page = data?.meta?.page ?? defaultParams.page
  const perPage = data?.meta?.limit ?? defaultParams.perPage
  const total = data?.meta?.total ?? 0
  const totalPage = data?.meta?.total_page ?? 0

  const status: DataTableStatus = useMemo(() => {
    if (error) {
      return {
        icon: <Box className="size-12" />,
        message: error.message,
      }
    }

    if (isLoading) {
      return {
        icon: <Loader2 className="mb-2 size-8 animate-spin" />,
        message: 'Loading...',
      }
    }

    return null
  }, [error, isLoading])

  const table = useReactTable({
    data: data?.content ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    enableRowSelection: false,
    manualPagination: true,
    manualSorting: true,
    state: {
      sorting: [
        {
          id: (filters?.orderBy as string) ?? defaultOrderBy,
          desc: ((filters?.order as string) ?? defaultOrder).toLowerCase() === ORDER.DESCENDING,
        },
      ],
      pagination: {
        pageSize: perPage,
        pageIndex: page,
      },
      columnVisibility,
    },
    meta: {
      getRowClassName: (row: Row<any>): string => {
        if (row?.original?.is_deleted || !!row?.original?.deleted_at)
          return 'bg-red-50 dark:bg-red-400/20 dark:hover:bg-red-300/20 hover:bg-red-100'
        return ''
      },
    },
  })

  const context = useMemo(
    () => ({
      refetch,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return {
    table,
    data,
    page,
    perPage,
    total,
    totalPage,
    status,
    context,
    perPageOptions,
    filters,
    setFilters,
    resetFilters,
    isDisable: !!error || isLoading,
  }
}

export interface IDatatableContext {
  refetch: () => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const DatatableContext = createContext<IDatatableContext | null>(null)

export function Datatable(props: DatatableProps) {
  const { isHideHeader, isHideFooter, isHideSearch, create, filter, columns } = props
  const { table, perPage, perPageOptions, filters, setFilters, page, totalPage, total, status, context, isDisable } =
    useDatatable(props)

  return (
    <DatatableContext.Provider value={context}>
      <div className="w-full">
        {!isHideHeader && (
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center justify-center gap-3">
              {!isHideSearch && <Search filters={filters} setFilters={setFilters} />}
              {filter?.({ setFilters, filters })}
            </div>
            <div className="flex items-center justify-end gap-3">
              {create}
              <ViewOptions isDisable={isDisable} table={table} />
            </div>
          </div>
        )}

        <div className="relative rounded-md border">
          {status ? (
            <div className="flex min-h-[580px] w-full flex-col items-center justify-center text-stone-500">
              {status.icon}
              <h3 className="mt-1 font-semibold">{status.message}</h3>
            </div>
          ) : (
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map(headerGroup => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : <ColumnHeader header={header} setFilters={setFilters} />}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map(row => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                      className={(table.options.meta as any)?.getRowClassName(row)}>
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id} className="px-3">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-[420px] flex-auto">
                      <div className="flex flex-col items-center justify-center">
                        <Box className="size-12" />
                        <h3 className="mt-1 font-semibold">No Data Found</h3>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
        {!isHideFooter && (
          <div className="flex flex-wrap items-center justify-center gap-4 space-x-2 py-4 xl:justify-between">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium whitespace-nowrap">Rows per page</p>
              <Select
                value={perPage?.toString()}
                disabled={isDisable}
                onValueChange={value =>
                  setFilters({
                    perPage: Number(value),
                  })
                }>
                <SelectTrigger className="h-8 w-[4.5rem]">
                  <SelectValue placeholder={perPage} />
                </SelectTrigger>
                <SelectContent side="top">
                  {perPageOptions.map(pageSize => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-row items-center gap-4">
              <div className="text-muted-foreground text-sm">
                Page {page} of {totalPage} ({total} items)
              </div>
              <div className="flex justify-end">
                <Paginator
                  currentPage={page ?? 1}
                  totalPages={totalPage}
                  onPageChange={pageNumber =>
                    setFilters({
                      page: pageNumber,
                    })
                  }
                  showPreviousNext
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </DatatableContext.Provider>
  )
}

export type { DatatableFilter, DatatableParams, DatatableProps, DataTableStatus, ColumnDef }
