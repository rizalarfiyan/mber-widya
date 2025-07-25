// Global
export const APP_NAME = 'Widya'

// API
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/'
export const MAP_BOX_KEY = import.meta.env.VITE_MAP_BOX_KEY

// Key Storage
export const KEY_ACCESS_TOKEN = 'access_token'
export const KEY_THEME = 'theme'

// Message
export const MESSAGE_INTERNAL_SERVER_ERROR = 'An error occurred, please try again later'
export const MESSAGE_UNAUTHORIZED = 'You are not authorized to access this page, please login again'
export const MESSAGE_SESSION_EXPIRED = 'Session expired, please login again.'
export const MESSAGE_MUST_BE_LOGGED_IN = 'You must be logged in to access this page.'

// Enum
export const USER_ROLE = {
  GUEST: 'guest',
  ADMIN: 'admin',
} as const

// Date
export const DEFAULT_DATE_ERROR = '-'
export const FORMAT_DATE = 'DD MMMM YYYY'
export const FORMAT_DATETIME = 'DD MMMM YYYY, HH:mm:ss'
