/* eslint-disable @typescript-eslint/no-explicit-any */

import { ORDER } from '@/constants/datatable'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { z } from 'zod'
import type { DatatableParams } from '@/components/datatable/datatable'
import type { ColumnDef } from '@tanstack/react-table'
import type { ZodCatch, ZodOptional } from 'zod'

interface DatatableDefaultParams {
  page: number
  perPage: number
  orderBy: string
  order: string
}

interface ValidationOptions {
  default?: Partial<DatatableDefaultParams>
  perPage?: number[]
  columns?: ColumnDef<any, any>[]
  additionalSchema?: Record<string, ZodCatch<ZodOptional<any>>>
  isHideSearch?: boolean
}

const zodEnum = <T>(arr: T[]): [T, ...T[]] => arr as [T, ...T[]]

function validate(value: DatatableParams, opts?: ValidationOptions) {
  const orderByList: string[] = []
  for (const column of opts?.columns ?? []) {
    if (column.enableSorting && column.id) {
      orderByList.push(column.id)
    }
  }

  const orderBy = opts?.default?.orderBy
  if (orderBy && !orderByList.includes(orderBy)) {
    orderByList.push(orderBy)
  }

  const schema = z.object({
    page: z.optional(z.number()).catch(undefined),
    perPage: z.optional(z.custom(val => (opts?.perPage ?? []).includes(val as any))).catch(undefined),
    orderBy: z.optional(z.enum(zodEnum(orderByList))).catch(undefined),
    order: z.optional(z.enum([ORDER.ASCENDING, ORDER.DESCENDING])).catch(undefined),
    ...(!opts?.isHideSearch ? { search: z.optional(z.string()).catch(undefined) } : {}),
    ...opts?.additionalSchema,
  })

  const validate = schema.safeParse(value)
  if (validate.error) return {}

  const results = { ...validate.data }
  for (const [key, value] of Object.entries(results)) {
    if (
      value === undefined ||
      value === '' ||
      (typeof value === 'number' && Number.isNaN(value)) ||
      opts?.default?.[key as keyof DatatableDefaultParams] === value
    ) {
      delete results[key as keyof typeof results]
    }
  }

  return results
}

export function useFilterDatatable(props: ValidationOptions) {
  const filters = useSearch({ strict: false })
  const navigate = useNavigate({ from: '/' })

  const setFilters = (partialFilters: Partial<DatatableParams>) =>
    navigate({
      search: prev => validate({ ...prev, ...partialFilters }, props),
    })

  const resetFilters = () => navigate({ search: {} })
  return {
    filters: filters as DatatableParams,
    setFilters,
    resetFilters,
  }
}
