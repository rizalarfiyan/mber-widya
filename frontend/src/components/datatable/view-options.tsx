import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { flexRender } from '@tanstack/react-table'
import { ListChecks } from 'lucide-react'
import type { HeaderContext, Table } from '@tanstack/react-table'

interface ViewOptionsProps<TData> {
  table: Table<TData>
  isDisable?: boolean
}

export default function ViewOptions<TData>({ table, isDisable }: ViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          leftIcon={<ListChecks className="mr-2 size-4" />}
          disabled={isDisable}
          aria-label="Toggle columns">
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(column => typeof column.accessorFn !== 'undefined' && column.getCanHide())
          .map(column => (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={value => column.toggleVisibility(value)}>
              <span className="truncate">
                {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  flexRender(column.columnDef.header, {} as HeaderContext<any, any>)
                }
              </span>
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
