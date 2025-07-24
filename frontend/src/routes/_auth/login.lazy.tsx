import LoginPage from './-login/page'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/login')({
  component: LoginPage,
})
