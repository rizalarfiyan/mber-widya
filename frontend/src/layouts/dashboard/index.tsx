import AdminPanelLayout from '@/components/admin-panel/admin-panel-layout'
import { Outlet } from '@tanstack/react-router'

const Dashboard = () => (
  <AdminPanelLayout>
    <Outlet />
  </AdminPanelLayout>
)

export default Dashboard
