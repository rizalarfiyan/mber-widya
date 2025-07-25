import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { DatatableFilter } from '@/components/datatable/datatable'

const Filter = ({ filters, setFilters }: DatatableFilter) => (
  <Select
    value={(filters?.status as string) || 'all'}
    onValueChange={val => {
      setFilters({
        status: val || undefined,
      })
    }}>
    <SelectTrigger className="!h-10 w-[180px] cursor-pointer">
      <SelectValue placeholder="Select status" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="all">All Status</SelectItem>
      <SelectItem value="active">Active</SelectItem>
      <SelectItem value="inactive">Inactive</SelectItem>
    </SelectContent>
  </Select>
)

export default Filter
