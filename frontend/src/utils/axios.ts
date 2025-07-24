import { API_BASE_URL, KEY_ACCESS_TOKEN } from '@/constants'
import { ErrorAuthorization, ErrorValidation } from '@/utils/exception'
import Axios from 'axios'
import { makeUseAxios } from 'axios-hooks'

console.log('API_BASE_URL:', API_BASE_URL)

const axios = Axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

axios.interceptors.request.use(config => {
  const token = localStorage.getItem(KEY_ACCESS_TOKEN)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axios.interceptors.response.use(
  response => response,
  async error => {
    const code = error.status || error.response.status
    const { message, data } = error.response.data

    if (code === 401) {
      return Promise.reject(new ErrorAuthorization(message))
    }

    if (code === 400) {
      return Promise.reject(new ErrorValidation(message, data ?? {}))
    }

    if (!(code >= 200 && code <= 299)) {
      return Promise.reject(new Error(message))
    }

    return Promise.reject(error)
  },
)

const useAxios = makeUseAxios({
  axios,
})

export default axios
export { useAxios }
