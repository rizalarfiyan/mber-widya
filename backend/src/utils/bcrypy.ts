import { compareSync, hashSync } from 'bcrypt'
const saltRounds = 10

const encrypt = (password: string): string => {
  return hashSync(password, saltRounds)
}

const compare = (password: string, hash: string): boolean => {
  return compareSync(password, hash)
}

export { compare, encrypt }
