import { Toaster } from '@/components/ui/sonner'
import Auth from '@/providers/auth'
import Confirmation from '@/providers/confirmation'
import Route from '@/providers/route'

const App = () => (
  <Auth>
    <Route />
    <Toaster />
    <Confirmation />
  </Auth>
)

export default App
