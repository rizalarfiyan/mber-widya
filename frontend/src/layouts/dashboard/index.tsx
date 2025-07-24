import AdminPanelLayout from '@/layouts/dashboard/admin-panel-layout'
import { Outlet } from '@tanstack/react-router'

const Dashboard = () => (
  <AdminPanelLayout>
    <Outlet />
  </AdminPanelLayout>
)

export default Dashboard
