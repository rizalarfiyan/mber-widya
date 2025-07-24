import Illustration from '@/assets/illustration/auth.svg'
import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/constants'
import Logo from '@/logo'
import { Link, Outlet } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

const AuthLayout = () => (
  <div className="flex h-screen w-full">
    <div className="relative hidden flex-1 items-center justify-center bg-slate-800 lg:flex dark:bg-slate-900">
      <div className="relative z-10 w-full max-w-xl space-y-6 p-8">
        <Logo className="mx-auto h-16 w-auto text-white dark:text-white" />
        <div className="mx-auto aspect-square h-full w-full max-w-lg">
          <img className="mx-auto h-full w-auto" src={Illustration} alt={`Illustrator auth of ${APP_NAME}`} />
        </div>
        <div className="mt-10 space-y-2 text-center">
          <h2 className="text-3xl text-white">Streamline Your Operations, Power Up Your Innovations</h2>
          <p className="leading-tight text-slate-300">
            From advanced AI vision to accurate load scanning, Widya Robotics helps industries cut waste, tighten
            workflows, and power growth with precision.
          </p>
        </div>
      </div>
      <div className="bg-login absolute inset-0 my-auto h-[500px]" />
    </div>
    <div className="relative flex flex-1 items-center justify-center">
      <Button asChild variant="outline" className="absolute top-5 left-5">
        <Link to="/">
          <ArrowLeft className="mr-1" />
          <span>Back to Home</span>
        </Link>
      </Button>
      <Outlet />
    </div>
  </div>
)

export default AuthLayout
