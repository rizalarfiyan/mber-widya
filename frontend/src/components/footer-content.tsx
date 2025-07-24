import { APP_NAME } from '@/constants'

const FooterContent = () => (
  <span>
    Copyright &#169; {new Date().getFullYear()} - {APP_NAME} - created by{' '}
    <a
      className="underline decoration-orange-600/80 decoration-2 underline-offset-2 dark:decoration-orange-800/80"
      href="https://github.com/rizalarfiyan"
      target="_blank"
      rel="noopener noreferrer">
      Muhamad Rizal Arfiyan
    </a>
  </span>
)

export default FooterContent
