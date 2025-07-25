export const ORDER = {
  ASCENDING: 'asc',
  DESCENDING: 'desc',
} as const

export const DEFAULT_PER_PAGE_OPTIONS = [10, 25, 50]
export const DEFAULT_PER_PAGE = DEFAULT_PER_PAGE_OPTIONS[0]
export const DEFAULT_PAGE = 1
export const DEFAULT_ORDER_BY = 'created_at'
export const DEFAULT_ORDER = ORDER.DESCENDING

export type OrderType = (typeof ORDER)[keyof typeof ORDER]
