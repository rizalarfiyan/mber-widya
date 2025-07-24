import HomePage from './-home/page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/')({
  component: HomePage,
})
