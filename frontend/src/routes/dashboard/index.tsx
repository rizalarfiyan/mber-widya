import ContentLayout from '@/components/admin-panel/content-layout'
import { createFileRoute } from '@tanstack/react-router'

function RouteComponent() {
  return (
    <ContentLayout title="Dashboard">
      <div>Dashboard</div>
    </ContentLayout>
  )
}

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})
