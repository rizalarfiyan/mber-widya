import Navbar from '@/components/admin-panel/navbar'

interface ContentLayoutProps {
  title: string
  children: React.ReactNode
}

const ContentLayout = ({ title, children }: ContentLayoutProps) => (
  <div>
    <Navbar title={title} />
    <div className="container px-4 py-8 sm:px-8">{children}</div>
  </div>
)

export default ContentLayout
