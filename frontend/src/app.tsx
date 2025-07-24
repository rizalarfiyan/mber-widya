import { Toaster } from '@/components/ui/sonner'
import Auth from '@/providers/auth'
import Route from '@/providers/route'

const App = () => (
  <Auth>
    <Route />
    <Toaster />
  </Auth>
)

export default App
