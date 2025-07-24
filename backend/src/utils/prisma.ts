export const generateSelect = <T extends string>(keys?: ReadonlyArray<T>): { [K in T]: true } | undefined => {
  if (keys && keys.length > 0) {
    return Object.fromEntries(keys.map(key => [key, true])) as { [K in T]: true }
  }
  return undefined
}
