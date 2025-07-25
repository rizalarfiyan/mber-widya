import Filter from './filter'
import { Datatable } from '@/components/datatable/datatable'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDatetime } from '@/utils/date'
import { Link } from '@tanstack/react-router'
import { Eye } from 'lucide-react'
import { z } from 'zod'
import type { ColumnDef } from '@/components/datatable/datatable'

const columns: ColumnDef[] = [
  {
    id: 'increment',
    header: '#',
    enableHiding: false,
    cell: ({ row, table }) => {
      const { pageSize, pageIndex } = table.getState().pagination
      return pageSize * (pageIndex - 1) + row.index + 1
    },
  },
  {
    id: 'name',
    accessorKey: 'name',
    enableSorting: true,
    header: 'Name',
  },
  {
    id: 'status',
    accessorKey: 'status',
    enableSorting: true,
    header: 'Status',
    cell: ({ cell }) => {
      const value = cell.getValue()
      return <Badge variant={value === 'active' ? 'default' : 'destructive'}>{value}</Badge>
    },
  },
  {
    id: 'speed',
    accessorKey: 'speed',
    enableSorting: true,
    header: 'Speed',
    cell: ({ cell }) => {
      const value = cell.getValue()
      return <span>{value} km/h</span>
    },
  },
  {
    id: 'updated_at',
    accessorKey: 'updated_at',
    enableSorting: true,
    header: 'Updated At',
    cell: ({ cell }) => formatDatetime(cell.getValue() as string),
  },
  {
    id: 'action',
    accessorKey: '-',
    enableHiding: false,
    enableSorting: false,
    header: 'Action',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link
            to="/dashboard/vehicle/$id"
            params={{
              id: row.original.id as string,
            }}>
            <Eye />
          </Link>
        </Button>
      </div>
    ),
  },
]

const Content = () => (
  <Datatable
    columns={columns}
    name="vehicle"
    filter={Filter}
    apiUrl="/vehicle"
    defaultOrderBy="updated_at"
    additionalSchema={{
      status: z.optional(z.enum(['active', 'inactive'])).catch(undefined),
    }}
  />
)

export default Content
