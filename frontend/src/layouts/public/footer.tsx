import { APP_NAME } from '@/constants'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="shadow-smooth w-full grow-0 border-t-2 border-orange-600 bg-white text-slate-600 dark:border-orange-800 dark:bg-slate-900 dark:text-slate-300">
      <div className="container py-3 text-center">
        <span>
          Copyright &#169; {year} - {APP_NAME}
        </span>
        <span> - created by </span>
        <a
          className="underline decoration-orange-600/80 decoration-2 underline-offset-2 dark:decoration-orange-800/80"
          href="https://github.com/rizalarfiyan"
          target="_blank"
          rel="noopener noreferrer">
          Muhamad Rizal Arfiyan
        </a>
      </div>
    </footer>
  )
}

export default Footer
