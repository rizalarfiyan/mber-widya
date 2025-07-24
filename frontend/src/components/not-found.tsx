import Ornament from './ornament'
import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

const NotFound = () => (
  <main className="relative overflow-hidden">
    <Ornament />
    <div className="relative z-10 mx-auto flex h-screen max-w-screen-xl items-center justify-start px-4 md:px-8">
      <div className="mx-auto max-w-lg space-y-6 py-10 text-center">
        <div className="max-w-sm space-y-3">
          <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">Page Not Found</h2>
          <p className="text-muted-foreground">
            Sorry, the page you are looking for could not be found or has been removed.
          </p>
        </div>
        <Link
          to="/"
          className="shadow-smooth inline-flex items-center rounded-md bg-orange-600 px-4 py-2.5 text-white transition-colors duration-300 hover:bg-orange-700">
          <ArrowLeft className="mr-1.5 size-5" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  </main>
)

export default NotFound
