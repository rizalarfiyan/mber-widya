import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ORDER } from '@/constants/datatable'
import { cn } from '@/utils/class-name'
import { flexRender } from '@tanstack/react-table'
import { ArrowDown, ArrowDownUp, ArrowUp, EyeOff } from 'lucide-react'
import type { DatatableParams } from './datatable'
import type { Header } from '@tanstack/react-table'

interface ColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  header: Header<TData, TValue>
  setFilters: (filters: Partial<DatatableParams>) => void
}

export default function ColumnHeader<TData, TValue>({
  header,
  className,
  setFilters,
}: ColumnHeaderProps<TData, TValue>) {
  if (!header.column.getCanSort() && !header.column.getCanHide()) {
    return <div className={className}>{flexRender(header.column.columnDef.header, header.getContext())}</div>
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label={
              header.column.getIsSorted() === 'desc'
                ? 'Sorted descending. Click to sort ascending.'
                : header.column.getIsSorted() === 'asc'
                  ? 'Sorted ascending. Click to sort descending.'
                  : 'Not sorted. Click to sort ascending.'
            }
            variant="ghost"
            size="sm"
            className="data-[state=open]:bg-accent -ml-3 h-8">
            <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>

            {header.column.getCanSort() && header.column.getIsSorted() === 'desc' ? (
              <ArrowDown className="ml-2 size-4" aria-hidden="true" />
            ) : header.column.getIsSorted() === 'asc' ? (
              <ArrowUp className="ml-2 size-4" aria-hidden="true" />
            ) : header.column.getCanSort() ? (
              <ArrowDownUp className="ml-2 size-4" aria-hidden="true" />
            ) : null}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {header.column.getCanSort() && (
            <>
              <DropdownMenuItem
                aria-label="Sort ascending"
                onClick={() => {
                  header.column.toggleSorting(false)
                  setFilters({
                    orderBy: header.column.id,
                    order: ORDER.ASCENDING,
                  })
                }}>
                <ArrowUp className="text-muted-foreground/70 mr-2 size-3.5" aria-hidden="true" />
                Asc
              </DropdownMenuItem>
              <DropdownMenuItem
                aria-label="Sort descending"
                onClick={() => {
                  header.column.toggleSorting(true)
                  setFilters({
                    orderBy: header.column.id,
                    order: ORDER.DESCENDING,
                  })
                }}>
                <ArrowDown className="text-muted-foreground/70 mr-2 size-3.5" aria-hidden="true" />
                Desc
              </DropdownMenuItem>
            </>
          )}
          {header.column.getCanSort() && header.column.getCanHide() && <DropdownMenuSeparator />}
          {header.column.getCanHide() && (
            <DropdownMenuItem aria-label="Hide column" onClick={() => header.column.toggleVisibility(false)}>
              <EyeOff className="text-muted-foreground/70 mr-2 size-3.5" aria-hidden="true" />
              Hide
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
