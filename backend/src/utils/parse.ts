export const parseId = (id: string | number): number => {
  return Number.parseInt(id as string, 10)
}
