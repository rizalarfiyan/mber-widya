export const getInitialName = (fullName: string): string => {
  const parts = fullName.trim().split(' ')
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
  const first = parts[0].charAt(0).toUpperCase()
  const second = parts[parts.length - 1].charAt(0).toUpperCase()
  return `${first}${second}`
}
