import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/')({
  component: () => (
    <div className="flex h-full min-h-screen w-full items-center justify-center">
      <h1 className="text-4xl font-semibold">Home Page Widya!</h1>
    </div>
  ),
})
