export const pick = <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  return keys.reduce<Pick<T, K>>(
    (finalObj, key) => {
      if (obj && Object.hasOwnProperty.call(obj, key)) {
        finalObj[key] = obj[key]
      }
      return finalObj
    },
    {} as Pick<T, K>,
  )
}
