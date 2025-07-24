import Ornament from '@/components/ornament'
import { createFileRoute, Link } from '@tanstack/react-router'

const PageComponent = () => (
  <div className="relative flex h-full flex-1 flex-col overflow-hidden">
    <Ornament />
    <div className="relative container mx-auto flex h-full flex-1 flex-col items-center justify-center gap-2 py-10">
      <h1 className="text-4xl font-semibold">Home Page</h1>
      <p className="text-muted-foreground mx-auto max-w-xs text-center">
        <span>This is a placeholder page. Check out our </span>
        <Link
          to="/"
          className="text-orange-600 underline decoration-orange-600 underline-offset-2 dark:text-orange-400 dark:decoration-orange-400">
          dashboard
        </Link>
        <span> pages to explore more.</span>
      </p>
    </div>
  </div>
)

export const Route = createFileRoute('/_public/')({
  component: PageComponent,
})
