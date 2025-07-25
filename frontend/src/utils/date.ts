import { DEFAULT_DATE_ERROR, FORMAT_DATETIME } from '@/constants'
import dayjs from 'dayjs'

export const formatDatetime = (date: string, format = FORMAT_DATETIME, defaultTime = DEFAULT_DATE_ERROR): string => {
  if (!date) return defaultTime
  const dateFormat = format ?? FORMAT_DATETIME
  const datetime = dayjs(date)
  if (!datetime.isValid()) return defaultTime
  return datetime.format(dateFormat)
}
