import { Input } from '@/components/ui/input'
import useDebounce from '@/hooks/use-debounce'
import { Search as SearchIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { DatatableParams } from './datatable'

interface SearchProps {
  setFilters: (partialFilters: Partial<DatatableParams>) => Promise<void>
  filters: DatatableParams
}

export default function Search({ setFilters, filters }: SearchProps) {
  const [search, setSearch] = useState<string>((filters?.search as string) ?? '')
  const searchDebounce = useDebounce(search, 1000)
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  const ref = useRef(true)
  const deleteSearch = async () => {
    await setFilters({ search: '' })
  }

  useEffect(() => {
    const load = async () => {
      const current = (filters?.search as string) ?? ''
      if (ref.current) {
        if (current && current !== '') {
          setSearch(decodeURIComponent(current))
        } else {
          await deleteSearch()
        }
        ref.current = false
        return
      }

      if (searchDebounce === '' && current) {
        await deleteSearch()
        return
      }
      await setFilters({ search: searchDebounce })
    }

    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDebounce])

  return (
    <Input
      type="text"
      placeholder="Search..."
      className="w-full max-w-[20rem] sm:w-auto"
      leftIcon={SearchIcon}
      value={search}
      onChange={onSearchChange}
    />
  )
}
